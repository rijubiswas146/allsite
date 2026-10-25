import React, { useState } from 'react';
import {
  X,
  Heart,
  Send,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Info,
  Loader2,
  Bot,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Instagram,
  Code2,
} from 'lucide-react';
import { ModalType, CategoryInfo } from '../types';

interface ModalsProps {
  modalType: ModalType;
  onClose: () => void;
  categories: CategoryInfo[];
}

export const Modals: React.FC<ModalsProps> = ({ modalType, onClose, categories }) => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    forwardedToTelegram?: boolean;
    botConfigured?: boolean;
    message?: string;
    targetChat?: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: categories[0]?.name || 'Movies & Shows',
    contact: '',
    description: '',
  });

  if (!modalType) return null;

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/submit-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'Failed to submit website request.');
      }

      setSubmitResult(data);
      setRequestSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      url: '',
      category: categories[0]?.name || 'Movies & Shows',
      contact: '',
      description: '',
    });
    setRequestSubmitted(false);
    setSubmitError(null);
    setSubmitResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-lux-bright rounded-2xl p-6 sm:p-8 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] text-slate-300 hover:text-white transition-colors cursor-pointer touch-manipulation z-10"
          aria-label="Close dialog"
        >
          <X size={17} />
        </button>

        {/* Modal 1: Support Linker Nest */}
        {modalType === 'support' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Heart size={24} className="fill-rose-400" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              Support Linker Nest
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Linker Nest is a free community-supported directory. Server hosting, domain maintenance, and daily link verifications require ongoing resources. If this directory helps you, consider supporting us!
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Community Contact & Support
                </div>
                <div className="text-sm font-medium text-white mb-2">
                  Message the administrator on Telegram for direct support or inquiries:
                </div>
                <a
                  href="https://t.me/riju_md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  <Send size={14} />
                  <span>Reach out on Telegram</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/25">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Code2 size={13} />
                  <span>Developer &amp; Engineering</span>
                </div>
                <div className="text-sm font-medium text-white mb-2">
                  Engineered and maintained by our development team:
                </div>
                <a
                  href="https://www.instagram.com/coldemotions_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs transition-colors shadow-md shadow-pink-500/20"
                >
                  <Instagram size={14} />
                  <span>Connect on Instagram</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Spread the Word
                </div>
                <p className="text-xs text-slate-300">
                  Sharing Linker Nest with friends and bookmarking our hub keeps the community thriving without ads.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Modal 2: Suggest / Request a Website (Automated to Telegram) */}
        {modalType === 'request' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-sky-500/30 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Bot size={26} />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Telegram Bot Alert &bull; Admin</span>
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              Suggest or Request a Website
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              Know a high-quality streaming portal, manga reader, web tool, or game that belongs on Linker Nest? Submit it here and our automated Telegram bot will notify the administration team immediately.
            </p>

            {requestSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={30} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {submitResult?.forwardedToTelegram
                      ? 'Transmitted to Telegram Bot!'
                      : 'Submission Successfully Received!'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    {submitResult?.message ||
                      'Thank you! Your website suggestion has been forwarded to the administrator for review and indexing.'}
                  </p>
                </div>

                {/* Submission summary receipt */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-left text-xs space-y-1.5 max-w-md mx-auto font-mono">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Website:</span>
                    <span className="text-white font-semibold">{formData.name || 'Submitted site'}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>URL:</span>
                    <span className="text-sky-400 truncate max-w-[200px]">{formData.url}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Category:</span>
                    <span className="text-white">{formData.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-white/[0.06]">
                    <span>Notification Channel:</span>
                    <span className="text-sky-300 font-bold flex items-center gap-1">
                      <Send size={11} />
                      <span>Telegram Bot Queue</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="https://t.me/riju_md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <Send size={13} />
                    <span>Open Telegram Chat</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Site
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleResetForm();
                      onClose();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                    <div>
                      <p className="font-semibold">Submission Error</p>
                      <p className="text-[11px] text-rose-300/90">{submitError}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MangaDex, Anichart, or Streamio"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-sky-500 transition-colors placeholder:text-slate-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website URL <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-sky-500 transition-colors placeholder:text-slate-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Directory Category <span className="text-sky-400">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141520] border border-white/[0.1] text-white text-xs outline-none focus:border-sky-500 transition-colors"
                      disabled={isSubmitting}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name} className="bg-[#141520] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Telegram / Contact (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="@your_telegram or email"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-sky-500 transition-colors placeholder:text-slate-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Short Description or Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Why should this website be added? (Key features, mirrors, region availability...)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-sky-500 transition-colors resize-none placeholder:text-slate-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Send size={13} className="text-sky-400" />
                    <span>Dispatches directly to administration via Telegram Bot</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400/80 bg-sky-500/10 px-2 py-0.5 rounded">
                    Telegram Bot
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white shadow-lg shadow-sky-500/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Sending to Telegram...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Website</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Modal 3: About Linker Nest */}
        {modalType === 'about' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              About Linker Nest
            </h2>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                <strong>Linker Nest</strong> is an independent, non-commercial web directory created to organize and streamline discovering digital entertainment, anime, comics, useful software utilities, and interactive web games.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Our Mission &amp; Philosophy</h4>
              <p>
                The open web is vast, but discovery is frequently cluttered by broken redirects, SEO spam, and malicious clones. Linker Nest acts as a curated index with verified domains, responsive brand cards, and direct navigation links.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Verification Process</h4>
              <p>
                Every listed link undergoes active URL availability checks, SSL certificate verification, and user feedback monitoring.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Disclaimer</h4>
              <p>
                Linker Nest is strictly an information location tool and index. We do not store, host, distribute, or stream any digital video or media files on our servers.
              </p>

              {/* Developer & Administration Card */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={14} className="text-pink-400" />
                  <span>Team &amp; Development</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-black/30 border border-pink-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-pink-400 uppercase font-bold tracking-wider">Developer</div>
                      <div className="text-xs font-bold text-white">Engineering Team</div>
                    </div>
                    <a
                      href="https://www.instagram.com/coldemotions_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-colors"
                    >
                      <Instagram size={12} />
                      <span>Instagram</span>
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-black/30 border border-sky-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-sky-400 uppercase font-bold tracking-wider">Administration</div>
                      <div className="text-xs font-bold text-white">Site Administrator</div>
                    </div>
                    <a
                      href="https://t.me/riju_md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-semibold transition-colors"
                    >
                      <Send size={12} />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Modal 4: DMCA Copyright Policy */}
        {modalType === 'dmca' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              DMCA &amp; Copyright Policy
            </h2>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                <strong>Pure Information Location Tool Notice:</strong> Linker Nest is an index of publicly available hyperlinks. In accordance with 17 U.S.C. § 512(d), we do not upload, host, transmit, or cache copyright-protected files or multimedia content.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Notice and Takedown Procedure</h4>
              <p>
                If you are a copyright owner or authorized representative and believe that any hyperlinked listing infringes upon your copyrighted work, please submit a formal notification with:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL on Linker Nest where the hyperlink is displayed.</li>
                <li>Your contact information including email and address.</li>
                <li>A statement made in good faith and under penalty of perjury.</li>
              </ul>
              <p>
                Send requests via our Telegram admin channel or submission review queue for immediate review and hyperlink removal within 24–48 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Modal 5: Terms & Privacy */}
        {(modalType === 'terms' || modalType === 'privacy') && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              {modalType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h2>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {modalType === 'terms' ? (
                <>
                  <p>
                    By browsing and using <strong>Linker Nest</strong>, you agree to these Terms of Service.
                  </p>
                  <h4 className="text-sm font-bold text-white pt-1">1. Directory Services</h4>
                  <p>
                    Linker Nest is strictly an informational directory for discovering third-party websites. Users are responsible for verifying the legitimacy, licensing, and safety of external destinations before interacting with them.
                  </p>
                  <h4 className="text-sm font-bold text-white pt-1">2. External Links</h4>
                  <p>
                    We exercise no control over third-party platforms and assume no liability for their availability or content.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Privacy Commitment:</strong> Linker Nest respects user privacy. We do not require registration, passwords, or personal identity tracking to explore this directory.
                  </p>
                  <h4 className="text-sm font-bold text-white pt-1">1. Local Storage</h4>
                  <p>
                    User favorites and theme preferences are stored locally on your device via browser LocalStorage. No personal data is sent to external advertising trackers.
                  </p>
                  <h4 className="text-sm font-bold text-white pt-1">2. Contact</h4>
                  <p>
                    Any feedback or inquiries submitted through the site or community chat are used strictly for service improvements.
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
