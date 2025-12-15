export const decisionCriteria = {
  learningObjective: {
    id: 'learningObjective',
    label: "Objectif d'apprentissage",
    description: "Quel type de competence souhaitez-vous developper?",
    icon: 'Target',
    weight: 2,
    options: [
      {
        value: 'knowledge',
        label: 'Connaissance conceptuelle',
        description: 'Comprendre des concepts, theories, regles',
        recommendedWorkflows: ['elearning', 'video'],
        scores: { elearning: 10, microlearning: 5, video: 8, assessment: 3, 'performance-support': 2 }
      },
      {
        value: 'procedural',
        label: 'Competence procedurale',
        description: 'Executer un processus etape par etape',
        recommendedWorkflows: ['video', 'performance-support'],
        scores: { elearning: 6, microlearning: 5, video: 9, assessment: 3, 'performance-support': 10 }
      },
      {
        value: 'softskill',
        label: 'Soft skill / Comportement',
        description: 'Communication, leadership, negociation',
        recommendedWorkflows: ['elearning', 'video'],
        scores: { elearning: 10, microlearning: 4, video: 8, assessment: 5, 'performance-support': 2 }
      },
      {
        value: 'reinforcement',
        label: 'Rappel / Renforcement',
        description: 'Consolider des acquis existants',
        recommendedWorkflows: ['microlearning', 'assessment'],
        scores: { elearning: 4, microlearning: 10, video: 5, assessment: 8, 'performance-support': 6 }
      },
      {
        value: 'performance',
        label: 'Support performance',
        description: 'Aide en situation de travail',
        recommendedWorkflows: ['performance-support'],
        scores: { elearning: 2, microlearning: 5, video: 4, assessment: 2, 'performance-support': 10 }
      }
    ]
  },
  availableTime: {
    id: 'availableTime',
    label: "Temps disponible apprenant",
    description: "Combien de temps l'apprenant peut-il consacrer?",
    icon: 'Clock',
    weight: 1.5,
    options: [
      {
        value: 'under5',
        label: '< 5 minutes',
        description: 'Consultation rapide, mobile',
        recommendedWorkflows: ['microlearning', 'performance-support'],
        scores: { elearning: 1, microlearning: 10, video: 6, assessment: 3, 'performance-support': 10 }
      },
      {
        value: '5to15',
        label: '5-15 minutes',
        description: 'Session courte focalisee',
        recommendedWorkflows: ['video', 'microlearning'],
        scores: { elearning: 4, microlearning: 8, video: 10, assessment: 6, 'performance-support': 5 }
      },
      {
        value: '15to30',
        label: '15-30 minutes',
        description: 'Module standard',
        recommendedWorkflows: ['elearning'],
        scores: { elearning: 10, microlearning: 4, video: 7, assessment: 8, 'performance-support': 2 }
      },
      {
        value: 'over30',
        label: '> 30 minutes',
        description: 'Formation approfondie',
        recommendedWorkflows: ['elearning'],
        scores: { elearning: 10, microlearning: 2, video: 5, assessment: 6, 'performance-support': 1 }
      }
    ]
  },
  updateFrequency: {
    id: 'updateFrequency',
    label: "Frequence de mise a jour",
    description: "A quelle frequence le contenu devra-t-il etre actualise?",
    icon: 'RefreshCw',
    weight: 1.5,
    options: [
      {
        value: 'veryFrequent',
        label: 'Tres frequente',
        description: 'Mensuelle ou plus',
        recommendedWorkflows: ['video', 'performance-support', 'microlearning'],
        scores: { elearning: 2, microlearning: 8, video: 10, assessment: 4, 'performance-support': 10 }
      },
      {
        value: 'regular',
        label: 'Reguliere',
        description: 'Trimestrielle',
        recommendedWorkflows: ['microlearning', 'video'],
        scores: { elearning: 5, microlearning: 9, video: 8, assessment: 6, 'performance-support': 7 }
      },
      {
        value: 'rare',
        label: 'Rare',
        description: 'Annuelle ou moins',
        recommendedWorkflows: ['elearning'],
        scores: { elearning: 10, microlearning: 6, video: 6, assessment: 8, 'performance-support': 5 }
      }
    ]
  },
  interactivityLevel: {
    id: 'interactivityLevel',
    label: "Niveau d'interactivite",
    description: "Quel degre d'engagement actif souhaitez-vous?",
    icon: 'MousePointer',
    weight: 1.5,
    options: [
      {
        value: 'high',
        label: 'Eleve',
        description: 'Simulations, branching, scenarios',
        recommendedWorkflows: ['elearning'],
        scores: { elearning: 10, microlearning: 4, video: 3, assessment: 7, 'performance-support': 2 }
      },
      {
        value: 'medium',
        label: 'Moyen',
        description: 'Quiz, clicks, navigation',
        recommendedWorkflows: ['microlearning', 'assessment'],
        scores: { elearning: 7, microlearning: 9, video: 5, assessment: 10, 'performance-support': 4 }
      },
      {
        value: 'low',
        label: 'Faible',
        description: 'Consultation, lecture, visionnage',
        recommendedWorkflows: ['video', 'performance-support'],
        scores: { elearning: 4, microlearning: 6, video: 10, assessment: 3, 'performance-support': 10 }
      }
    ]
  },
  audienceSize: {
    id: 'audienceSize',
    label: "Taille de l'audience",
    description: "Combien d'apprenants sont concernes?",
    icon: 'Users',
    weight: 1,
    options: [
      {
        value: 'small',
        label: 'Restreinte',
        description: '< 1 000 collaborateurs',
        recommendedWorkflows: ['performance-support', 'video'],
        scores: { elearning: 5, microlearning: 7, video: 8, assessment: 6, 'performance-support': 10 }
      },
      {
        value: 'businessUnit',
        label: 'Business Unit',
        description: '10 000 - 60 000 collaborateurs',
        recommendedWorkflows: ['microlearning', 'video', 'elearning'],
        scores: { elearning: 8, microlearning: 9, video: 9, assessment: 8, 'performance-support': 6 }
      },
      {
        value: 'companyWide',
        label: 'Groupe entier',
        description: '160 000 collaborateurs (all employees)',
        recommendedWorkflows: ['elearning', 'video'],
        scores: { elearning: 10, microlearning: 7, video: 10, assessment: 9, 'performance-support': 4 }
      }
    ]
  },
  deadline: {
    id: 'deadline',
    label: "Delai de production",
    description: "Dans quel delai le contenu doit-il etre pret?",
    icon: 'Calendar',
    weight: 1.5,
    options: [
      {
        value: 'urgent',
        label: 'Urgent',
        description: '< 1 semaine',
        recommendedWorkflows: ['performance-support', 'video'],
        scores: { elearning: 1, microlearning: 6, video: 8, assessment: 3, 'performance-support': 10 }
      },
      {
        value: 'standard',
        label: 'Standard',
        description: '1-2 semaines',
        recommendedWorkflows: ['microlearning', 'video', 'assessment'],
        scores: { elearning: 4, microlearning: 9, video: 9, assessment: 8, 'performance-support': 8 }
      },
      {
        value: 'comfortable',
        label: 'Confortable',
        description: '> 2 semaines',
        recommendedWorkflows: ['elearning'],
        scores: { elearning: 10, microlearning: 8, video: 8, assessment: 9, 'performance-support': 7 }
      }
    ]
  },
  multilingual: {
    id: 'multilingual',
    label: "Langue(s) du contenu",
    description: "En quelle(s) langue(s) le contenu doit-il etre disponible?",
    icon: 'Globe',
    weight: 1,
    options: [
      {
        value: 'english',
        label: 'Anglais uniquement',
        description: 'English only',
        recommendedWorkflows: ['elearning', 'microlearning', 'assessment', 'performance-support', 'video'],
        scores: { elearning: 9, microlearning: 9, video: 9, assessment: 9, 'performance-support': 9 }
      },
      {
        value: 'french',
        label: 'Francais uniquement',
        description: 'French only',
        recommendedWorkflows: ['elearning', 'microlearning', 'assessment', 'performance-support', 'video'],
        scores: { elearning: 9, microlearning: 9, video: 9, assessment: 9, 'performance-support': 9 }
      },
      {
        value: 'all13',
        label: '13 langues',
        description: 'Deploiement multilingue groupe (EN, FR, ES, PT, DE, IT, NL, PL, AR, ZH, JA, KO, VI)',
        recommendedWorkflows: ['video'],
        scores: { elearning: 4, microlearning: 6, video: 10, assessment: 4, 'performance-support': 5 }
      }
    ]
  }
};

export const getCriteriaOrder = () => [
  'learningObjective',
  'availableTime',
  'updateFrequency',
  'interactivityLevel',
  'audienceSize',
  'deadline',
  'multilingual'
];

export const getCriterionById = (id) => decisionCriteria[id];
