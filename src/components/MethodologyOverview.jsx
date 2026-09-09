import React from 'react';
import { Database, Filter, Lightbulb, CheckSquare, Sparkles, Binary } from 'lucide-react';
import { methodologyData } from '../data/modelMetrics';

export default function MethodologyOverview() {
  const { dataset, preprocessing, novelty } = methodologyData;

  return (
    <section aria-label="Methodology & Academic Specifications" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-medical-50 text-medical-700 border border-medical-200">
              ACADEMIC RESEARCH SPECIFICATION
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Methodology & Novelty
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Dataset, Preprocessing & Novel Approach
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Systematic overview of data acquisition, normalization pipeline, and explainable deep learning innovation.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
          Healthcare Analytics Mini Project
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Dataset Selection Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Dataset Selection</h3>
                <span className="text-[11px] text-slate-400">Radiographic Cohort</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dataset Name</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{dataset.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Images</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{dataset.totalImages}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">COVID-19 Cases</span>
                  <span className="font-bold text-rose-700 mt-0.5 block">{dataset.covidCases}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Annotations</span>
                <span className="font-medium text-slate-700 mt-0.5 block">{dataset.segmentations}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Split Partitioning</span>
                <span className="font-mono text-slate-700 mt-0.5 block">{dataset.splitRatio}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Projection: AP / PA views</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">DEMO COHORT</span>
          </div>
        </div>

        {/* 2. Data Preprocessing Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Data Preprocessing</h3>
                <span className="text-[11px] text-slate-400">Radiographic Pipeline</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              {preprocessing.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span>{step.step}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed pl-3">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Input Size: 224x224x3</span>
            <span className="font-semibold text-teal-700">TensorFlow / PyTorch</span>
          </div>
        </div>

        {/* 3. Novel Approach Card (Mandatory Requirement) */}
        <div className="bg-white rounded-xl p-5 border border-medical-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-medical-50/70 rounded-bl-full pointer-events-none"></div>

          <div>
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-medical-100 border border-medical-300 flex items-center justify-center text-medical-700">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Novel Approach</h3>
                <span className="text-[11px] font-semibold text-medical-600">Mandatory Innovation</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              {novelty.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-medical-50/40 rounded-lg border border-medical-100">
                  <div className="flex items-center space-x-1.5 font-bold text-medical-950">
                    <Sparkles className="w-3.5 h-3.5 text-medical-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Architecture: EfficientNet + XAI</span>
            <span className="font-bold text-medical-700">Verified Innovation</span>
          </div>
        </div>

      </div>

    </section>
  );
}
