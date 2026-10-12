import React from 'react';
import { X, ShieldCheck, EyeOff, Globe } from 'lucide-react';

export const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nexus Arcade (Default)',
    title: 'Nexus Arcade - Unblocked Games',
    favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><polygon points='5 3 19 12 5 21 5 3'/></svg>"
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Portal:Current events - Wikipedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas LMS',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  }
];

export default function CloakModal({
  isOpen,
  onClose,
  activeCloak,
  onApplyCloak,
  panicKey,
  onChangePanicKey
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tab Disguise & Cloaker</h3>
              <p className="text-xs text-slate-400">Change browser tab title and favicon in real time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset List */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Cloak Mask
            </label>
            <div className="space-y-2">
              {CLOAK_PRESETS.map((p) => {
                const isSelected = activeCloak === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onApplyCloak(p.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.favicon}
                        alt=""
                        className="w-4 h-4 object-contain rounded-sm"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[260px]">{p.title}</div>
                      </div>
                    </div>
                    {isSelected && <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panic Hotkey Setting */}
          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300">Panic Hotkey</span>
                <p className="text-[11px] text-slate-500">Instantly displays decoy document screen</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-amber-400 font-mono text-xs font-bold rounded">
                ` or ~ (Tilde)
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
