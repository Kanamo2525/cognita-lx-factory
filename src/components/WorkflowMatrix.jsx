import React, { useState } from 'react';
import { workflows } from '../data/workflows';
import { WorkflowCard } from './WorkflowCard';

export function WorkflowMatrix() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [sortBy, setSortBy] = useState('productionTime');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedWorkflows = [...workflows].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'productionTime':
        aVal = a.productionTime.min;
        bVal = b.productionTime.min;
        break;
      case 'effortRatio':
        aVal = a.effortRatio.min;
        bVal = b.effortRatio.min;
        break;
      case 'licenceOutil':
        aVal = a.licenceOutil.annual;
        bVal = b.licenceOutil.annual;
        break;
      case 'aiReduction':
        aVal = a.aiImpact.reductionRatio;
        bVal = b.aiImpact.reductionRatio;
        break;
      default:
        aVal = a.name;
        bVal = b.name;
    }

    if (sortAsc) {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ column }) => (
    <span className={`ml-1 ${sortBy === column ? 'text-accent' : 'text-gray-400'}`}>
      {sortBy === column ? (sortAsc ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Matrice des Workflows
        </h2>
        <p className="text-gray-600">
          Comparez les 5 workflows de production digital learning
        </p>
      </div>

      {/* Comparison Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Workflow
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('productionTime')}
                >
                  Production <SortIcon column="productionTime" />
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('effortRatio')}
                >
                  Ratio Effort <SortIcon column="effortRatio" />
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('licenceOutil')}
                >
                  Licence Outil/an <SortIcon column="licenceOutil" />
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('aiReduction')}
                >
                  Gain IA <SortIcon column="aiReduction" />
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Equipe
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkflows.map((workflow, idx) => (
                <tr
                  key={workflow.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedWorkflow?.id === workflow.id ? 'bg-accent/5' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${workflow.color}20` }}
                      >
                        {workflow.icon === 'GraduationCap' && '🎓'}
                        {workflow.icon === 'Zap' && '⚡'}
                        {workflow.icon === 'Video' && '🎬'}
                        {workflow.icon === 'ClipboardCheck' && '📝'}
                        {workflow.icon === 'FileText' && '📋'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{workflow.nameShort}</p>
                        <p className="text-xs text-gray-500">
                          {workflow.duration.min}-{workflow.duration.max} min
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="font-mono text-sm">
                      {workflow.productionTime.min}-{workflow.productionTime.max}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      {workflow.productionTime.unit}
                    </span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="font-mono text-sm">
                      {workflow.effortRatio.min}:1
                    </span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="font-semibold">
                      {workflow.licenceOutil.annual}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">EUR</span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="badge-success">
                      -{workflow.aiImpact.reductionRatio}%
                    </span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-sm text-gray-600">
                      {workflow.team.reduce((sum, m) => sum + m.fte, 0).toFixed(1)} FTE
                    </span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <button
                      onClick={() => setSelectedWorkflow(
                        selectedWorkflow?.id === workflow.id ? null : workflow
                      )}
                      className="text-accent hover:text-primary font-medium text-sm"
                    >
                      {selectedWorkflow?.id === workflow.id ? 'Fermer' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-success/10 to-success/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Moyenne AI Automated</p>
              <p className="text-2xl font-bold text-success">35%</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Moyenne AI Augmented</p>
              <p className="text-2xl font-bold text-accent">42%</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-gray-100 to-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Moyenne Human-Only</p>
              <p className="text-2xl font-bold text-gray-700">23%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Workflow Detail */}
      {selectedWorkflow && (
        <div className="animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Details: {selectedWorkflow.name}
          </h3>
          <WorkflowCard
            workflow={selectedWorkflow}
            showDetails={true}
            isSelected={true}
          />
        </div>
      )}

      {/* Quick Legend */}
      <div className="card bg-gray-50">
        <h4 className="font-semibold text-gray-700 mb-3">Legende Impact IA</h4>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-success"></div>
            <span>AI Automated (supervision minimale)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-accent"></div>
            <span>AI Augmented (collaboration humain + IA)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-300"></div>
            <span>Human-Only (jugement expert)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
