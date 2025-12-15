import React from 'react';
import { useRecommendation } from '../hooks/useRecommendation';
import { ProjectForm } from './ProjectForm';
import { ResultsPanel } from './ResultsPanel';

export function Recommendation() {
  const {
    projectName,
    updateProjectName,
    projectRequirements,
    updateCriterion,
    resetAll,
    primaryRecommendation,
    alternativeRecommendations,
    completionPercentage
  } = useRecommendation();

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Moteur de Recommandation
        </h2>
        <p className="text-gray-600">
          Configurez vos criteres pour obtenir une recommandation personnalisee
        </p>
      </div>

      {/* Project Name Input */}
      <div className="max-w-2xl mx-auto">
        <div className="card bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom du projet
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => updateProjectName(e.target.value)}
            placeholder="Ex: Formation Onboarding Nouveaux Managers"
            className="input-field text-lg font-medium"
          />
          <p className="text-xs text-gray-500 mt-2">
            Ce nom apparaitra sur le rapport PDF de recommandation
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div>
          <ProjectForm
            projectRequirements={projectRequirements}
            onUpdate={updateCriterion}
            completionPercentage={completionPercentage}
          />
        </div>

        {/* Right: Results */}
        <div>
          <ResultsPanel
            projectName={projectName}
            primaryRecommendation={primaryRecommendation}
            alternativeRecommendations={alternativeRecommendations}
            projectRequirements={projectRequirements}
            completionPercentage={completionPercentage}
            onReset={resetAll}
          />
        </div>
      </div>
    </div>
  );
}
