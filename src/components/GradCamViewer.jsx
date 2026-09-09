import React, { useState } from 'react';
import RadiographVisualizer from './RadiographVisualizer';
import { Layers, Sparkles, Palette, Sliders } from 'lucide-react';

export default function GradCamViewer({ currentCase }) {
  const [colormap, setColormap] = useState('jet'); // 'jet' | 'viridis' | 'inferno'
  const [overlayOpacity, setOverlayOpacity] = useState(0.65);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              DEMO XAI
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Explainable AI Visualizer
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Why did the model make this prediction?
          </h2>
        </div>

        {/* Colormap Selector & Overlay Opacity Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center space-x-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">Colormap:</span>
            <div className="flex items-center space-x-1">
              {[
                { id: 'jet', label: 'Jet / Thermal' },
                { id: 'viridis', label: 'Viridis' },
                { id: 'inferno', label: 'Inferno' }
              ].map((cm) => (
                <button
                  key={cm.id}
                  type="button"
                  onClick={() => setColormap(cm.id)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                    colormap === cm.id
                      ? 'bg-medical-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cm.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">Overlay:</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
              className="w-16 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-600"
            />
            <span className="font-mono text-[11px] text-slate-700 w-7 text-right">
              {Math.round(overlayOpacity * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Tri-Panel Visualization: 1. Original, 2. Grad-CAM, 3. Overlay */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Panel 1: Original */}
        <div className="flex flex-col items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Original
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              DEMO IMAGE
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <RadiographVisualizer
              caseData={currentCase}
              mode="original"
              colormap={colormap}
              className="w-full"
            />
          </div>

          <p className="mt-3 text-xs text-slate-600 text-center font-medium">
            Raw Input Radiograph
          </p>
        </div>

        {/* Panel 2: Grad-CAM Heatmap */}
        <div className="flex flex-col items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Grad-CAM
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              DEMO XAI
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <RadiographVisualizer
              caseData={currentCase}
              mode="heatmap"
              colormap={colormap}
              className="w-full"
            />
          </div>

          <p className="mt-3 text-xs text-slate-600 text-center font-medium">
            Computed Class Saliency Heatmap ({colormap.toUpperCase()})
          </p>
        </div>

        {/* Panel 3: Overlay */}
        <div className="flex flex-col items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Overlay
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              DEMO XAI
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <RadiographVisualizer
              caseData={currentCase}
              mode="overlay"
              opacity={overlayOpacity}
              colormap={colormap}
              className="w-full"
            />
          </div>

          <p className="mt-3 text-xs text-slate-600 text-center font-medium">
            Radiograph + Heatmap Fusion
          </p>
        </div>

      </div>

      {/* Footer Details: Explanation & Attention Legend */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-xs text-slate-600 text-center md:text-left">
          <p className="font-semibold text-slate-800">
            Grad-CAM highlights image regions that contributed to the model's prediction.
          </p>
          <p className="text-slate-500 mt-0.5">
            Gradients of the predicted score with respect to feature activation maps quantify spatial saliency.
          </p>
        </div>

        {/* Attention Legend Color Bar */}
        <div className="flex flex-col items-center sm:items-end shrink-0">
          <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-600 mb-1">
            <span>Lower Attention</span>
            <span className="text-slate-400">→</span>
            <span className="text-rose-600 font-bold">Higher Attention</span>
          </div>
          
          <div className={`w-48 sm:w-56 h-3 rounded-full overflow-hidden border border-slate-300 shadow-inner ${
            colormap === 'viridis'
              ? 'bg-gradient-to-r from-indigo-950 via-teal-600 to-yellow-400'
              : colormap === 'inferno'
              ? 'bg-gradient-to-r from-black via-rose-600 to-yellow-200'
              : 'bg-gradient-to-r from-blue-900 via-cyan-400 via-emerald-400 via-amber-400 to-red-600'
          }`}></div>
          
          <div className="w-48 sm:w-56 flex justify-between text-[9px] text-slate-400 mt-0.5 font-mono">
            <span>0.00</span>
            <span>0.25</span>
            <span>0.50</span>
            <span>0.75</span>
            <span>1.00</span>
          </div>
        </div>

      </div>

    </div>
  );
}
