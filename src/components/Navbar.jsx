import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, CheckCircle2, Menu, X, Info, UploadCloud } from 'lucide-react';

export default function Navbar({ activeSection, onOpenUploader }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "X-Ray Analysis", href: "#xray-analysis" },
    { label: "Model Performance", href: "#model-performance" },
    { label: "XAI Insights", href: "#xai-insights" }
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-medical-50 border border-medical-200 flex items-center justify-center text-medical-600 shadow-sm">
              <Activity className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  COVID-19 Radiograph AI
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  CA-03
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-normal hidden sm:block">
                Explainable Deep Learning Research Dashboard
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-medical-700 bg-medical-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Model Status & Global Persistent DEMO DATA Badge */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Model Metadata Tags */}
            <div className="flex items-center text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 space-x-2">
              <span className="flex items-center text-slate-700">
                <Cpu className="w-3.5 h-3.5 mr-1 text-slate-500" />
                Model: <span className="font-semibold text-slate-900 ml-1">Demo EfficientNet</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
                Status: <span className="font-semibold text-slate-800 ml-1">Demo</span>
              </span>
            </div>

            {/* Persistent DEMO DATA Badge with Tooltip */}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                onClick={() => setTooltipVisible(!tooltipVisible)}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-sm hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Demo Data Disclaimer"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                DEMO DATA
                <Info className="w-3.5 h-3.5 ml-1 text-amber-600" />
              </button>

              {/* Tooltip */}
              {tooltipVisible && (
                <div className="absolute right-0 mt-2 w-72 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-50 border border-slate-700 tooltip-fade">
                  <div className="flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-300 mb-1">Academic Demonstration Only</p>
                      <p className="text-slate-300 leading-relaxed">
                        All predictions, metrics and visualizations currently shown are simulated demonstration data and are not clinical results.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Upload Button */}
            <button
              type="button"
              onClick={onOpenUploader}
              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-sm transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
              Upload Image
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={onOpenUploader}
              className="p-1.5 rounded-md text-medical-700 bg-medical-50 border border-medical-200"
              aria-label="Upload Radiograph"
            >
              <UploadCloud className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              DEMO DATA
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg">
          <div className="py-1 border-b border-slate-100">
            <p className="text-xs font-mono text-slate-500">
              Model: Demo EfficientNet-B0 (Status: Demo)
            </p>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-medical-700 hover:bg-medical-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <span className="font-bold">Notice:</span> All predictions and XAI outputs are simulated demonstration values.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
