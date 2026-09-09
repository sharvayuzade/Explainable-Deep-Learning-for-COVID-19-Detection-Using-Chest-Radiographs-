import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileImage,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  X,
  ScanLine,
  Cpu,
  Layers,
  ShieldAlert
} from 'lucide-react';

export default function ImageUploader({ isOpen, onClose, onCaseCreated }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef(null);

  const processingSteps = [
    { label: "Normalizing 16-bit radiographic contrast...", icon: ScanLine },
    { label: "Segmenting bilateral thoracic lung zones...", icon: Layers },
    { label: "EfficientNet-B0 feature extraction...", icon: Cpu },
    { label: "Computing Grad-CAM gradient saliency map...", icon: Sparkles },
    { label: "Finalizing simulated explanation alignment...", icon: CheckCircle2 }
  ];

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert("Please upload a valid radiograph image (PNG, JPEG, WebP).");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Generate simulated realistic clinical sample radiograph
  const handleLoadSample = () => {
    // Generate a high-contrast clinical chest X-ray canvas as base64
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Radiographic background
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, 400, 400);

    // Anatomical thoracic cavity
    ctx.fillStyle = '#1a2233';
    ctx.beginPath();
    ctx.ellipse(200, 210, 175, 175, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lung fields
    ctx.fillStyle = '#050912';
    ctx.beginPath();
    ctx.ellipse(120, 200, 55, 100, -0.1, 0, Math.PI * 2);
    ctx.ellipse(280, 200, 55, 100, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Opacity patches (COVID ground glass simulation)
    ctx.fillStyle = 'rgba(215, 225, 235, 0.45)';
    ctx.filter = 'blur(10px)';
    ctx.beginPath();
    ctx.arc(115, 230, 32, 0, Math.PI * 2);
    ctx.arc(285, 235, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.filter = 'none';

    // Ribs & spine overlay
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
    ctx.lineWidth = 4;
    for (let y = 100; y <= 300; y += 30) {
      ctx.beginPath();
      ctx.moveTo(80, y);
      ctx.quadraticCurveTo(140, y - 10, 200, y);
      ctx.quadraticCurveTo(260, y - 10, 320, y);
      ctx.stroke();
    }

    // Spine
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(200, 40);
    ctx.lineTo(200, 360);
    ctx.stroke();

    // Lead marker
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('R', 360, 40);
    ctx.font = '10px monospace';
    ctx.fillText('SAMPLE-EXT-01', 20, 385);

    const sampleDataUrl = canvas.toDataURL('image/png');
    setPreviewUrl(sampleDataUrl);
    setSelectedFile({ name: "clinical_sample_cxr.png" });
  };

  const handleRunInference = () => {
    if (!previewUrl) return;

    setIsProcessing(true);
    setCurrentStep(0);

    // Realistic step-by-step pipeline animation
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            finalizeUpload();
          }, 600);
          return prev;
        }
      });
    }, 700);
  };

  const finalizeUpload = () => {
    const fileName = selectedFile?.name || "external_radiograph.png";
    const timestamp = Date.now();

    const newCase = {
      id: `uploaded-${timestamp}`,
      caseNumber: "Uploaded Case",
      shortTitle: `Uploaded: ${fileName.length > 18 ? fileName.slice(0, 15) + '...' : fileName}`,
      category: "External Radiograph",
      badgeLabel: "Uploaded File",
      actualLabel: "Unconfirmed (Uploaded)",
      predictedLabel: "COVID-19",
      confidence: 91.5,
      resultStatus: "Demo Inference",
      resultType: "uploaded",
      explanationScore: 86,
      alignmentStatus: "Demo — Good Alignment",
      lungAttention: 86,
      nonLungAttention: 14,
      xaiSummary: "Demo visualization highlights active opacities in bilateral mid-lower lung regions.",
      observation: "Simulated Grad-CAM overlay on user-supplied radiograph. Saliency is localized predominantly within the segmented bilateral lung parenchymal zones.",
      clinicalNote: "Simulated demonstration analysis on external user-supplied image. Not a clinical diagnostic report.",
      trustCheck: {
        confidenceScore: "91.5%",
        alignmentScore: "86%",
        predictionType: "Uploaded Demonstration",
        interpretationQuality: "Demo / User Supplied",
        statusColor: "text-medical-800 bg-medical-50 border-medical-200"
      },
      radiographDetails: {
        patientId: `USER-EXT-${Math.floor(1000 + Math.random() * 9000)}`,
        projection: "User Radiograph",
        acquisition: "External File Upload",
        finding: "Simulated bilateral infiltrates detected in user radiograph"
      },
      imageUrl: previewUrl,
      overlayOpacity: 0.65,
      isUploaded: true
    };

    setIsProcessing(false);
    onCaseCreated(newCase);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-medical-50 border border-medical-200 flex items-center justify-center text-medical-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Upload External Chest Radiograph
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  DEMO INFERENCE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Load external X-rays into the explainable research dashboard.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Important Notice */}
          <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> All predictions, heatmaps, and alignment scores generated for uploaded images are <strong>simulated demonstration outputs</strong>. This frontend prototype does not execute real clinical inference.
            </span>
          </div>

          {/* Drag and Drop Zone */}
          {!previewUrl ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-medical-500 bg-medical-50/40'
                  : 'border-slate-300 hover:border-medical-400 hover:bg-slate-50/50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              <div className="w-14 h-14 rounded-full bg-medical-50 border border-medical-200 flex items-center justify-center text-medical-600 mb-3 shadow-sm">
                <FileImage className="w-7 h-7" />
              </div>

              <p className="text-sm font-bold text-slate-800">
                Drag & Drop Radiograph Image Here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports DICOM-exported PNG, JPEG, or WebP (frontal AP/PA view recommended)
              </p>

              <div className="mt-4 flex items-center space-x-3">
                <span className="text-xs font-semibold text-medical-600 bg-medical-50 px-3 py-1.5 rounded-md border border-medical-200">
                  Browse Files
                </span>
                <span className="text-xs text-slate-400">or</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoadSample();
                  }}
                  className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-md border border-slate-300 transition-colors shadow-sm"
                >
                  Load Sample X-Ray
                </button>
              </div>
            </div>
          ) : (
            /* Uploaded Image Preview & Processing State */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="relative w-36 h-36 rounded-lg overflow-hidden bg-black shrink-0 border border-slate-300 shadow-md">
                  <img
                    src={previewUrl}
                    alt="Radiograph Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Laser Scanning Animation Beam */}
                  {isProcessing && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-xs">
                      {selectedFile?.name || "Uploaded Image"}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Loaded
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Resolution normalized to 400x400 standard matrix. Ready for simulated Explainable AI inference pipeline.
                  </p>

                  {!isProcessing && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="text-xs text-slate-500 hover:text-rose-600 underline"
                    >
                      Choose a different image
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Steps During Processing */}
              {isProcessing && (
                <div className="p-4 bg-slate-900 text-white rounded-lg space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 flex items-center">
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      RUNNING SIMULATED XAI INFERENCE
                    </span>
                    <span className="text-slate-400">
                      Step {currentStep + 1} of {processingSteps.length}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-medical-500 to-cyan-400 transition-all duration-500 ease-out"
                      style={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
                    />
                  </div>

                  {/* Current Active Step */}
                  <div className="flex items-center space-x-2 text-xs text-slate-200 font-medium">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>{processingSteps[currentStep].label}</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRunInference}
            disabled={!previewUrl || isProcessing}
            className={`px-5 py-2 rounded-lg text-xs font-bold text-white shadow-sm flex items-center space-x-2 transition-all ${
              !previewUrl || isProcessing
                ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                : 'bg-medical-600 hover:bg-medical-700'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Model...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Simulated XAI Analysis</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
