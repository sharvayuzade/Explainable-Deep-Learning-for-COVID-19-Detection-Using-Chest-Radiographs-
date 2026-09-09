import React from 'react';
import DynamicGradCamCanvas from './DynamicGradCamCanvas';

/**
 * High-fidelity vector radiograph visualizer with Grad-CAM heatmap generator.
 * Supports: 'original', 'heatmap', and 'overlay' modes, external image rendering, LUT filters, and colormaps.
 */
export default function RadiographVisualizer({
  caseData,
  mode = 'overlay',
  opacity,
  colormap = 'jet',
  lutFilter = 'standard',
  className = ''
}) {
  const { id, imageUrl } = caseData;
  const activeOpacity = opacity !== undefined ? opacity : (caseData.overlayOpacity || 0.65);

  // Base SVG dimensions
  const width = 400;
  const height = 400;

  // SVG Renderers for the base anatomical radiograph
  const renderAnatomy = () => (
    <g className="anatomical-radiograph">
      {/* Deep radiographic background */}
      <rect width={width} height={height} fill="#090d16" rx="8" />
      
      {/* Soft thorax boundary / chest wall */}
      <ellipse cx="200" cy="210" rx="175" ry="175" fill="#131926" />
      
      {/* Diaphragm dome left and right */}
      <path d="M 40 370 Q 120 280 200 320 Q 280 280 360 370 L 360 400 L 40 400 Z" fill="#202938" opacity="0.9" />

      {/* Left Lung field (Radiolucent dark space) */}
      <path
        d="M 80 100 C 65 140 60 210 65 290 C 95 295 135 295 165 285 C 160 230 155 170 145 110 C 130 95 100 90 80 100 Z"
        fill="#05080e"
      />

      {/* Right Lung field (Radiolucent dark space) */}
      <path
        d="M 320 100 C 335 140 340 210 335 290 C 305 295 265 295 235 285 C 240 230 245 170 255 110 C 270 95 300 90 320 100 Z"
        fill="#05080e"
      />

      {/* Spine / Vertebral column */}
      <g opacity="0.35" stroke="#475569" strokeWidth="2">
        <line x1="200" y1="40" x2="200" y2="350" strokeDasharray="6 4" strokeWidth="12" strokeLinecap="round" />
        {[70, 95, 120, 145, 170, 195, 220, 245, 270, 295].map((y, i) => (
          <rect key={i} x="190" y={y} width="20" height="14" rx="3" fill="#64748b" opacity="0.4" />
        ))}
      </g>

      {/* Mediastinum & Cardiac Silhouette */}
      <path
        d="M 190 70 C 185 130 180 180 170 210 C 150 250 145 285 180 300 C 215 315 235 300 230 260 C 225 210 220 130 210 70 Z"
        fill="#2a3447"
        opacity="0.75"
      />

      {/* Clavicles (collar bones) */}
      <path d="M 60 85 Q 130 95 190 90" stroke="#64748b" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 340 85 Q 270 95 210 90" stroke="#64748b" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Rib Arches (Bilateral posterior and anterior ribs) */}
      <g stroke="#3b485d" strokeWidth="4" fill="none" opacity="0.45">
        <path d="M 185 110 Q 110 120 70 145" />
        <path d="M 215 110 Q 290 120 330 145" />
        <path d="M 185 140 Q 95 155 65 190" />
        <path d="M 215 140 Q 305 155 335 190" />
        <path d="M 185 170 Q 90 190 65 235" />
        <path d="M 215 170 Q 310 190 335 235" />
        <path d="M 185 200 Q 85 230 70 275" />
        <path d="M 215 200 Q 315 230 330 275" />
        <path d="M 185 235 Q 95 265 80 305" />
        <path d="M 215 235 Q 305 265 320 305" />
      </g>

      {/* Case-specific radiographic pathology highlights */}
      {id === 'case-01' && (
        <g className="covid-infiltrates" opacity="0.55">
          {/* Peripheral ground glass opacities */}
          <circle cx="105" cy="225" r="28" fill="#cbd5e1" filter="blur(9px)" />
          <circle cx="130" cy="250" r="22" fill="#e2e8f0" filter="blur(8px)" />
          <circle cx="285" cy="220" r="26" fill="#cbd5e1" filter="blur(9px)" />
          <circle cx="300" cy="245" r="24" fill="#e2e8f0" filter="blur(8px)" />
        </g>
      )}

      {id === 'case-03' && (
        <g className="artifact-highlight">
          {/* Dense external marker / artifact clip */}
          <rect x="52" y="55" width="28" height="14" rx="2" fill="#ffffff" opacity="0.9" stroke="#94a3b8" />
          <text x="56" y="66" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="sans-serif">DEMO</text>
          {/* Dense soft-tissue border shadow */}
          <path d="M 45 60 Q 80 120 70 180" stroke="#94a3b8" strokeWidth="5" fill="none" opacity="0.75" />
        </g>
      )}

      {id === 'case-04' && (
        <g className="subtle-opacity" opacity="0.35">
          {/* Faint retrocardiac infiltrate */}
          <circle cx="160" cy="265" r="18" fill="#cbd5e1" filter="blur(7px)" />
        </g>
      )}

      {/* Medical Orientation & Lead Markers */}
      <text x="365" y="35" fill="#94a3b8" fontSize="14" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">R</text>
      <text x="35" y="35" fill="#94a3b8" fontSize="14" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">L</text>
      <text x="25" y="385" fill="#64748b" fontSize="9" fontFamily="monospace">DEMO-SIM: 120kVp</text>
    </g>
  );

  // SVG Renderers for the Grad-CAM heatmaps
  const renderHeatmap = (isOverlay = false) => {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-full ${isOverlay ? 'absolute inset-0 mix-blend-screen pointer-events-none' : ''}`}
        style={{ opacity: isOverlay ? (caseData.overlayOpacity || 0.65) : 1 }}
      >
        <defs>
          {/* Jet / Thermal Multi-stop Colormaps */}
          <radialGradient id="hotspot-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#f97316" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#eab308" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hotspot-right" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#ea580c" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#facc15" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hotspot-normal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hotspot-artifact" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#f97316" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#eab308" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#14b8a6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hotspot-weak" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Heatmap background when in standalone heatmap mode */}
        {!isOverlay && (
          <rect width={width} height={height} fill="#050a14" rx="8" />
        )}

        {/* CASE 01: Bilateral Lower/Mid-zone Opacity Activations */}
        {id === 'case-01' && (
          <g className="heatmap-case-1">
            <circle cx="112" cy="235" r="75" fill="url(#hotspot-left)" />
            <circle cx="288" cy="230" r="72" fill="url(#hotspot-right)" />
            <circle cx="115" cy="240" r="42" fill="#f43f5e" opacity="0.8" />
            <circle cx="285" cy="235" r="38" fill="#f43f5e" opacity="0.75" />
          </g>
        )}

        {/* CASE 02: Normal Basal Low-Intensity Spread */}
        {id === 'case-02' && (
          <g className="heatmap-case-2">
            <ellipse cx="115" cy="245" rx="65" ry="50" fill="url(#hotspot-normal)" />
            <ellipse cx="285" cy="245" rx="65" ry="50" fill="url(#hotspot-normal)" />
          </g>
        )}

        {/* CASE 03: False Positive Clavicle & Boundary Artifact */}
        {id === 'case-03' && (
          <g className="heatmap-case-3">
            <ellipse cx="70" cy="75" rx="65" ry="55" fill="url(#hotspot-artifact)" />
            <circle cx="68" cy="70" r="30" fill="#ef4444" opacity="0.9" />
            <ellipse cx="130" cy="95" rx="45" ry="30" fill="url(#hotspot-weak)" />
          </g>
        )}

        {/* CASE 04: False Negative Weak Diffuse Low Saliency */}
        {id === 'case-04' && (
          <g className="heatmap-case-4">
            <ellipse cx="190" cy="260" rx="75" ry="45" fill="url(#hotspot-weak)" />
            <ellipse cx="270" cy="270" rx="55" ry="35" fill="url(#hotspot-weak)" />
          </g>
        )}
      </svg>
    );
  };

  const getLutFilterStyle = () => {
    switch (lutFilter) {
      case 'inverted':
        return 'invert(100%) contrast(110%)';
      case 'contrast':
        return 'contrast(140%) brightness(95%)';
      default:
        return 'none';
    }
  };

  // If this case has an external uploaded image, render with DynamicGradCamCanvas
  if (imageUrl) {
    return (
      <div className={`relative w-full aspect-square overflow-hidden rounded-lg bg-slate-950 border border-slate-200/80 shadow-inner flex items-center justify-center ${className}`}>
        <DynamicGradCamCanvas
          imageUrl={imageUrl}
          mode={mode}
          opacity={activeOpacity}
          colormap={colormap}
          lutFilter={lutFilter}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-square overflow-hidden rounded-lg bg-slate-950 border border-slate-200/80 shadow-inner flex items-center justify-center ${className}`}>
      {mode === 'original' && (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" style={{ filter: getLutFilterStyle() }}>
          {renderAnatomy()}
        </svg>
      )}

      {mode === 'heatmap' && (
        renderHeatmap(false)
      )}

      {mode === 'overlay' && (
        <>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" style={{ filter: getLutFilterStyle() }}>
            {renderAnatomy()}
          </svg>
          {renderHeatmap(true)}
        </>
      )}
    </div>
  );
}

