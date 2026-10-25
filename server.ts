import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Telegram bot readiness status (does not leak token secret or admin username)
  app.get('/api/telegram-status', (_req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    res.json({
      configured: Boolean(token),
      targetReady: true,
    });
  });

  // Secure external contact redirect endpoints (hides usernames from client DOM)
  app.get('/api/contact/telegram', (_req, res) => {
    const telegramUrl = process.env.TELEGRAM_ADMIN_URL || 'https://t.me/riju_md';
    res.redirect(302, telegramUrl);
  });

  app.get('/api/contact/instagram', (_req, res) => {
    const instagramUrl = process.env.INSTAGRAM_DEV_URL || 'https://www.instagram.com/coldemotions_/';
    res.redirect(302, instagramUrl);
  });

  // Submit site endpoint - forwards submission directly to Telegram Bot API
  app.post('/api/submit-site', async (req, res) => {
    try {
      const { name, url, category, description, contact } = req.body || {};

      if (!name || !url) {
        return res.status(400).json({
          success: false,
          error: 'Website name and valid URL are required.',
        });
      }

      // Basic URL format validation
      try {
        new URL(url);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid URL including http:// or https://',
        });
      }

      const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
      const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

      console.log(`[LinkerNest Submission] New site submitted: "${name}" (${url}) Category: "${category || 'General'}"`);

      // If Telegram Bot token and chat ID are provided, forward to Telegram Bot API
      if (botToken && chatId) {
        const escapeHtml = (text: string = '') =>
          text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const submissionDate = new Date().toLocaleString('en-US', {
          timeZone: 'UTC',
          dateStyle: 'full',
          timeStyle: 'medium',
        });

        const telegramMessage = [
          `🌐 <b>New Website Submission — Linker Nest</b>`,
          `━━━━━━━━━━━━━━━━━━━━`,
          `🏷️ <b>Name:</b> <code>${escapeHtml(name)}</code>`,
          `🔗 <b>URL:</b> ${escapeHtml(url)}`,
          `📂 <b>Category:</b> ${escapeHtml(category || 'General')}`,
          description ? `📝 <b>Notes:</b> ${escapeHtml(description)}` : null,
          contact ? `👤 <b>Submitter:</b> ${escapeHtml(contact)}` : null,
          `⏰ <b>Received:</b> ${submissionDate} UTC`,
          `━━━━━━━━━━━━━━━━━━━━`,
          `📬 <i>Direct Administrator Notification</i>`,
        ]
          .filter(Boolean)
          .join('\n');

        try {
          const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
          const tgResponse = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
              parse_mode: 'HTML',
              disable_web_page_preview: false,
            }),
          });

          const tgData = (await tgResponse.json()) as any;

          if (!tgResponse.ok || !tgData.ok) {
            console.error('[Telegram API Delivery Warning]', tgData);
            return res.json({
              success: true,
              forwardedToTelegram: false,
              botConfigured: true,
              telegramNotice: tgData.description || 'Could not deliver directly to chat',
              message: `Suggestion received! Note: Telegram reported "${tgData.description || 'chat not found'}". Ensure your bot has received /start or configure numeric TELEGRAM_CHAT_ID.`,
            });
          }

          console.log(`[Telegram Success] Dispatched submission to administrator`);
          return res.json({
            success: true,
            forwardedToTelegram: true,
            botConfigured: true,
            message: `Website suggestion sent directly to administrator via Telegram! Thank you for contributing.`,
          });
        } catch (tgNetworkErr: any) {
          console.error('[Telegram Network Error]', tgNetworkErr);
          return res.json({
            success: true,
            forwardedToTelegram: false,
            botConfigured: true,
            message: 'Suggestion recorded! Telegram delivery network request encountered a temporary issue.',
          });
        }
      }

      // If bot token is not yet configured in environment
      return res.json({
        success: true,
        forwardedToTelegram: false,
        botConfigured: false,
        message: 'Website suggestion received and logged! Once your TELEGRAM_BOT_TOKEN is set in the environment, future submissions will automatically deliver to the administrator on Telegram.',
      });
    } catch (err: any) {
      console.error('[Submission Error]', err);
      return res.status(500).json({
        success: false,
        error: 'An internal error occurred while processing the submission.',
      });
    }
  });

  // In development, mount Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // In production, serve dist folder
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LinkerNest] Full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
