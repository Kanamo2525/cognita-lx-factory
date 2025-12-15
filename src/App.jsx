import React, { useState } from 'react';
import { Header } from './components/Header';
import { WorkflowMatrix } from './components/WorkflowMatrix';
import { DecisionTree } from './components/DecisionTree';
import { Recommendation } from './components/Recommendation';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState('matrix');

  const renderContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <WorkflowMatrix />;
      case 'decision':
        return <DecisionTree />;
      case 'recommendation':
        return <Recommendation />;
      default:
        return <WorkflowMatrix />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>

      {/* Footer */}
      <footer className="bg-primary text-white/70 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                COGNITA — Workflow Decision Tool
              </p>
              <p className="text-xs text-white/50">
                Projet CMA CGM LX Factory | Bluenove — Decembre 2025
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs">Confidentiel</span>
              <div className="w-px h-4 bg-white/20"></div>
              <span className="text-xs">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
