import React from 'react';
import { getToolsByWorkflow } from '../data/tools';

const icons = {
  GraduationCap: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  Zap: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Video: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  ClipboardCheck: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  FileText: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
};

export function WorkflowCard({ workflow, isSelected, onSelect, showDetails = false, score = null }) {
  const tools = getToolsByWorkflow(workflow.id);
  const Icon = icons[workflow.icon] || icons.FileText;

  return (
    <div
      onClick={() => onSelect?.(workflow)}
      className={`card-hover ${isSelected ? 'ring-2 ring-accent border-accent' : ''} ${onSelect ? 'cursor-pointer' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${workflow.color}20`, color: workflow.color }}
          >
            {Icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{workflow.name}</h3>
            <p className="text-sm text-gray-500">{workflow.description}</p>
          </div>
        </div>
        {score !== null && (
          <div className={`text-right ${score >= 70 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-gray-400'}`}>
            <span className="text-2xl font-bold">{score}%</span>
            <p className="text-xs">match</p>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Duree contenu</p>
          <p className="font-semibold text-gray-900">
            {workflow.duration.min}-{workflow.duration.max} {workflow.duration.unit}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Production</p>
          <p className="font-semibold text-gray-900">
            {workflow.productionTime.min}-{workflow.productionTime.max} {workflow.productionTime.unit}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Ratio effort</p>
          <p className="font-semibold text-gray-900">
            {workflow.effortRatio.min}:1 - {workflow.effortRatio.max}:1
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Licence Outil/an</p>
          <p className="font-semibold text-gray-900">
            {workflow.licenceOutil.annual} {workflow.licenceOutil.currency}
          </p>
        </div>
      </div>

      {/* AI Impact */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Impact IA</p>
        <div className="flex h-3 rounded-full overflow-hidden">
          <div
            className="bg-success"
            style={{ width: `${workflow.aiImpact.automated}%` }}
            title={`Automatise: ${workflow.aiImpact.automated}%`}
          />
          <div
            className="bg-accent"
            style={{ width: `${workflow.aiImpact.augmented}%` }}
            title={`Augmente: ${workflow.aiImpact.augmented}%`}
          />
          <div
            className="bg-gray-300"
            style={{ width: `${workflow.aiImpact.humanOnly}%` }}
            title={`Humain seul: ${workflow.aiImpact.humanOnly}%`}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Auto {workflow.aiImpact.automated}%</span>
          <span>Augmente {workflow.aiImpact.augmented}%</span>
          <span>Humain {workflow.aiImpact.humanOnly}%</span>
        </div>
        <p className="text-sm text-success font-medium mt-2">
          Reduction ratio: -{workflow.aiImpact.reductionRatio}%
        </p>
      </div>

      {showDetails && (
        <>
          {/* Use Cases */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Use Cases</p>
            <div className="flex flex-wrap gap-2">
              {workflow.useCases.map((useCase, idx) => (
                <span key={idx} className="badge-primary text-xs">
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Outils Tier 1</p>
            <div className="flex flex-wrap gap-2">
              {workflow.tools.tier1.map((tool, idx) => (
                <span key={idx} className="badge-accent text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Equipe type</p>
            <div className="space-y-1">
              {workflow.team.map((member, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">{member.role}</span>
                  <span className="text-gray-900 font-medium">{member.fte} FTE</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Expand indicator */}
      {!showDetails && onSelect && (
        <div className="text-center pt-2 border-t border-gray-100">
          <span className="text-sm text-accent font-medium">
            Cliquer pour details
          </span>
        </div>
      )}
    </div>
  );
}
