import React, { useState } from 'react';
import { decisionCriteria, getCriteriaOrder } from '../data/decisionCriteria';
import { workflows, getWorkflowById } from '../data/workflows';
import { calculateRecommendation, getConfidenceLevel } from '../utils/scoring';
import { WorkflowCard } from './WorkflowCard';

const icons = {
  Target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <circle cx="12" cy="12" r="6" strokeWidth={2} />
      <circle cx="12" cy="12" r="2" strokeWidth={2} />
    </svg>
  ),
  Clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  ),
  RefreshCw: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  MousePointer: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  DollarSign: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export function DecisionTree() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const criteriaOrder = getCriteriaOrder();
  const totalSteps = criteriaOrder.length;
  const currentCriterionId = criteriaOrder[currentStep];
  const currentCriterion = decisionCriteria[currentCriterionId];

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentCriterionId]: value };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const recommendations = calculateRecommendation(answers);
  const topRecommendation = recommendations[0];

  if (showResults) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Resultat de l'Analyse
          </h2>
          <p className="text-gray-600">
            Base sur vos {Object.keys(answers).length} criteres
          </p>
        </div>

        {/* Top Recommendation */}
        <div className="card bg-gradient-to-br from-primary/5 to-accent/5 border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Recommandation principale</p>
              <h3 className="text-xl font-bold text-gray-900">{topRecommendation.workflow.name}</h3>
            </div>
            <div className={`text-right ${
              topRecommendation.percentage >= 70 ? 'text-success' :
              topRecommendation.percentage >= 50 ? 'text-warning' : 'text-gray-400'
            }`}>
              <span className="text-4xl font-bold">{topRecommendation.percentage}%</span>
              <p className="text-sm">correspondance</p>
            </div>
          </div>

          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            topRecommendation.percentage >= 70 ? 'bg-success/10 text-success' :
            topRecommendation.percentage >= 50 ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-600'
          }`}>
            {getConfidenceLevel(topRecommendation.percentage).label}
          </div>

          <p className="text-gray-600 mb-6">
            {getConfidenceLevel(topRecommendation.percentage).description}
          </p>

          <WorkflowCard
            workflow={topRecommendation.workflow}
            showDetails={true}
            score={topRecommendation.percentage}
          />
        </div>

        {/* Alternative Recommendations */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Alternatives</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(1, 3).map((rec) => (
              <div key={rec.workflow.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${rec.workflow.color}20` }}
                    >
                      {rec.workflow.icon === 'GraduationCap' && '🎓'}
                      {rec.workflow.icon === 'Zap' && '⚡'}
                      {rec.workflow.icon === 'Video' && '🎬'}
                      {rec.workflow.icon === 'ClipboardCheck' && '📝'}
                      {rec.workflow.icon === 'FileText' && '📋'}
                    </div>
                    <div>
                      <p className="font-semibold">{rec.workflow.nameShort}</p>
                      <p className="text-xs text-gray-500">{rec.workflow.description}</p>
                    </div>
                  </div>
                  <span className={`text-xl font-bold ${
                    rec.percentage >= 50 ? 'text-warning' : 'text-gray-400'
                  }`}>
                    {rec.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary of Answers */}
        <div className="card bg-gray-50">
          <h4 className="font-semibold text-gray-700 mb-4">Vos criteres</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(answers).map(([criterionId, value]) => {
              const criterion = decisionCriteria[criterionId];
              const option = criterion.options.find(o => o.value === value);
              return (
                <div key={criterionId} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{criterion.label}</span>
                  <span className="font-medium text-gray-900">{option?.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            Recommencer l'analyse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Arbre de Decision
        </h2>
        <p className="text-gray-600 mb-4">
          Repondez aux questions pour obtenir une recommandation personnalisee
        </p>
        <div className="flex items-center justify-center space-x-2 mb-2">
          {criteriaOrder.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx < currentStep ? 'bg-success' :
                idx === currentStep ? 'bg-accent' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Question {currentStep + 1} sur {totalSteps}
        </p>
      </div>

      {/* Current Question */}
      <div className="card animate-scale-in">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
            {icons[currentCriterion.icon]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {currentCriterion.label}
            </h3>
            <p className="text-gray-500">
              {currentCriterion.description}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentCriterion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                answers[currentCriterionId] === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers[currentCriterionId] === option.value
                    ? 'border-accent bg-accent'
                    : 'border-gray-300'
                }`}>
                  {answers[currentCriterionId] === option.value && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour</span>
          </button>

          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            Passer cette question
          </button>
        </div>
      </div>

      {/* Preview - Answered Questions */}
      {Object.keys(answers).length > 0 && (
        <div className="card bg-gray-50">
          <p className="text-sm text-gray-500 mb-3">Vos reponses:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(answers).map(([criterionId, value]) => {
              const criterion = decisionCriteria[criterionId];
              const option = criterion.options.find(o => o.value === value);
              return (
                <span key={criterionId} className="badge-accent text-xs">
                  {option?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
