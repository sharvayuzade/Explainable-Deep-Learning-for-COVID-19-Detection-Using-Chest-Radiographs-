import React from 'react';
import { ArrowRight, Eye, Sparkles, ShieldCheck, Microscope, UploadCloud, Activity } from 'lucide-react';

export default function HeroSection({ onExploreAnalysis, onExploreXai, onOpenUploader }) {
  return (
    <section id="overview" className="relative py-12 md:py-16 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Project Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-medical-50 text-medical-700 border border-medical-200 shadow-xs">
            <Microscope className="w-3.5 h-3.5 mr-1.5 text-medical-600" />
            Healthcare Analytics CA-03 Project
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Academic Prototype
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 shadow-xs">
            <Activity className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
            EfficientNet-B0 + Grad-CAM
          </span>
        </div>

        {/* Heading and Subtitle */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-tight">
            COVID-19 Chest Radiograph Analysis
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore AI-assisted chest radiograph classification and understand model predictions using Explainable AI.
          </p>
        </div>

        {/* Action Buttons & Prototype Declaration */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onExploreAnalysis}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-medical-600 hover:bg-medical-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2"
          >
            Explore X-Ray Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          <button
            type="button"
            onClick={onOpenUploader}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <UploadCloud className="w-4 h-4 mr-2 text-teal-700" />
            Upload Radiograph
          </button>

          <button
            type="button"
            onClick={onExploreXai}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Eye className="w-4 h-4 mr-2 text-slate-500" />
            View XAI Insights
          </button>
        </div>

        {/* Mandatory Research Label */}
        <div className="mt-6 flex flex-wrap items-center text-xs font-medium text-slate-500 gap-2">
          <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            DEMO DATA
          </span>
          <span>•</span>
          <span className="text-slate-600 font-medium">Academic Research Prototype</span>
          <span>•</span>
          <span className="text-slate-500">Not for clinical diagnostic use</span>
        </div>

      </div>
    </section>
  );
}
