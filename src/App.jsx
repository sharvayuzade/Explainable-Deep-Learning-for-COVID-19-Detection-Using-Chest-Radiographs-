import React, { useState, useEffect } from 'react';
import { mockCases } from './data/mockCases';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import KpiCards from './components/KpiCards';
import ExplanationScore from './components/ExplanationScore';
import TrustCheck from './components/TrustCheck';
import XRayViewer from './components/XRayViewer';
import GradCamViewer from './components/GradCamViewer';
import AttentionAnalysis from './components/AttentionAnalysis';
import PredictionExplorer from './components/PredictionExplorer';
import ModelPerformance from './components/ModelPerformance';
import ModelInsights from './components/ModelInsights';
import HealthcareInsights from './components/HealthcareInsights';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';

export default function App() {
  const [casesList, setCasesList] = useState(mockCases);
  const [selectedCase, setSelectedCase] = useState(mockCases[0]);
  const [activeSection, setActiveSection] = useState('overview');
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'xray-analysis', 'model-performance', 'xai-insights'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCaseCreated = (newCase) => {
    setCasesList((prev) => [newCase, ...prev]);
    setSelectedCase(newCase);
    scrollToSection('xray-analysis');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-medical-100 selection:text-medical-900">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenUploader={() => setIsUploaderOpen(true)}
      />

      {/* 2. Overview / Hero Section */}
      <HeroSection
        onExploreAnalysis={() => scrollToSection('xray-analysis')}
        onExploreXai={() => scrollToSection('gradcam-section')}
        onOpenUploader={() => setIsUploaderOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* 3. KPI Section */}
        <section aria-label="Key Performance Indicators">
          <KpiCards />
        </section>

        {/* 4. Signature Features: AI Explanation Score + AI Trust Check */}
        <section aria-label="AI Explanation and Trust Verification" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <ExplanationScore currentCase={selectedCase} />
          </div>
          <div className="lg:col-span-5">
            <TrustCheck currentCase={selectedCase} />
          </div>
        </section>

        {/* 5. Main X-Ray Analysis Section */}
        <section id="xray-analysis" aria-label="Chest Radiograph Analysis" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-medical-50 text-medical-700 border border-medical-200">
                  INTERACTIVE WORKBENCH
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Case Examination
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                X-Ray Analysis
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Select demonstration cases or upload external radiographs to evaluate prediction and interpretability.
            </span>
          </div>

          <XRayViewer
            cases={casesList}
            selectedCase={selectedCase}
            onSelectCase={setSelectedCase}
            onOpenUploader={() => setIsUploaderOpen(true)}
          />
        </section>

        {/* 6. Grad-CAM XAI Section + Model Attention Analysis */}
        <section id="gradcam-section" aria-label="Explainable AI Visualizer" className="space-y-6">
          <GradCamViewer currentCase={selectedCase} />
          
          <div className="grid grid-cols-1 gap-6">
            <AttentionAnalysis currentCase={selectedCase} />
          </div>
        </section>

        {/* 7. Prediction Explorer */}
        <section aria-label="Comparative Prediction Explorer">
          <PredictionExplorer
            cases={casesList}
            selectedCase={selectedCase}
            onSelectCase={setSelectedCase}
          />
        </section>

        {/* 8. Model Performance Section */}
        <section aria-label="Simulated Architecture Benchmarks">
          <ModelPerformance />
        </section>

        {/* 9. Model Insights */}
        <section aria-label="Research Takeaways">
          <ModelInsights />
        </section>

        {/* 10. Healthcare Analytics Insights */}
        <HealthcareInsights />

      </main>

      {/* 11. Footer Disclaimer & Institutional Metadata */}
      <Footer />

      {/* 12. External Radiograph Uploader Modal */}
      <ImageUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onCaseCreated={handleCaseCreated}
      />

    </div>
  );
}
