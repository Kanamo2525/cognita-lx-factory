import { workflows } from '../data/workflows';
import { decisionCriteria, getCriteriaOrder } from '../data/decisionCriteria';

export function calculateRecommendation(projectRequirements) {
  const scores = {};
  const criteriaOrder = getCriteriaOrder();

  // Initialize scores for each workflow
  workflows.forEach(workflow => {
    scores[workflow.id] = {
      workflow,
      totalScore: 0,
      maxScore: 0,
      criteriaScores: {},
      percentage: 0
    };
  });

  // Calculate scores based on selected criteria
  criteriaOrder.forEach(criterionId => {
    const selectedValue = projectRequirements[criterionId];
    if (!selectedValue) return;

    const criterion = decisionCriteria[criterionId];
    const selectedOption = criterion.options.find(o => o.value === selectedValue);

    if (!selectedOption || !selectedOption.scores) return;

    const weight = criterion.weight || 1;
    const maxPossibleScore = 10 * weight;

    workflows.forEach(workflow => {
      const score = (selectedOption.scores[workflow.id] || 0) * weight;
      scores[workflow.id].totalScore += score;
      scores[workflow.id].maxScore += maxPossibleScore;
      scores[workflow.id].criteriaScores[criterionId] = {
        score: selectedOption.scores[workflow.id] || 0,
        weighted: score,
        maxWeighted: maxPossibleScore,
        criterion: criterion.label,
        selectedOption: selectedOption.label
      };
    });
  });

  // Calculate percentages
  Object.keys(scores).forEach(workflowId => {
    const { totalScore, maxScore } = scores[workflowId];
    scores[workflowId].percentage = maxScore > 0
      ? Math.round((totalScore / maxScore) * 100)
      : 0;
  });

  // Sort by percentage descending
  const sortedResults = Object.values(scores)
    .sort((a, b) => b.percentage - a.percentage);

  return sortedResults;
}

export function getConfidenceLevel(percentage) {
  if (percentage >= 90) {
    return {
      level: 'strong',
      label: 'Recommandation forte',
      color: 'success',
      description: 'Ce workflow correspond parfaitement a vos besoins'
    };
  } else if (percentage >= 70) {
    return {
      level: 'good',
      label: 'Bonne correspondance',
      color: 'accent',
      description: 'Ce workflow convient bien avec quelques compromis mineurs'
    };
  } else if (percentage >= 50) {
    return {
      level: 'consider',
      label: 'A considerer',
      color: 'warning',
      description: 'Ce workflow est viable mais explorez les alternatives'
    };
  } else {
    return {
      level: 'notRecommended',
      label: 'Non recommande',
      color: 'danger',
      description: 'Ce workflow ne correspond pas a vos criteres'
    };
  }
}

export function getCompletionPercentage(projectRequirements) {
  const criteriaOrder = getCriteriaOrder();
  const answeredCount = criteriaOrder.filter(c => projectRequirements[c]).length;
  return Math.round((answeredCount / criteriaOrder.length) * 100);
}

export function getMissingCriteria(projectRequirements) {
  const criteriaOrder = getCriteriaOrder();
  return criteriaOrder
    .filter(c => !projectRequirements[c])
    .map(c => decisionCriteria[c]);
}
