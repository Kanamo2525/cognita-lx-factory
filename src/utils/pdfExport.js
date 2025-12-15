import { decisionCriteria } from '../data/decisionCriteria';

/**
 * Sanitize string to prevent XSS attacks in HTML context
 * @param {string} text - The text to sanitize
 * @returns {string} - HTML-escaped text safe for injection
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

export function generatePdfContent({
  projectName,
  primaryRecommendation,
  alternativeRecommendations,
  projectRequirements
}) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { workflow, percentage, confidence, criteriaScores } = primaryRecommendation;

  // Build criteria summary
  const criteriaSummary = Object.entries(projectRequirements)
    .filter(([_, value]) => value)
    .map(([criterionId, value]) => {
      const criterion = decisionCriteria[criterionId];
      const option = criterion.options.find(o => o.value === value);
      return `${criterion.label}: ${option?.label || value}`;
    })
    .join('\n');

  // Build tools list
  const toolsTier1 = workflow.tools.tier1.join(', ');
  const toolsTier2 = workflow.tools.tier2.join(', ');

  // Build team composition
  const teamComposition = workflow.team
    .map(m => `${m.role}: ${m.fte} FTE`)
    .join('\n');

  const totalFTE = workflow.team.reduce((sum, m) => sum + m.fte, 0).toFixed(1);

  // Build alternatives
  const alternatives = alternativeRecommendations
    .slice(0, 2)
    .map(rec => `- ${rec.workflow.name}: ${rec.percentage}%`)
    .join('\n');

  // Sanitize all text content to prevent XSS
  return {
    projectName: escapeHtml(projectName || 'Projet sans nom'),
    date: escapeHtml(today),
    workflow: escapeHtml(workflow.name),
    percentage,
    confidenceLabel: escapeHtml(confidence.label),
    confidenceDescription: escapeHtml(confidence.description),
    description: escapeHtml(workflow.description),
    productionTime: escapeHtml(`${workflow.productionTime.min}-${workflow.productionTime.max} ${workflow.productionTime.unit}`),
    effortRatio: escapeHtml(`${workflow.effortRatio.min}:1 - ${workflow.effortRatio.max}:1`),
    licenceOutil: escapeHtml(`${workflow.licenceOutil.annual} EUR/an`),
    aiReduction: escapeHtml(`-${workflow.aiImpact.reductionRatio}%`),
    aiBreakdown: {
      automated: workflow.aiImpact.automated,
      augmented: workflow.aiImpact.augmented,
      humanOnly: workflow.aiImpact.humanOnly
    },
    criteriaSummary: escapeHtml(criteriaSummary),
    toolsTier1: escapeHtml(toolsTier1),
    toolsTier2: escapeHtml(toolsTier2),
    teamComposition: escapeHtml(teamComposition),
    totalFTE: escapeHtml(totalFTE),
    alternatives: escapeHtml(alternatives),
    useCases: escapeHtml(workflow.useCases.join(', '))
  };
}

export function downloadPdf({
  projectName,
  primaryRecommendation,
  alternativeRecommendations,
  projectRequirements
}) {
  const data = generatePdfContent({
    projectName,
    primaryRecommendation,
    alternativeRecommendations,
    projectRequirements
  });

  // Create a printable HTML document
  const printContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>COGNITA - ${data.projectName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Montserrat', -apple-system, sans-serif;
      color: #2D2D2D;
      line-height: 1.6;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      background: linear-gradient(135deg, #0D3A50 0%, #1a5a7a 100%);
      color: white;
      padding: 30px;
      margin: -40px -40px 30px -40px;
    }

    .header h1 {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    .header h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .header p {
      font-size: 12px;
      opacity: 0.7;
    }

    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #0D3A50;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #52CBFF;
    }

    .recommendation-box {
      background: #f0fdf4;
      border: 2px solid #10B981;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
    }

    .recommendation-box.warning {
      background: #fffbeb;
      border-color: #F59E0B;
    }

    .recommendation-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }

    .recommendation-title {
      font-size: 24px;
      font-weight: 700;
      color: #0D3A50;
    }

    .recommendation-score {
      font-size: 36px;
      font-weight: 700;
      color: #10B981;
    }

    .recommendation-score.warning {
      color: #F59E0B;
    }

    .badge {
      display: inline-block;
      background: #10B981;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .badge.warning {
      background: #F59E0B;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }

    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }

    .metric-label {
      font-size: 10px;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 5px;
    }

    .metric-value {
      font-size: 16px;
      font-weight: 700;
      color: #0D3A50;
    }

    .metric-value.success {
      color: #10B981;
    }

    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .list-item {
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 13px;
    }

    .list-item:last-child {
      border-bottom: none;
    }

    .tool-badge {
      display: inline-block;
      background: #52CBFF20;
      color: #0D3A50;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      margin: 2px;
    }

    .ai-bar {
      display: flex;
      height: 20px;
      border-radius: 10px;
      overflow: hidden;
      margin: 10px 0;
    }

    .ai-bar-segment {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      font-weight: 600;
    }

    .ai-bar-auto { background: #10B981; }
    .ai-bar-aug { background: #52CBFF; }
    .ai-bar-human { background: #9CA3AF; }

    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }

    .criteria-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .criteria-item {
      font-size: 12px;
      padding: 8px 12px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .criteria-label {
      color: #64748b;
    }

    .criteria-value {
      font-weight: 600;
      color: #0D3A50;
    }

    @media print {
      body { padding: 20px; }
      .header { margin: -20px -20px 20px -20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>COGNITA | Workflow Decision Tool</h1>
    <h2>${data.projectName}</h2>
    <p>Rapport genere le ${data.date} | CMA CGM LX Factory</p>
  </div>

  <div class="section">
    <div class="recommendation-box ${data.percentage >= 70 ? '' : 'warning'}">
      <div class="recommendation-header">
        <div>
          <span class="badge ${data.percentage >= 70 ? '' : 'warning'}">${data.confidenceLabel}</span>
          <h3 class="recommendation-title">${data.workflow}</h3>
          <p style="color: #64748b; font-size: 14px;">${data.description}</p>
        </div>
        <div class="recommendation-score ${data.percentage >= 70 ? '' : 'warning'}">
          ${data.percentage}%
        </div>
      </div>
      <p style="font-size: 13px; color: #374151;">${data.confidenceDescription}</p>
    </div>
  </div>

  <div class="section">
    <h3 class="section-title">Metriques Cles</h3>
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Production</div>
        <div class="metric-value">${data.productionTime}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Ratio Effort</div>
        <div class="metric-value">${data.effortRatio}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Licence Outil</div>
        <div class="metric-value">${data.licenceOutil}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Gain IA</div>
        <div class="metric-value success">${data.aiReduction}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h3 class="section-title">Repartition IA / Humain</h3>
    <div class="ai-bar">
      <div class="ai-bar-segment ai-bar-auto" style="width: ${data.aiBreakdown.automated}%">
        ${data.aiBreakdown.automated}%
      </div>
      <div class="ai-bar-segment ai-bar-aug" style="width: ${data.aiBreakdown.augmented}%">
        ${data.aiBreakdown.augmented}%
      </div>
      <div class="ai-bar-segment ai-bar-human" style="width: ${data.aiBreakdown.humanOnly}%">
        ${data.aiBreakdown.humanOnly}%
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
      <span>Automatise (${data.aiBreakdown.automated}%)</span>
      <span>Augmente (${data.aiBreakdown.augmented}%)</span>
      <span>Humain seul (${data.aiBreakdown.humanOnly}%)</span>
    </div>
  </div>

  <div class="section">
    <h3 class="section-title">Stack Outils</h3>
    <div class="two-columns">
      <div>
        <p style="font-size: 11px; color: #64748b; margin-bottom: 8px;">TIER 1 — ESSENTIELS</p>
        <div>${data.toolsTier1.split(', ').map(t => `<span class="tool-badge">${t}</span>`).join('')}</div>
      </div>
      <div>
        <p style="font-size: 11px; color: #64748b; margin-bottom: 8px;">TIER 2 — OPTIONNELS</p>
        <div>${data.toolsTier2.split(', ').map(t => `<span class="tool-badge">${t}</span>`).join('')}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h3 class="section-title">Equipe Type</h3>
    <div style="background: #f8fafc; border-radius: 8px; padding: 15px;">
      ${data.teamComposition.split('\n').map(line => `<div class="list-item">${line}</div>`).join('')}
      <div style="margin-top: 10px; padding-top: 10px; border-top: 2px solid #e2e8f0; font-weight: 700;">
        Total: ${data.totalFTE} FTE
      </div>
    </div>
  </div>

  <div class="section">
    <h3 class="section-title">Vos Criteres</h3>
    <div class="criteria-grid">
      ${data.criteriaSummary.split('\n').map(line => {
        const [label, value] = line.split(': ');
        return `<div class="criteria-item"><span class="criteria-label">${label}:</span> <span class="criteria-value">${value}</span></div>`;
      }).join('')}
    </div>
  </div>

  ${data.alternatives ? `
  <div class="section">
    <h3 class="section-title">Alternatives</h3>
    <div style="background: #f8fafc; border-radius: 8px; padding: 15px;">
      ${data.alternatives.split('\n').map(line => `<div class="list-item">${line}</div>`).join('')}
    </div>
  </div>
  ` : ''}

  <div class="section">
    <h3 class="section-title">Use Cases Recommandes</h3>
    <p style="font-size: 13px; color: #374151;">${data.useCases}</p>
  </div>

  <div class="footer">
    <p>COGNITA | Workflow Decision Tool</p>
    <p>CMA CGM LX Factory — Bluenove | Decembre 2025 | Confidentiel</p>
  </div>
</body>
</html>
`;

  // Open print dialog
  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();

  // Wait for fonts to load then print
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
