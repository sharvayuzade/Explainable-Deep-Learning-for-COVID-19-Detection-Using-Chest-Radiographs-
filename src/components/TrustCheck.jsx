import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles, CheckCheck, AlertTriangle } from 'lucide-react';

export default function TrustCheck({ currentCase }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const confidence = currentCase ? `${currentCase.confidence}%` : "92%";
  const alignment = currentCase ? `${currentCase.lungAttention}%` : "87%";
  const predType = currentCase ? currentCase.trustCheck.predictionType : "Correct Demo Case";
  const quality = currentCase ? currentCase.trustCheck.interpretationQuality : "Demo / Experimental";

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full relative">
      
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                AI Trust Check
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                DEMO
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Multi-Factor Research Inspection
            </p>
          </div>
        </div>

        {/* Info Icon and Tooltip */}
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50"
            aria-label="Trust Check Tooltip"
          >
            <Info className="w-4 h-4" />
          </button>

          {showTooltip && (
            <div className="absolute right-0 top-6 w-72 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-30 border border-slate-700 leading-relaxed tooltip-fade">
              <p className="font-semibold text-amber-300 mb-1">Research Explanation Check</p>
              <p className="text-slate-300">
                This panel combines demonstration confidence and XAI alignment indicators to encourage users to inspect both the prediction and its explanation rather than relying on accuracy alone.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3 Indicators Grid */}
      <div className="my-5 grid grid-cols-3 gap-2 py-3 px-2 bg-slate-50/80 rounded-lg border border-slate-200/80">
        
        {/* Indicator 1: Prediction Confidence */}
        <div className="text-center px-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
            Confidence
          </span>
          <span className="text-xl font-extrabold text-slate-900 mt-1 block">
            {confidence}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Model Prob.
          </span>
        </div>

        {/* Indicator 2: Lung Region Alignment */}
        <div className="text-center px-1 border-x border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
            Alignment
          </span>
          <span className="text-xl font-extrabold text-medical-600 mt-1 block">
            {alignment}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Lung Mask
          </span>
        </div>

        {/* Indicator 3: Prediction Type */}
        <div className="text-center px-1 flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
            Type
          </span>
          <span className="text-xs font-bold text-slate-800 mt-1.5 block leading-tight">
            {predType.replace("Demo ", "")}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Verification
          </span>
        </div>

      </div>

      {/* Interpretation Quality Banner */}
      <div className="space-y-2">
        <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            Interpretation Quality:
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {quality}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 leading-normal">
          Designed for research validation to evaluate model reliability beyond classification accuracy.
        </p>
      </div>

    </div>
  );
}
