/**
 * Model Performance Benchmarks and Methodology Data
 * Aligned with Healthcare Analytics Mini Project Guidelines
 */

export const modelComparisonData = [
  {
    name: "CNN Baseline",
    accuracy: 88.2,
    precision: 87.8,
    recall: 85.1,
    specificity: 89.6,
    f1: 86.4,
    rocAuc: 91.2,
    params: "14.2M",
    latency: "18ms",
    epochs: 30,
    loss: 0.284,
    isBest: false,
    role: "Baseline Model"
  },
  {
    name: "ResNet-50",
    accuracy: 91.7,
    precision: 90.8,
    recall: 89.5,
    specificity: 92.1,
    f1: 90.1,
    rocAuc: 94.3,
    params: "23.5M",
    latency: "32ms",
    epochs: 35,
    loss: 0.198,
    isBest: false,
    role: "Standard Benchmark"
  },
  {
    name: "EfficientNet-B0 (Proposed)",
    accuracy: 93.4,
    precision: 92.9,
    recall: 91.8,
    specificity: 94.2,
    f1: 92.3,
    rocAuc: 96.1,
    params: "5.3M",
    latency: "14ms",
    epochs: 40,
    loss: 0.142,
    isBest: true,
    role: "Proposed Novel Model + Grad-CAM"
  }
];

// Grouped bar chart data comparing classification performance
export const groupedMetricsBarData = [
  { metric: "Accuracy", cnn: 88.2, resnet: 91.7, efficientnet: 93.4 },
  { metric: "Precision (PPV)", cnn: 87.8, resnet: 90.8, efficientnet: 92.9 },
  { metric: "Sensitivity (Recall)", cnn: 85.1, resnet: 89.5, efficientnet: 91.8 },
  { metric: "Specificity (TNR)", cnn: 89.6, resnet: 92.1, efficientnet: 94.2 },
  { metric: "F1-Score", cnn: 86.4, resnet: 90.1, efficientnet: 92.3 },
  { metric: "ROC-AUC", cnn: 91.2, resnet: 94.3, efficientnet: 96.1 }
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
    accuracy: "92.6%",
    sensitivity: "92.0%",
    specificity: "93.0%",
    ppv: "89.8%",
    npv: "94.6%"
  }
};

export const methodologyData = {
  dataset: {
    name: "V7 Labs COVID-19 Chest X-Ray Dataset",
    source: "V7 Darwin Platform / Academic Chest Radiography Repository",
    totalImages: "6,500 AP/PA Radiographs",
    covidCases: "517 Confirmed COVID-19 Cases",
    segmentations: "Pixel-Level Polygonal Lung Boundaries",
    splitRatio: "70% Training / 15% Validation / 15% Testing"
  },
  preprocessing: [
    { step: "Resizing & Normalization", detail: "Standardized to 224x224 input tensors with min-max channel scaling [0, 1]." },
    { step: "Contrast Enhancement (CLAHE)", detail: "Contrast Limited Adaptive Histogram Equalization applied to enhance bilateral parenchymal opacities." },
    { step: "Data Augmentation", detail: "Random horizontal flipping, rotation (±10°), zooming (0.9–1.1x) to prevent overfitting." },
    { step: "Class Balancing", detail: "Weighted cross-entropy loss function addressing minority COVID-19 class distribution." }
  ],
  novelty: [
    { title: "Compound Scaling Transfer Learning", desc: "EfficientNet-B0 optimizes depth, width, and resolution simultaneously, yielding higher ROC-AUC (96.1%) with 77% fewer parameters than ResNet-50." },
    { title: "Spatial Explainability (Grad-CAM)", desc: "Maps gradients flowing into the final convolutional feature maps (top_conv) to localize disease attribution without requiring bounding box supervision." },
    { title: "Automated Lung Mask Alignment (IoU)", desc: "Calculates spatial intersection-over-union between model attention centroids and segmented anatomical lung masks to detect shortcut learning." }
  ]
};

export const modelInsightsData = [
  {
    title: "Best Proposed Model",
    value: "EfficientNet-B0",
    description: "Achieved highest simulated ROC-AUC (96.1%) and F1-Score (92.3%) while maintaining an ultra-compact 5.3M parameter footprint.",
    badge: "Demo Top Model",
    icon: "Award"
  },
  {
    title: "Demo Sensitivity",
    value: "91.8% Recall",
    description: "Crucial for healthcare triage to minimize missed positive cases (false negatives) that risk delayed intervention.",
    badge: "Clinical Priority",
    icon: "ShieldCheck"
  },
  {
    title: "Demo Challenge",
    value: "Extrapulmonary Noise",
    description: "Non-pulmonary markings (clavicles, monitors, soft tissue) can trigger false positives, which our XAI visualizer helps diagnose.",
    badge: "Diagnostic Audit",
    icon: "AlertTriangle"
  },
  {
    title: "XAI Novelty",
    value: "Spatial Heatmap Auditing",
    description: "Grad-CAM provides clinicians with transparent visual confirmation that model attention resides within genuine pulmonary zones.",
    badge: "Explainable AI",
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
    summary: "Grad-CAM provides a visual indication of which image regions influenced the model prediction.",
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
