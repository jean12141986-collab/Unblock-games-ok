import React, { useState } from 'react';
import { X, Copy, Download, Check, FileJson, Table, RefreshCw } from 'lucide-react';

export default function JsonViewerModal({
  isOpen,
  onClose,
  games,
  onResetDefaults
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('raw'); // 'raw' | 'table'

  if (!isOpen) return null;

  // Clean JSON string without internal asset module objects
  const exportableGames = games.map(g => ({
    id: g.id,
    title: g.title,
    category: g.category,
    description: g.description,
    iframeUrl: g.iframeUrl,
    thumbnail: typeof g.thumbnail === 'string' ? g.thumbnail : undefined,
    accentColor: g.accentColor,
    instructions: g.instructions,
    controls: g.controls,
    rating: g.rating,
    plays: g.plays,
    tags: g.tags,
    featured: g.featured,
    isCustom: g.isCustom
  }));

  const jsonString = JSON.stringify(exportableGames, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">games.json Database</h3>
              <p className="text-xs text-slate-400">
                Storing all {games.length} games and their iframe configurations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'raw' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw JSON
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'table' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Schema View
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs">
          {activeTab === 'raw' ? (
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300/90 leading-relaxed overflow-x-auto selection:bg-cyan-800/50">
              {jsonString}
            </pre>
          ) : (
            <div className="border border-slate-800 rounded-xl overflow-hidden font-sans">
              <table className="w-full text-left text-xs divide-y divide-slate-800">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Iframe URL (Source)</th>
                    <th className="px-4 py-3">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                  {games.map(g => (
                    <tr key={g.id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-mono text-cyan-400 font-medium">{g.id}</td>
                      <td className="px-4 py-3 font-semibold text-white">{g.title}</td>
                      <td className="px-4 py-3">{g.category}</td>
                      <td className="px-4 py-3 font-mono text-slate-400">{g.iframeUrl}</td>
                      <td className="px-4 py-3 text-slate-400">
                        {g.controls ? g.controls.length : 0} bindings
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default games.json</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download games.json</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
