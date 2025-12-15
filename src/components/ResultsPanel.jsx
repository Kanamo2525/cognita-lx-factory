import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { getToolsByWorkflow } from '../data/tools';
import { decisionCriteria } from '../data/decisionCriteria';
import { downloadPdf } from '../utils/pdfExport';

export function ResultsPanel({
  projectName,
  primaryRecommendation,
  alternativeRecommendations,
  projectRequirements,
  completionPercentage,
  onReset
}) {
  const handleDownloadPdf = () => {
    downloadPdf({
      projectName,
      primaryRecommendation,
      alternativeRecommendations,
      projectRequirements
    });
  };

  if (!primaryRecommendation || completionPercentage < 25) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          En attente de vos criteres
        </h3>
        <p className="text-gray-500">
          Completez au moins 25% du formulaire pour voir les recommandations
        </p>
        <div className="mt-4">
          <div className="progress-bar max-w-xs mx-auto">
            <div
              className="progress-fill bg-accent"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">{completionPercentage}% complete</p>
        </div>
      </div>
    );
  }

  const { workflow, percentage, confidence, criteriaScores } = primaryRecommendation;
  const tools = getToolsByWorkflow(workflow.id);

  // Data for pie chart
  const aiImpactData = [
    { name: 'Automatise', value: workflow.aiImpact.automated, color: '#10B981' },
    { name: 'Augmente', value: workflow.aiImpact.augmented, color: '#52CBFF' },
    { name: 'Humain', value: workflow.aiImpact.humanOnly, color: '#9CA3AF' }
  ];

  // Data for bar chart
  const barData = [primaryRecommendation, ...alternativeRecommendations.slice(0, 4)].map(rec => ({
    name: rec.workflow.nameShort,
    score: rec.percentage,
    color: rec.workflow.color
  }));

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Resultats de l'analyse</h2>
          <p className="text-gray-500">
            {projectName ? (
              <span className="font-medium text-primary">{projectName}</span>
            ) : (
              <span>Base sur {Object.keys(projectRequirements).filter(k => projectRequirements[k]).length} criteres</span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadPdf}
            className="btn-primary text-sm flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Telecharger PDF</span>
          </button>
          <button onClick={onReset} className="btn-secondary text-sm">
            Reinitialiser
          </button>
        </div>
      </div>

      {/* Project Name Display */}
      {projectName && (
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-accent/20">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Projet</p>
          <h3 className="text-lg font-bold text-primary">{projectName}</h3>
        </div>
      )}

      {/* Primary Recommendation */}
      <div className={`card border-2 ${
        percentage >= 70 ? 'border-success/30 bg-success/5' :
        percentage >= 50 ? 'border-warning/30 bg-warning/5' :
        'border-gray-200'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
              percentage >= 70 ? 'bg-success/10 text-success' :
              percentage >= 50 ? 'bg-warning/10 text-warning' :
              'bg-gray-100 text-gray-600'
            }`}>
              {confidence.label}
            </span>
            <h3 className="text-2xl font-bold text-gray-900">{workflow.name}</h3>
            <p className="text-gray-500">{workflow.description}</p>
          </div>
          <div className="text-right">
            <span className={`text-5xl font-bold ${
              percentage >= 70 ? 'text-success' :
              percentage >= 50 ? 'text-warning' :
              'text-gray-400'
            }`}>
              {percentage}%
            </span>
            <p className="text-sm text-gray-500">correspondance</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{confidence.description}</p>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase">Production</p>
            <p className="text-lg font-bold text-gray-900">
              {workflow.productionTime.min}-{workflow.productionTime.max} {workflow.productionTime.unit}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase">Effort</p>
            <p className="text-lg font-bold text-gray-900">
              {workflow.effortRatio.min}:1 ratio
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase">Licence Outil/an</p>
            <p className="text-lg font-bold text-gray-900">
              {workflow.licenceOutil.annual} EUR
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase">Gain IA</p>
            <p className="text-lg font-bold text-success">
              -{workflow.aiImpact.reductionRatio}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Impact Pie Chart */}
        <div className="card">
          <h4 className="font-semibold text-gray-700 mb-4">Repartition IA / Humain</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aiImpactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {aiImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            {aiImpactData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600">{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Bar Chart */}
        <div className="card">
          <h4 className="font-semibold text-gray-700 mb-4">Comparaison des scores</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tools Stack */}
      <div className="card">
        <h4 className="font-semibold text-gray-700 mb-4">Stack Outils Recommandee</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tier 1 — Essentiels</p>
            <div className="space-y-2">
              {workflow.tools.tier1.map((toolName) => {
                const tool = tools.find(t => t.name === toolName);
                return (
                  <div key={toolName} className="flex items-center justify-between bg-success/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">{toolName}</span>
                    </div>
                    {tool?.price?.amount && (
                      <span className="text-sm text-gray-500">
                        {tool.price.amount} {tool.price.currency}/{tool.price.period === 'month' ? 'mo' : tool.price.period}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tier 2 — Optionnels</p>
            <div className="space-y-2">
              {workflow.tools.tier2.map((toolName) => {
                const tool = tools.find(t => t.name === toolName);
                return (
                  <div key={toolName} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700">{toolName}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Team Composition */}
      <div className="card">
        <h4 className="font-semibold text-gray-700 mb-4">Equipe Type</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {workflow.team.map((member, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{member.role}</span>
                <span className="badge-accent text-xs">{member.fte} FTE</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill bg-accent"
                  style={{ width: `${member.fte * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Total: <strong>{workflow.team.reduce((sum, m) => sum + m.fte, 0).toFixed(1)} FTE</strong>
          </p>
        </div>
      </div>

      {/* Alternatives */}
      {alternativeRecommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Alternatives a considerer</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternativeRecommendations.slice(0, 2).map((rec) => (
              <div key={rec.workflow.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${rec.workflow.color}20` }}
                    >
                      {rec.workflow.icon === 'GraduationCap' && '🎓'}
                      {rec.workflow.icon === 'Zap' && '⚡'}
                      {rec.workflow.icon === 'Video' && '🎬'}
                      {rec.workflow.icon === 'ClipboardCheck' && '📝'}
                      {rec.workflow.icon === 'FileText' && '📋'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{rec.workflow.name}</p>
                      <p className="text-sm text-gray-500">{rec.workflow.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${
                      rec.percentage >= 50 ? 'text-warning' : 'text-gray-400'
                    }`}>
                      {rec.percentage}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rec.workflow.useCases.slice(0, 3).map((uc, idx) => (
                    <span key={idx} className="badge-primary text-xs">{uc}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Criteria Breakdown */}
      <div className="card bg-gray-50">
        <h4 className="font-semibold text-gray-700 mb-4">Detail des scores par critere</h4>
        <div className="space-y-3">
          {Object.entries(criteriaScores).map(([criterionId, data]) => (
            <div key={criterionId} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{data.criterion}</span>
                  <span className="text-sm font-medium text-gray-900">{data.score}/10</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${
                      data.score >= 8 ? 'bg-success' :
                      data.score >= 5 ? 'bg-accent' :
                      'bg-warning'
                    }`}
                    style={{ width: `${data.score * 10}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download CTA */}
      <div className="card bg-gradient-to-r from-primary to-primary-light text-white text-center py-8">
        <h4 className="text-lg font-bold mb-2">Exportez votre recommandation</h4>
        <p className="text-white/80 mb-4">
          Telechargez le rapport complet en PDF pour le partager avec votre equipe
        </p>
        <button
          onClick={handleDownloadPdf}
          className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Telecharger le rapport PDF</span>
        </button>
      </div>
    </div>
  );
}
