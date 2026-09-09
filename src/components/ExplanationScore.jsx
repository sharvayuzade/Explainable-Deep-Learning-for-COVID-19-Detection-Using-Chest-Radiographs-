import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, Compass } from 'lucide-react';

export default function ExplanationScore({ currentCase }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const score = currentCase ? currentCase.explanationScore : 87;
  const status = currentCase ? currentCase.alignmentStatus : "Demo — Good Alignment";

  // SVG Circular Gauge calculation
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  // Determine color based on alignment score
  const getScoreColor = () => {
    if (score >= 80) return { stroke: "#0ea5e9", text: "text-medical-600", bg: "bg-medical-50 text-medical-700 border-medical-200" };
    if (score >= 60) return { stroke: "#f59e0b", text: "text-amber-600", bg: "bg-amber-50 text-amber-800 border-amber-200" };
    return { stroke: "#f43f5e", text: "text-rose-600", bg: "bg-rose-50 text-rose-800 border-rose-200" };
  };

  const colors = getScoreColor();

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full relative">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              DEMO FEATURE
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Signature XAI Metric
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            AI Explanation Score
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Demo Explanation Alignment
          </p>
        </div>

        {/* Tooltip trigger */}
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            onClick={() => setTooltipOpen(!tooltipOpen)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded hover:bg-slate-50"
            aria-label="Explanation Score Info"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {tooltipOpen && (
            <div className="absolute right-0 top-7 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-30 border border-slate-700 leading-relaxed tooltip-fade">
              <p className="font-semibold text-amber-300 mb-1">Demo XAI Alignment</p>
              <p className="text-slate-300">
                This is a demonstration XAI metric and is not a clinically validated measurement.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Radial Progress Visualization */}
      <div className="my-6 flex flex-col sm:flex-row items-center justify-around gap-6">
        <div className="relative w-[160px] h-[160px] flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Dynamic Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: "stroke-dashoffset 0.8s ease-in-out, stroke 0.4s ease" }}
            />
          </svg>

          {/* Central Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-black tracking-tight ${colors.text}`}>
              {score}%
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Alignment
            </span>
          </div>
        </div>

        {/* Narrative & Description */}
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${colors.bg}`}>
              {score >= 70 ? (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              )}
              {status}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Experimental measure of how strongly model attention overlaps with the expected lung region.
          </p>

          <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-500 flex items-start space-x-2">
            <Compass className="w-4 h-4 text-medical-500 shrink-0 mt-0.5" />
            <span>
              Computes intersection-over-union (IoU) between high-saliency Grad-CAM activation centroids and anatomical lung masks.
            </span>
          </div>
        </div>
      </div>

      {/* Subtle research disclaimer footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Metric ID: XAI-IOU-V1</span>
        <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
          DEMO / PLACEHOLDER
        </span>
      </div>

    </div>
  );
}
