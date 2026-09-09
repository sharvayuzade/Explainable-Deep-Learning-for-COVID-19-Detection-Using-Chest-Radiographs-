import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { Award, BarChart2, TrendingUp, Grid, ShieldAlert, Info } from 'lucide-react';
import { modelComparisonData, rocCurveData, confusionMatrixData } from '../data/modelMetrics';

export default function ModelPerformance() {
  const [selectedModel, setSelectedModel] = useState("EfficientNet-B0");

  return (
    <section id="model-performance" className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              DEMO RESULTS
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Architecture Evaluation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Model Performance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulated comparative benchmarks across baseline, intermediate, and state-of-the-art CNN architectures.
          </p>
        </div>

        {/* Global Warning Badge */}
        <div className="flex items-center text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
          <ShieldAlert className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
          <span>Simulated benchmark figures for academic comparison only.</span>
        </div>
      </div>

      {/* Model Benchmark Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-medical-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Simulated Architecture Comparison Table
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            DEMO RESULTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Model Architecture</th>
                <th className="py-3 px-4 sm:px-6 text-right">Demo Accuracy</th>
                <th className="py-3 px-4 sm:px-6 text-right">Demo Recall</th>
                <th className="py-3 px-4 sm:px-6 text-right">Demo F1</th>
                <th className="py-3 px-4 sm:px-6 text-right">Demo ROC-AUC</th>
                <th className="py-3 px-4 sm:px-6 text-right">Demo Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {modelComparisonData.map((m) => (
                <tr
                  key={m.name}
                  className={`transition-colors ${
                    m.isBest ? 'bg-medical-50/30 font-medium' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{m.name}</span>
                      {m.isBest && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-medical-100 text-medical-800 border border-medical-200">
                          <Award className="w-3 h-3 mr-1 text-medical-600" />
                          Demo Best Model
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Params: {m.params} • Latency: {m.latency}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-right ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.accuracy}
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-right ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.recall}
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-right ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.f1}
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-right ${m.isBest ? 'font-bold text-medical-700' : 'text-slate-700'}`}>
                    {m.rocAuc}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      DEMO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>* All metrics are simulated demonstration values to illustrate expected comparative behavior.</span>
          <span className="font-semibold text-amber-700">NOT TRAINED CLINICAL WEIGHTS</span>
        </div>
      </div>

      {/* Performance Charts: ROC Curve & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: ROC Curve (Recharts) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-medical-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Demo ROC Comparison
                </h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                DEMO CURVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Receiver Operating Characteristic (TPR vs FPR) for simulated network architectures.
            </p>

            {/* Recharts ROC Line Chart */}
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rocCurveData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="fpr"
                    type="number"
                    domain={[0, 1]}
                    tickCount={6}
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(val) => val.toFixed(1)}
                    label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -4, fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tickCount={6}
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(val) => val.toFixed(1)}
                    label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', offset: 12, fontSize: 10, fill: '#64748b' }}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={(value, name) => [`${(value * 100).toFixed(1)}%`, name]}
                    labelFormatter={(label) => `FPR: ${(label * 100).toFixed(1)}%`}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="efficientnet"
                    name="Demo EfficientNet-B0 (AUC 0.961)"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#0284c7' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resnet"
                    name="ResNet50 (AUC 0.943)"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: '#0d9488' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cnn"
                    name="CNN Baseline (AUC 0.912)"
                    stroke="#64748b"
                    strokeWidth={1.75}
                    dot={{ r: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="chance"
                    name="Random Chance (0.50)"
                    stroke="#cbd5e1"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Chart: Recharts SVG Renderer</span>
            <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              SIMULATED DATA
            </span>
          </div>
        </div>

        {/* Right: Confusion Matrix */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-medical-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Demo Confusion Matrix
                </h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                DEMO MATRIX
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Values shown are simulated demonstration data (N = 500 cases).
            </p>

            {/* Matrix Visual Table */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              
              {/* Header Label: Predicted */}
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Predicted Class
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1 max-w-[280px] mx-auto text-xs font-semibold text-slate-600">
                  <span>COVID-19</span>
                  <span>Non-COVID</span>
                </div>
              </div>

              {/* 2x2 Matrix Rows */}
              <div className="flex items-center max-w-[340px] mx-auto">
                {/* Actual Label Vertical Heading */}
                <div className="w-6 -rotate-90 text-center font-bold text-xs text-slate-700 tracking-wider shrink-0">
                  Actual
                </div>

                <div className="flex-1 grid grid-cols-2 gap-2">
                  
                  {/* Row 1, Col 1: TP */}
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                      True Positive
                    </span>
                    <span className="text-2xl font-black text-emerald-900 mt-1 block">
                      184
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5">
                      Actual COVID
                    </span>
                  </div>

                  {/* Row 1, Col 2: FN */}
                  <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-rose-800 block">
                      False Negative
                    </span>
                    <span className="text-2xl font-black text-rose-900 mt-1 block">
                      16
                    </span>
                    <span className="text-[10px] text-rose-700 block mt-0.5">
                      Missed Cases
                    </span>
                  </div>

                  {/* Row 2, Col 1: FP */}
                  <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block">
                      False Positive
                    </span>
                    <span className="text-2xl font-black text-amber-900 mt-1 block">
                      21
                    </span>
                    <span className="text-[10px] text-amber-700 block mt-0.5">
                      False Alarm
                    </span>
                  </div>

                  {/* Row 2, Col 2: TN */}
                  <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-blue-800 block">
                      True Negative
                    </span>
                    <span className="text-2xl font-black text-blue-900 mt-1 block">
                      279
                    </span>
                    <span className="text-[10px] text-blue-700 block mt-0.5">
                      Actual Non-COVID
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* Derived Simulated Diagnostics Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between">
                <span className="text-slate-500">Sensitivity:</span>
                <span className="font-bold text-slate-800">92.0% (184/200)</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between">
                <span className="text-slate-500">Specificity:</span>
                <span className="font-bold text-slate-800">93.0% (279/300)</span>
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 mt-3">
            Values shown are simulated demonstration data.
          </div>
        </div>

      </div>

    </section>
  );
}
