import React from 'react';
import { Award, ShieldCheck, AlertTriangle, Eye } from 'lucide-react';
import { modelInsightsData } from '../data/modelMetrics';

export default function ModelInsights() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Award": return <Award className="w-5 h-5 text-medical-600" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "AlertTriangle": return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "Eye": return <Eye className="w-5 h-5 text-indigo-600" />;
      default: return <Award className="w-5 h-5 text-medical-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              DEMO INSIGHTS
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Research Takeaways
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Demo Model Insights
          </h3>
        </div>
        <span className="text-xs text-slate-400 italic hidden sm:block">
          Educational observations from simulated data
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelInsightsData.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {getIcon(insight.icon)}
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {insight.badge}
                </span>
              </div>

              <span className="text-xs font-semibold text-slate-500 block mt-3 uppercase tracking-wider">
                {insight.title}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {insight.value}
              </h4>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
