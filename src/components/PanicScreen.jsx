import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function PanicScreen({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white text-slate-900 font-serif overflow-y-auto selection:bg-blue-100 p-8 sm:p-16">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 font-sans">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <FileText className="w-5 h-5" />
            <span>Google Docs · Saved to Drive</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-xs text-slate-400 hover:text-slate-600 font-sans flex items-center gap-1.5 border border-slate-200 px-2 py-1 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to App</span>
          </button>
        </div>

        {/* Academic Notes Essay */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 pt-4">
          Unit 5: The Industrial Revolution and Technological Diffusion (1750–1900)
        </h1>

        <p className="text-sm font-sans text-slate-500">
          Last edited 3 minutes ago · Prepared for Independent Study Examination
        </p>

        <section className="space-y-4 text-base leading-relaxed text-slate-800">
          <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-1">
            1. Causes and Initial Catalysts in Great Britain
          </h2>
          <p>
            The transition from agrarian handicraft economies to machine-driven industrial production began in Great Britain during the mid-18th century. Several interconnected factors facilitated this unprecedented economic transformation:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Geographic Endowment:</strong> Proximity to abundant accessible coal and iron ore reserves in northern England, alongside navigable rivers and canal networks.</li>
            <li><strong>Agricultural Improvements:</strong> Enclosure movements and crop rotation techniques improved caloric yield and created an urban labor surplus.</li>
            <li><strong>Capital Accumulation:</strong> Commercial wealth accrued via maritime trade networks provided investment liquidity for infrastructure and manufacturing.</li>
          </ul>

          <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 pt-4">
            2. Technological Innovations
          </h2>
          <p>
            The mechanization of textile spinning and weaving, particularly James Hargreaves' spinning jenny and Richard Arkwright's water frame, dramatically accelerated production speeds. Subsequent adaptations of James Watt's condenser steam engine decoupled manufacturing centers from riparian riverbeds.
          </p>
          <p>
            By the mid-19th century, the expansion of standardized rail networks transformed freight transport, dramatically depressing regional shipment costs and unifying domestic commodity markets.
          </p>

          <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 pt-4">
            3. Social and Demographic Implications
          </h2>
          <p>
            Rapid industrialization led to unprecedented demographic shifts toward metropolitan hubs like Manchester and Birmingham, creating intense pressures on municipal infrastructure and sanitary facilities before modern urban planning frameworks emerged.
          </p>
        </section>

        <div className="pt-10 text-xs font-sans text-slate-400 border-t border-slate-200 flex justify-between items-center">
          <span>Page 1 of 4</span>
          <span>Click "Return to App" or press Escape to resume</span>
        </div>
      </div>
    </div>
  );
}
