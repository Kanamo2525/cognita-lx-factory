import React from 'react';
import { decisionCriteria, getCriteriaOrder } from '../data/decisionCriteria';

const icons = {
  Target: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <circle cx="12" cy="12" r="6" strokeWidth={2} />
      <circle cx="12" cy="12" r="2" strokeWidth={2} />
    </svg>
  ),
  Clock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  ),
  RefreshCw: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  MousePointer: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Users: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  DollarSign: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Globe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export function ProjectForm({ projectRequirements, onUpdate, completionPercentage }) {
  const criteriaOrder = getCriteriaOrder();

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="card bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">Configurez votre projet</h3>
            <p className="text-white/80 text-sm">
              Remplissez les criteres pour obtenir une recommandation
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold">{completionPercentage}%</span>
            <p className="text-xs text-white/70">complete</p>
          </div>
        </div>
        <div className="progress-bar bg-white/20">
          <div
            className="progress-fill bg-accent"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaOrder.map((criterionId) => {
          const criterion = decisionCriteria[criterionId];
          const Icon = icons[criterion.icon];
          const isAnswered = !!projectRequirements[criterionId];

          return (
            <div
              key={criterionId}
              className={`card transition-all ${
                isAnswered ? 'border-accent/30 bg-accent/5' : ''
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isAnswered ? 'bg-accent/20 text-accent' : 'bg-gray-100 text-gray-500'
                }`}>
                  {Icon}
                </div>
                <div className="flex-1">
                  <label className="font-semibold text-gray-900 text-sm">
                    {criterion.label}
                  </label>
                  {isAnswered && (
                    <span className="ml-2 text-xs text-success">
                      ✓
                    </span>
                  )}
                </div>
              </div>

              <select
                value={projectRequirements[criterionId] || ''}
                onChange={(e) => onUpdate(criterionId, e.target.value || null)}
                className="select-field text-sm"
              >
                <option value="">Selectionnez...</option>
                {criterion.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} — {option.description}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      {completionPercentage > 0 && completionPercentage < 100 && (
        <div className="text-center text-sm text-gray-500">
          <p>
            Completez {8 - Object.keys(projectRequirements).filter(k => projectRequirements[k]).length} criteres
            supplementaires pour une recommandation optimale
          </p>
        </div>
      )}
    </div>
  );
}
