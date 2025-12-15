import { useState, useMemo, useCallback } from 'react';
import { calculateRecommendation, getConfidenceLevel, getCompletionPercentage, getMissingCriteria } from '../utils/scoring';
import { getCriteriaOrder } from '../data/decisionCriteria';

export function useRecommendation() {
  const [projectName, setProjectName] = useState('');
  const [projectRequirements, setProjectRequirements] = useState({});

  const updateProjectName = useCallback((name) => {
    setProjectName(name);
  }, []);

  const updateCriterion = useCallback((criterionId, value) => {
    setProjectRequirements(prev => ({
      ...prev,
      [criterionId]: value
    }));
  }, []);

  const resetAll = useCallback(() => {
    setProjectName('');
    setProjectRequirements({});
  }, []);

  const recommendations = useMemo(() => {
    return calculateRecommendation(projectRequirements);
  }, [projectRequirements]);

  const primaryRecommendation = useMemo(() => {
    if (recommendations.length === 0) return null;
    const top = recommendations[0];
    return {
      ...top,
      confidence: getConfidenceLevel(top.percentage)
    };
  }, [recommendations]);

  const alternativeRecommendations = useMemo(() => {
    return recommendations.slice(1).map(rec => ({
      ...rec,
      confidence: getConfidenceLevel(rec.percentage)
    }));
  }, [recommendations]);

  const completionPercentage = useMemo(() => {
    return getCompletionPercentage(projectRequirements);
  }, [projectRequirements]);

  const missingCriteria = useMemo(() => {
    return getMissingCriteria(projectRequirements);
  }, [projectRequirements]);

  const isComplete = useMemo(() => {
    const criteriaOrder = getCriteriaOrder();
    return criteriaOrder.every(c => projectRequirements[c]);
  }, [projectRequirements]);

  const answeredCriteria = useMemo(() => {
    return Object.keys(projectRequirements).filter(k => projectRequirements[k]);
  }, [projectRequirements]);

  return {
    projectName,
    updateProjectName,
    projectRequirements,
    updateCriterion,
    resetAll,
    recommendations,
    primaryRecommendation,
    alternativeRecommendations,
    completionPercentage,
    missingCriteria,
    isComplete,
    answeredCriteria
  };
}
