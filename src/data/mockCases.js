export const mockCases = [
  {
    id: "case-01",
    caseNumber: "Case 01",
    shortTitle: "Case 01 — Correct COVID",
    category: "COVID-19 Positive",
    badgeLabel: "Correct COVID",
    actualLabel: "COVID-19",
    predictedLabel: "COVID-19",
    confidence: 92.4,
    resultStatus: "Correct Prediction",
    resultType: "correct",
    explanationScore: 87,
    alignmentStatus: "Demo — Good Alignment",
    lungAttention: 87,
    nonLungAttention: 13,
    xaiSummary: "Demo attention predominantly overlaps the lung region.",
    observation: "Model attention is predominantly concentrated within the bilateral lung regions in this demonstration case, aligning with characteristic peripheral ground-glass opacities.",
    clinicalNote: "Simulated demonstration showing appropriate anatomical attention localization.",
    trustCheck: {
      confidenceScore: "92.4%",
      alignmentScore: "87%",
      predictionType: "Correct Demo Case",
      interpretationQuality: "Demo / High Alignment",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    radiographDetails: {
      patientId: "DEMO-PT-8821",
      projection: "PA (Posteroanterior)",
      acquisition: "Simulated Digital Radiography",
      finding: "Demo Bilateral patchy ground-glass consolidations"
    },
    heatmapType: "bilateral-opacity",
    overlayOpacity: 0.65
  },
  {
    id: "case-02",
    caseNumber: "Case 02",
    shortTitle: "Case 02 — Correct Non-COVID",
    category: "Non-COVID Normal",
    badgeLabel: "Correct Non-COVID",
    actualLabel: "Non-COVID",
    predictedLabel: "Non-COVID",
    confidence: 94.1,
    resultStatus: "Correct Prediction",
    resultType: "correct",
    explanationScore: 89,
    alignmentStatus: "Demo — Good Alignment",
    lungAttention: 89,
    nonLungAttention: 11,
    xaiSummary: "Demo attention is primarily concentrated within the expected chest/lung area.",
    observation: "Model attention is primarily concentrated within the expected chest/lung area without activating on extraneous peripheral or non-pulmonary structures.",
    clinicalNote: "Simulated demonstration illustrating baseline model attention in clear, non-pathological lung fields.",
    trustCheck: {
      confidenceScore: "94.1%",
      alignmentScore: "89%",
      predictionType: "Correct Demo Case",
      interpretationQuality: "Demo / High Alignment",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    radiographDetails: {
      patientId: "DEMO-PT-4092",
      projection: "AP (Anteroposterior)",
      acquisition: "Simulated Digital Radiography",
      finding: "Demo Clear lung fields, normal cardiothoracic ratio"
    },
    heatmapType: "normal-basal",
    overlayOpacity: 0.60
  },
  {
    id: "case-03",
    caseNumber: "Case 03",
    shortTitle: "Case 03 — Demo False Positive",
    category: "Non-COVID with Artifact",
    badgeLabel: "Demo False Positive",
    actualLabel: "Non-COVID",
    predictedLabel: "COVID-19",
    confidence: 78.2,
    resultStatus: "False Positive",
    resultType: "false_positive",
    explanationScore: 52,
    alignmentStatus: "Demo — Misaligned Attention",
    lungAttention: 52,
    nonLungAttention: 48,
    xaiSummary: "Demo visualization shows attention extending beyond the expected lung region. This may indicate that irrelevant visual features influenced the prediction.",
    observation: "Model attention extends significantly outside the pulmonary parenchymal boundary, concentrating around the clavicular margin and soft-tissue edge artifact. This illustrates a potential shortcut learning scenario.",
    clinicalNote: "This is a simulated example and does not establish the actual cause of the prediction.",
    trustCheck: {
      confidenceScore: "78.2%",
      alignmentScore: "52%",
      predictionType: "Demo False Positive Case",
      interpretationQuality: "Demo / Sub-optimal Alignment",
      statusColor: "text-amber-800 bg-amber-50 border-amber-200"
    },
    radiographDetails: {
      patientId: "DEMO-PT-1108",
      projection: "PA (Posteroanterior)",
      acquisition: "Simulated Digital Radiography",
      finding: "Demo High clavicular density & shoulder soft tissue marker"
    },
    heatmapType: "artifact-edge",
    overlayOpacity: 0.70
  },
  {
    id: "case-04",
    caseNumber: "Case 04",
    shortTitle: "Case 04 — Demo False Negative",
    category: "COVID-19 Subtle Infiltrate",
    badgeLabel: "Demo False Negative",
    actualLabel: "COVID-19",
    predictedLabel: "Non-COVID",
    confidence: 61.7,
    resultStatus: "False Negative",
    resultType: "false_negative",
    explanationScore: 44,
    alignmentStatus: "Demo — Low Attention Saliency",
    lungAttention: 44,
    nonLungAttention: 56,
    xaiSummary: "Demo visualization shows relatively weak attention in the expected lung region.",
    observation: "Demo visualization shows relatively weak, diffuse attention across the expected lung region, failing to highlight the subtle retrocardiac and retrodiaphragmatic infiltrates.",
    clinicalNote: "Simulated demonstration only — not a clinical interpretation.",
    trustCheck: {
      confidenceScore: "61.7%",
      alignmentScore: "44%",
      predictionType: "Demo False Negative Case",
      interpretationQuality: "Demo / Low Saliency",
      statusColor: "text-rose-800 bg-rose-50 border-rose-200"
    },
    radiographDetails: {
      patientId: "DEMO-PT-3329",
      projection: "AP Portable",
      acquisition: "Simulated Digital Radiography",
      finding: "Demo Subtle retrocardiac opacity, low lung volume"
    },
    heatmapType: "diffuse-weak",
    overlayOpacity: 0.55
  }
];
