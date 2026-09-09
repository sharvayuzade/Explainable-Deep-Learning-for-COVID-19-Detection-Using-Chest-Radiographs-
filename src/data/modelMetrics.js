export const modelComparisonData = [
  {
    name: "CNN Baseline",
    accuracy: "88.2%",
    recall: "85.1%",
    f1: "86.4%",
    rocAuc: "91.2%",
    params: "14.2M",
    latency: "18ms",
    isBest: false
  },
  {
    name: "ResNet50",
    accuracy: "91.7%",
    recall: "89.5%",
    f1: "90.1%",
    rocAuc: "94.3%",
    params: "23.5M",
    latency: "32ms",
    isBest: false
  },
  {
    name: "EfficientNet-B0",
    accuracy: "93.4%",
    recall: "91.8%",
    f1: "92.3%",
    rocAuc: "96.1%",
    params: "5.3M",
    latency: "14ms",
    isBest: true
  }
];

export const rocCurveData = [
  { fpr: 0.00, cnn: 0.00, resnet: 0.00, efficientnet: 0.00, chance: 0.00 },
  { fpr: 0.02, cnn: 0.32, resnet: 0.45, efficientnet: 0.58, chance: 0.02 },
  { fpr: 0.05, cnn: 0.58, resnet: 0.72, efficientnet: 0.81, chance: 0.05 },
  { fpr: 0.08, cnn: 0.71, resnet: 0.82, efficientnet: 0.89, chance: 0.08 },
  { fpr: 0.12, cnn: 0.79, resnet: 0.88, efficientnet: 0.93, chance: 0.12 },
  { fpr: 0.18, cnn: 0.84, resnet: 0.92, efficientnet: 0.96, chance: 0.18 },
  { fpr: 0.25, cnn: 0.89, resnet: 0.95, efficientnet: 0.98, chance: 0.25 },
  { fpr: 0.35, cnn: 0.92, resnet: 0.97, efficientnet: 0.99, chance: 0.35 },
  { fpr: 0.50, cnn: 0.95, resnet: 0.98, efficientnet: 0.995, chance: 0.50 },
  { fpr: 0.70, cnn: 0.98, resnet: 0.99, efficientnet: 1.00, chance: 0.70 },
  { fpr: 1.00, cnn: 1.00, resnet: 1.00, efficientnet: 1.00, chance: 1.00 }
];

export const confusionMatrixData = {
  classes: ["COVID-19", "Non-COVID"],
  matrix: [
    { actual: "COVID-19", predCovid: 184, predNonCovid: 16, total: 200 },
    { actual: "Non-COVID", predCovid: 21, predNonCovid: 279, total: 300 }
  ],
  summary: {
    totalEvaluated: 500,
    truePositives: 184,
    falseNegatives: 16,
    falsePositives: 21,
    trueNegatives: 279,
    sensitivity: "92.0%",
    specificity: "93.0%",
    ppv: "89.8%",
    npv: "94.6%"
  }
};

export const modelInsightsData = [
  {
    title: "Best Demo Model",
    value: "EfficientNet-B0",
    description: "Achieved highest simulated ROC-AUC (96.1%) while maintaining low parameter footprint.",
    badge: "Demo Top Model",
    icon: "Award"
  },
  {
    title: "Demo Strength",
    value: "High Sensitivity (91.8%)",
    description: "Prioritizes minimizing missed positive cases to align with clinical screening goals.",
    badge: "Demo Metric",
    icon: "ShieldCheck"
  },
  {
    title: "Demo Challenge",
    value: "False-Positive Cases",
    description: "External non-pulmonary markings and hardware artifacts can sometimes trigger false alarms.",
    badge: "Demo Edge Case",
    icon: "AlertTriangle"
  },
  {
    title: "XAI Advantage",
    value: "Visualizes Attention",
    description: "Grad-CAM reveals when predictions rely on true infiltrates versus peripheral noise.",
    badge: "Demo XAI Benefit",
    icon: "Eye"
  }
];

export const healthcareInsightsData = [
  {
    id: "sensitivity",
    title: "Clinical Sensitivity",
    summary: "High sensitivity is vital in triage because missed positive cases can lead to delayed treatment and contagion risks.",
    details: "In healthcare analytics, false negatives carry a disproportionately severe clinical penalty compared to false positives. Models must be calibrated to maximize true positive discovery.",
    category: "Clinical Evaluation"
  },
  {
    id: "explainability",
    title: "Explainability (Grad-CAM)",
    summary: "Grad-CAM provides a visual indication of which spatial regions drove the neural network's activation.",
    details: "Deep learning models are often considered black boxes. Spatial gradient-weighted heatmaps allow radiologists and researchers to audit whether predictions align with known lung pathology.",
    category: "Model Transparency"
  },
  {
    id: "reliability",
    title: "Model Reliability",
    summary: "A high accuracy value alone is not sufficient to evaluate a medical AI system.",
    details: "Dataset bias, class imbalances, and patient demographic disparities can inflate aggregate accuracy. Rigorous evaluation across diverse clinical subsets and external cohorts is mandatory.",
    category: "Safety & Governance"
  },
  {
    id: "limitation",
    title: "Clinical Limitation",
    summary: "AI predictions require clinical validation and expert interpretation before any real-world use.",
    details: "This academic research prototype is designed for computer vision and interpretability study. It is not approved by medical regulatory authorities and does not replace certified radiologists.",
    category: "Regulatory Notice"
  }
];
