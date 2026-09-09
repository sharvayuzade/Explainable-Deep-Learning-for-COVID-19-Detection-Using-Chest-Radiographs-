import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import {
  Award,
  BarChart2,
  TrendingUp,
  Grid,
  ShieldAlert,
  Info,
  CheckCircle2,
  Layers,
  Activity
} from 'lucide-react';
import {
  modelComparisonData,
  groupedMetricsBarData,
  rocCurveData,
  confusionMatrixData
} from '../data/modelMetrics';

export default function ModelPerformance() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'chart' | 'roc' | 'matrix'

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
              Comprehensive Performance Evaluation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Model Performance & Comparative Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exhaustive benchmarking of all classification metrics across CNN Baseline, ResNet-50, and the Proposed EfficientNet-B0 architecture.
          </p>
        </div>

        {/* Global Warning Badge */}
        <div className="flex items-center text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg shrink-0">
          <ShieldAlert className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
          <span>Simulated benchmark figures for academic evaluation only.</span>
        </div>
      </div>

      {/* 1. Master Metric Table (All Classification Metrics in Tabular Format) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-medical-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Comprehensive Model Classification Benchmark (Tabular Format)
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            DEMO RESULTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Model Architecture</th>
                <th className="py-3 px-3 text-right">Demo Accuracy</th>
                <th className="py-3 px-3 text-right">Demo Precision</th>
                <th className="py-3 px-3 text-right">Demo Sensitivity</th>
                <th className="py-3 px-3 text-right">Demo Specificity</th>
                <th className="py-3 px-3 text-right">Demo F1-Score</th>
                <th className="py-3 px-3 text-right">Demo ROC-AUC</th>
                <th className="py-3 px-3 text-right">Parameters</th>
                <th className="py-3 px-3 text-right">Latency</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {modelComparisonData.map((m) => (
                <tr
                  key={m.name}
                  className={`transition-colors ${
                    m.isBest ? 'bg-medical-50/40 font-medium' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{m.name}</span>
                      {m.isBest && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-medical-100 text-medical-800 border border-medical-200">
                          <Award className="w-3 h-3 mr-1 text-medical-600" />
                          Proposed Best
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {m.role} • Loss: {m.loss} • {m.epochs} Epochs
                    </span>
                  </td>

                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.accuracy.toFixed(1)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.precision.toFixed(1)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-emerald-700' : 'text-slate-700'}`}>
                    {m.recall.toFixed(1)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.specificity.toFixed(1)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {m.f1.toFixed(1)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${m.isBest ? 'font-bold text-medical-700' : 'text-slate-700'}`}>
                    {m.rocAuc.toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-600">
                    {m.params}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-600">
                    {m.latency}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      DEMO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>* Evaluation metrics computed on simulated $N=500$ held-out test partitions.</span>
          <span className="font-semibold text-amber-700">SIMULATED RESEARCH WEIGHTS</span>
        </div>
      </div>

      {/* 2. Graphical Comparisons Section */}
      <div className="space-y-6">
        
        {/* Graphical Method 1: Grouped Multi-Metric Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-medical-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Graphical Comparison: Classification Metrics Across Architectures
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Side-by-side grouped bar visualization comparing Accuracy, Precision, Recall, Specificity, F1-Score, and ROC-AUC.
              </p>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
              DEMO GRAPHICAL CHART
            </span>
          </div>

          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={groupedMetricsBarData}
                margin={{ top: 20, right: 30, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="metric"
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[80, 100]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Legend
                  verticalAlign="top"
                  height={40}
                  wrapperStyle={{ fontSize: '12px', fontWeight: 500 }}
                />
                <Bar
                  dataKey="cnn"
                  name="CNN Baseline"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="resnet"
                  name="ResNet-50"
                  fill="#0d9488"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="efficientnet"
                  name="EfficientNet-B0 (Proposed)"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1">
            <span>Chart Type: Recharts Grouped Multi-Bar Visualizer</span>
            <span className="font-semibold text-medical-700 bg-medical-50 px-2 py-0.5 rounded border border-medical-200">
              Proposed EfficientNet-B0 leads across all clinical evaluation criteria
            </span>
          </div>
        </div>

        {/* Graphical Methods 2 & 3: ROC Curve & Confusion Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: ROC Curve */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-medical-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Demo ROC Comparison
                  </h3>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO ROC CURVE
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Receiver Operating Characteristic (Sensitivity vs. 1 - Specificity) across diagnostic thresholds.
              </p>

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
                      name="ResNet-50 (AUC 0.943)"
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

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>AUC Comparison: EfficientNet-B0 +1.8% over ResNet-50</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                SIMULATED DATA
              </span>
            </div>
          </div>

          {/* Right: Confusion Matrix */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
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
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Predicted Class
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-1 max-w-[280px] mx-auto text-xs font-semibold text-slate-600">
                    <span>COVID-19</span>
                    <span>Non-COVID</span>
                  </div>
                </div>

                <div className="flex items-center max-w-[340px] mx-auto">
                  <div className="w-6 -rotate-90 text-center font-bold text-xs text-slate-700 tracking-wider shrink-0">
                    Actual
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-2">
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

              {/* Derived Metrics Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Sensitivity:</span>
                  <span className="font-bold text-slate-800">92.0% (184/200)</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Specificity:</span>
                  <span className="font-bold text-slate-800">93.0% (279/300)</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                  <span className="text-slate-500">PPV (Precision):</span>
                  <span className="font-bold text-slate-800">89.8%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                  <span className="text-slate-500">NPV:</span>
                  <span className="font-bold text-slate-800">94.6%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 mt-3">
              Values shown are simulated demonstration data.
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
