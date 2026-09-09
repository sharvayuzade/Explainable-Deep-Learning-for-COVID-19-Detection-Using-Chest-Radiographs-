import React from 'react';
import { Layers, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function AttentionAnalysis({ currentCase }) {
  const lungAttention = currentCase ? currentCase.lungAttention : 87;
  const nonLungAttention = currentCase ? currentCase.nonLungAttention : 13;
  const observation = currentCase ? currentCase.observation : "Model attention is predominantly concentrated within the lung region in this demonstration case.";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              DEMO METRIC
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Spatial Distribution
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Case: {currentCase.caseNumber}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mt-1">
          Model Attention Analysis
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Quantifies anatomical alignment between Grad-CAM activation mass and segmented lung fields.
        </p>
      </div>

      {/* Numerical Metrics Breakdown */}
      <div className="my-5 space-y-4">
        
        {/* Metric Row */}
        <div className="grid grid-cols-2 gap-4">
          
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-xs font-medium text-slate-600 block">
              Demo Lung Region Attention
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-medical-700">
                {lungAttention}%
              </span>
              <span className="text-[11px] text-slate-500">of total gradient energy</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-xs font-medium text-slate-600 block">
              Demo Non-Lung Attention
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-700">
                {nonLungAttention}%
              </span>
              <span className="text-[11px] text-slate-500">external / peripheral</span>
            </div>
          </div>

        </div>

        {/* Horizontal Stacked Comparison Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-medical-500 mr-1.5"></span>
              Lung Field Attention ({lungAttention}%)
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 mr-1.5"></span>
              Extrapulmonary Attention ({nonLungAttention}%)
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200 shadow-inner">
            <div
              className="h-full bg-medical-600 transition-all duration-700 ease-out"
              style={{ width: `${lungAttention}%` }}
            />
            <div
              className="h-full bg-slate-300 transition-all duration-700 ease-out"
              style={{ width: `${nonLungAttention}%` }}
            />
          </div>
        </div>

      </div>

      {/* Observation Box */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="p-3.5 bg-slate-50/90 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div className="flex items-center space-x-1.5 font-bold text-slate-800 mb-1">
            <span className="w-2 h-2 rounded-full bg-medical-500"></span>
            <span>Demo Observation:</span>
          </div>
          <p className="leading-relaxed">
            {observation}
          </p>
        </div>

        {/* Important Disclaimer */}
        <p className="text-[11px] text-slate-400 italic">
          * Notice: Do not state that the highlighted area represents a confirmed medical abnormality. XAI maps indicate neural network attribution, not histological confirmation.
        </p>
      </div>

    </div>
  );
}
