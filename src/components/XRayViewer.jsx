import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ChevronDown,
  Stethoscope,
  AlertCircle,
  UploadCloud,
  Sliders,
  Sun,
  Eye,
  Layers
} from 'lucide-react';
import RadiographVisualizer from './RadiographVisualizer';

export default function XRayViewer({
  cases,
  selectedCase,
  onSelectCase,
  onOpenUploader
}) {
  const [lutFilter, setLutFilter] = useState('standard');
  const [overlayOpacity, setOverlayOpacity] = useState(0.65);
  const [activeTab, setActiveTab] = useState('overlay'); // 'overlay' | 'original' | 'heatmap'

  const isCorrect = selectedCase.resultType === 'correct';
  const isFalsePositive = selectedCase.resultType === 'false_positive';
  const isFalseNegative = selectedCase.resultType === 'false_negative';
  const isUploaded = selectedCase.isUploaded;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Top Bar: Case Selector Dropdown, Upload Button & Disclaimer */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {isUploaded ? "UPLOADED CASE" : "DEMO CASE"}
          </span>
          <label htmlFor="case-select" className="text-xs font-semibold text-slate-700">
            Select Active Radiograph:
          </label>

          {/* Dropdown Selector */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <select
              id="case-select"
              value={selectedCase.id}
              onChange={(e) => {
                const found = cases.find(c => c.id === e.target.value);
                if (found) onSelectCase(found);
              }}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-2 pr-9 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-colors"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortTitle}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Right side: Upload Button & Disclaimer */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenUploader}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-1"
          >
            <UploadCloud className="w-4 h-4 mr-1.5" />
            Upload External Image
          </button>

          <div className="hidden sm:flex items-center text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
            <span className="font-medium text-slate-700">
              Academic Demo — Not for Clinical Diagnosis
            </span>
          </div>
        </div>

      </div>

      {/* Radiographic View Controls Toolbar */}
      <div className="px-5 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Layer View Mode Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {[
            { id: 'overlay', label: 'Overlay (Fusion)' },
            { id: 'original', label: 'Radiograph Only' },
            { id: 'heatmap', label: 'Grad-CAM Saliency' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* LUT Filters & Opacity Slider */}
        <div className="flex flex-wrap items-center gap-5">
          {/* LUT Mode */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">LUT Filter:</span>
            <div className="flex items-center space-x-1">
              {[
                { id: 'standard', label: 'Grayscale' },
                { id: 'inverted', label: 'Bone Invert' },
                { id: 'contrast', label: 'High Contrast' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setLutFilter(filter.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                    lutFilter === filter.id
                      ? 'bg-medical-50 text-medical-700 border-medical-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opacity Slider (enabled for overlay mode) */}
          {activeTab === 'overlay' && (
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 font-medium">Heatmap Opacity:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-600"
              />
              <span className="font-mono text-slate-700 w-8 text-right">
                {Math.round(overlayOpacity * 100)}%
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Main Case Content */}
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Test Radiograph Image with DEMO IMAGE label */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Active Radiograph View
              </span>
              <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {selectedCase.caseNumber}
              </span>
            </div>

            {/* Anatomical X-Ray / Uploaded Canvas Visualization */}
            <div className="w-full max-w-[340px]">
              <RadiographVisualizer
                caseData={selectedCase}
                mode={activeTab}
                opacity={overlayOpacity}
                lutFilter={lutFilter}
                className="w-full shadow-md"
              />
            </div>

            {/* Explicit DEMO IMAGE label under image */}
            <div className="mt-3 text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                {isUploaded ? "DEMO INFERENCE (USER UPLOAD)" : "DEMO IMAGE"}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {selectedCase.radiographDetails.projection} • {selectedCase.radiographDetails.patientId}
              </p>
            </div>
          </div>

          {/* Right: Prediction & Diagnostics Details */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            
            {/* Top Badge: DEMO PREDICTION */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                  {isUploaded ? "DEMO PREDICTION (UPLOADED)" : "DEMO PREDICTION"}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  Inference Mode: Simulated
                </span>
              </div>

              {/* Status Indicator Pill */}
              {isCorrect && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Correct Prediction
                </span>
              )}
              {isFalsePositive && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  Demo False Positive
                </span>
              )}
              {isFalseNegative && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  Demo False Negative
                </span>
              )}
              {isUploaded && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-medical-50 text-medical-800 border border-medical-200">
                  <UploadCloud className="w-3.5 h-3.5 mr-1" />
                  Uploaded Case
                </span>
              )}
            </div>

            {/* Prediction Values Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Prediction */}
              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Prediction
                </span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {selectedCase.predictedLabel}
                </span>
                <span className="text-[10px] text-slate-400">Class Label</span>
              </div>

              {/* Confidence */}
              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Confidence
                </span>
                <span className="text-lg font-bold text-medical-600 mt-1 block">
                  {selectedCase.confidence}%
                </span>
                <span className="text-[10px] text-slate-400">Softmax Score</span>
              </div>

              {/* Actual Label */}
              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Actual Label
                </span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {selectedCase.actualLabel}
                </span>
                <span className="text-[10px] text-slate-400">Ground Truth</span>
              </div>

              {/* Result Status */}
              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Result
                </span>
                <span className={`text-sm font-bold mt-1.5 block ${
                  isCorrect ? 'text-emerald-700' : isFalsePositive ? 'text-amber-700' : isFalseNegative ? 'text-rose-700' : 'text-medical-700'
                }`}>
                  {selectedCase.resultStatus}
                </span>
                <span className="text-[10px] text-slate-400">Outcome</span>
              </div>

            </div>

            {/* Case Radiologic Findings Summary */}
            <div className="p-4 rounded-lg bg-medical-50/40 border border-medical-100 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-medical-900">
                <Stethoscope className="w-4 h-4 text-medical-600" />
                <span>Simulated Findings Overview:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedCase.radiographDetails.finding}.
              </p>
              <p className="text-[11px] text-slate-500 italic">
                {selectedCase.clinicalNote}
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
