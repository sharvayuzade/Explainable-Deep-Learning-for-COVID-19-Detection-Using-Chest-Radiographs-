import React from 'react';
import { ShieldAlert, Activity, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Disclaimer Box */}
        <div className="rounded-lg bg-amber-50/70 border border-amber-200 p-5 mb-8">
          <div className="flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Academic Demonstration Only — Mandatory Clinical Disclaimer
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                This dashboard currently uses simulated demo data and placeholder XAI visualizations. It is not a medical diagnostic tool and must not be used for clinical decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Project Metadata & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs text-slate-500">
          
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-medical-50 border border-medical-200 flex items-center justify-center text-medical-600">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                COVID-19 Radiograph AI — Healthcare Analytics CA-03
              </p>
              <p className="text-[11px] text-slate-400">
                Explainable Deep Learning for COVID-19 Detection Using Chest Radiographs
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Frontend Prototype
            </span>
            <span>Vite + React + Tailwind</span>
            <span className="font-semibold text-slate-700">Symbiosis SIT</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
