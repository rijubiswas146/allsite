import React, { useState } from 'react';
import { X, Heart, Send, CheckCircle2, ShieldCheck, FileText, Info } from 'lucide-react';
import { ModalType, CategoryInfo } from '../types';

interface ModalsProps {
  modalType: ModalType;
  onClose: () => void;
  categories: CategoryInfo[];
}

export const Modals: React.FC<ModalsProps> = ({ modalType, onClose, categories }) => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: categories[0]?.name || 'Movies & Shows',
    description: '',
  });

  if (!modalType) return null;

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      // Auto close or let user see confirmation
    }, 2000);
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
                  <span>Reach out on Telegram (@riju_md)</span>
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

        {/* Modal 2: Suggest / Request a Website */}
        {modalType === 'request' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Send size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2 font-display">
              Suggest or Request a Website
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Know a high-quality streaming portal, manga reader, app, or browser game that belongs on Linker Nest? Fill in the details below.
            </p>

            {requestSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Suggestion Received!</h3>
                <p className="text-xs text-slate-300 mb-4">
                  Thank you! Our moderators review every submission for validity, HTTPS security, and cleanliness before adding it to the live directory.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRequestSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MangaPlus"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141520] border border-white/[0.1] text-white text-xs outline-none focus:border-blue-500 transition-colors"
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
                    Short Description or Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Why should this site be featured?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    Submit Request
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
                Send requests via our Telegram admin channel <code>@riju_md</code> or submission review queue for immediate review and hyperlink removal within 24–48 hours.
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
