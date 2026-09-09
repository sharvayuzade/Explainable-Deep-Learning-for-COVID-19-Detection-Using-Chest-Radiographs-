import React from 'react';
import { HeartPulse, Eye, ShieldAlert, AlertOctagon, Sparkles } from 'lucide-react';
import { healthcareInsightsData } from '../data/modelMetrics';

export default function HealthcareInsights() {
  const getCardIcon = (id) => {
    switch (id) {
      case "sensitivity":
        return <HeartPulse className="w-5 h-5 text-teal-600" />;
      case "explainability":
        return <Eye className="w-5 h-5 text-medical-600" />;
      case "reliability":
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case "limitation":
        return <AlertOctagon className="w-5 h-5 text-rose-600" />;
      default:
        return <HeartPulse className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="xai-insights" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-medical-50 text-medical-700 border border-medical-200">
              CLINICAL ANALYTICS
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Methodology & Ethics
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Healthcare Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Core analytical principles governing AI translation, clinical safety, and model interpretability in radiology.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
          Academic Research Principles
        </span>
      </div>

      {/* 4 Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthcareInsightsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {getCardIcon(item.id)}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-4">
                {item.title}
              </h3>

              {/* Required Exact Core Statement */}
              <p className="mt-2 text-sm font-semibold text-slate-800 leading-snug">
                "{item.summary}"
              </p>
            </div>

            {/* In-depth Analytical Context */}
            <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              {item.details}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
