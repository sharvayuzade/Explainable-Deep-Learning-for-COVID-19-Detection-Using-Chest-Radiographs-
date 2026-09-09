import React, { useState } from 'react';
import { Target, HeartPulse, BarChart3, TrendingUp, Info } from 'lucide-react';

export default function KpiCards() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const kpis = [
    {
      id: "accuracy",
      title: "Demo Accuracy",
      value: "93.4%",
      subtitle: "Simulated test classification accuracy",
      icon: Target,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      tooltip: "Proportion of total demonstration cases (COVID and Non-COVID) correctly classified by simulated model."
    },
    {
      id: "sensitivity",
      title: "Demo Sensitivity",
      value: "91.8%",
      subtitle: "Simulated true positive rate (Recall)",
      icon: HeartPulse,
      iconColor: "text-teal-600 bg-teal-50 border-teal-200",
      tooltip: "Simulated proportion of actual COVID-19 cases correctly identified. Crucial for clinical triage."
    },
    {
      id: "f1",
      title: "Demo F1-Score",
      value: "92.3%",
      subtitle: "Harmonic mean of simulated precision & recall",
      icon: BarChart3,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
      tooltip: "Simulated balance between precision and sensitivity, accounting for class balance."
    },
    {
      id: "roc_auc",
      title: "Demo ROC-AUC",
      value: "96.1%",
      subtitle: "Area under simulated ROC curve",
      icon: TrendingUp,
      iconColor: "text-cyan-600 bg-cyan-50 border-cyan-200",
      tooltip: "Measure of simulated model discriminative capacity across all diagnostic classification thresholds."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="relative bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Top row: DEMO badge and info tooltip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {kpi.title}
                </span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip(kpi.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === kpi.id ? null : kpi.id)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={`Info for ${kpi.title}`}
                >
                  <Info className="w-4 h-4" />
                </button>

                {activeTooltip === kpi.id && (
                  <div className="absolute right-0 top-6 w-56 p-2.5 bg-slate-900 text-white text-[11px] rounded-md shadow-xl z-30 border border-slate-700 leading-snug">
                    <p className="font-semibold text-amber-300 mb-1">Simulated Metric</p>
                    <p className="text-slate-300">{kpi.tooltip}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Metric Value & Icon */}
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </div>
              <div className={`w-9 h-9 rounded-md border flex items-center justify-center ${kpi.iconColor}`}>
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            {/* Subtitle description */}
            <p className="mt-2 text-xs text-slate-500 font-normal">
              {kpi.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
