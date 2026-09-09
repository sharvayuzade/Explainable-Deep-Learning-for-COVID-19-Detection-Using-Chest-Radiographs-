import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react';

export default function PredictionExplorer({
  cases,
  selectedCase,
  onSelectCase
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              DEMO CASES
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Comparative Audit
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Prediction Explorer
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Select any demonstration case to investigate how Explainable AI assists in auditing both successful predictions and diagnostic error modes.
        </p>
      </div>

      {/* 4 Interactive Case Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((c) => {
          const isSelected = selectedCase.id === c.id;
          const isCorrect = c.resultType === 'correct';
          const isFP = c.resultType === 'false_positive';
          const isFN = c.resultType === 'false_negative';

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                onSelectCase(c);
                const elem = document.getElementById('xray-analysis');
                if (elem) {
                  const offset = 80;
                  const pos = elem.getBoundingClientRect().top + window.pageYOffset - offset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className={`text-left p-4 rounded-lg border transition-all relative flex flex-col justify-between h-full group ${
                isSelected
                  ? 'border-medical-600 ring-2 ring-medical-500/20 bg-medical-50/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Card Top: DEMO CASE tag & Status */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    DEMO CASE
                  </span>
                  
                  {isCorrect && (
                    <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Correct
                    </span>
                  )}
                  {isFP && (
                    <span className="inline-flex items-center text-[11px] font-semibold text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                      False Positive
                    </span>
                  )}
                  {isFN && (
                    <span className="inline-flex items-center text-[11px] font-semibold text-rose-700">
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      False Negative
                    </span>
                  )}
                </div>

                {/* Case Title */}
                <h3 className="text-sm font-bold text-slate-900 mt-2.5 group-hover:text-medical-700 transition-colors">
                  {c.shortTitle}
                </h3>

                {/* Prediction vs Actual */}
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Pred:</span>
                    <span className="font-semibold text-slate-800">
                      {c.predictedLabel} ({c.confidence}%)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Actual:</span>
                    <span className="font-semibold text-slate-800">{c.actualLabel}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Result:</span>
                    <span className={`font-semibold ${
                      isCorrect ? 'text-emerald-700' : isFP ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {c.resultStatus}
                    </span>
                  </div>
                </div>

                {/* XAI Summary snippet */}
                <p className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-3 italic">
                  "{c.xaiSummary}"
                </p>
              </div>

              {/* Action indicator */}
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-medical-700' : 'text-slate-400 group-hover:text-slate-600'}>
                  {isSelected ? 'Active Case' : 'Inspect Case'}
                </span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-medical-600' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
}
