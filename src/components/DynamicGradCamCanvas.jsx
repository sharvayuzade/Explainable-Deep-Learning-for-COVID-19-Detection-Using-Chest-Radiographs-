import React, { useEffect, useRef } from 'react';

/**
 * Dynamic Grad-CAM Canvas Renderer
 * Supports rendering realistic heatmaps over uploaded images or preset vectors.
 * Colormaps supported: 'jet', 'viridis', 'inferno'.
 */
export default function DynamicGradCamCanvas({
  imageUrl,
  mode = 'overlay', // 'original' | 'heatmap' | 'overlay'
  opacity = 0.65,
  colormap = 'jet',
  lutFilter = 'standard',
  className = '',
  hotspots = null
}) {
  const canvasRef = useRef(null);

  // Filter styles based on radiographic LUT
  const getFilterStyle = () => {
    switch (lutFilter) {
      case 'inverted':
        return 'invert(100%) contrast(110%)';
      case 'contrast':
        return 'contrast(140%) brightness(95%)';
      default:
        return 'none';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 400;
    const height = 400;

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    // Default hotspots if none provided
    const defaultHotspots = hotspots || [
      { x: 120, y: 230, r: 75, weight: 0.95 },
      { x: 280, y: 235, r: 70, weight: 0.90 },
      { x: 130, y: 240, r: 40, weight: 0.85 }
    ];

    const drawHeatmap = () => {
      // In heatmap-only mode, fill dark background
      if (mode === 'heatmap') {
        ctx.fillStyle = '#060b14';
        ctx.fillRect(0, 0, width, height);
      }

      // Draw radial gradients for each hotspot
      defaultHotspots.forEach(spot => {
        const radGrad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);

        if (colormap === 'viridis') {
          radGrad.addColorStop(0, `rgba(253, 231, 37, ${0.9 * opacity})`);
          radGrad.addColorStop(0.35, `rgba(53, 183, 121, ${0.75 * opacity})`);
          radGrad.addColorStop(0.7, `rgba(49, 104, 142, ${0.5 * opacity})`);
          radGrad.addColorStop(1, 'rgba(68, 1, 84, 0)');
        } else if (colormap === 'inferno') {
          radGrad.addColorStop(0, `rgba(252, 255, 164, ${0.95 * opacity})`);
          radGrad.addColorStop(0.35, `rgba(249, 142, 9, ${0.85 * opacity})`);
          radGrad.addColorStop(0.7, `rgba(187, 55, 84, ${0.55 * opacity})`);
          radGrad.addColorStop(1, 'rgba(0, 0, 4, 0)');
        } else {
          // Classic Jet / Medical Thermal
          radGrad.addColorStop(0, `rgba(239, 68, 68, ${0.95 * opacity})`);
          radGrad.addColorStop(0.35, `rgba(249, 115, 22, ${0.85 * opacity})`);
          radGrad.addColorStop(0.65, `rgba(234, 179, 8, ${0.65 * opacity})`);
          radGrad.addColorStop(0.85, `rgba(34, 197, 94, ${0.35 * opacity})`);
          radGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      img.onload = () => {
        // Draw base image if mode is original or overlay
        if (mode === 'original' || mode === 'overlay') {
          ctx.save();
          ctx.filter = getFilterStyle();
          // Draw aspect fill/contain
          ctx.drawImage(img, 0, 0, width, height);
          ctx.restore();
        }

        // Overlay heatmap
        if (mode === 'overlay' || mode === 'heatmap') {
          if (mode === 'overlay') {
            ctx.globalCompositeOperation = 'screen';
          }
          drawHeatmap();
          ctx.globalCompositeOperation = 'source-over';
        }
      };
    } else {
      // Heatmap only when no image
      if (mode === 'heatmap' || mode === 'overlay') {
        drawHeatmap();
      }
    }
  }, [imageUrl, mode, opacity, colormap, lutFilter, hotspots]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover rounded-lg ${className}`}
      style={{ filter: mode === 'original' ? getFilterStyle() : 'none' }}
    />
  );
}
