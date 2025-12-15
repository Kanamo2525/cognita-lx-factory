export const workflows = [
  {
    id: 'elearning',
    name: 'E-Learning Module',
    nameShort: 'E-Learning',
    description: 'Modules interactifs complets avec quiz, branching, simulations',
    icon: 'GraduationCap',
    color: '#3B82F6',
    duration: { min: 15, max: 30, unit: 'minutes' },
    productionTime: { min: 10, max: 14, unit: 'jours' },
    effortRatio: { min: 70, max: 100, description: 'heures : minute finale' },
    team: [
      { role: 'Instructional Designer', fte: 1.0 },
      { role: 'E-learning Developer', fte: 1.0 },
      { role: 'Graphic Designer', fte: 0.5 },
      { role: 'SME', fte: 0.3 },
      { role: 'Project Manager', fte: 0.3 },
      { role: 'QA Tester', fte: 0.2 }
    ],
    tools: {
      tier1: ['Articulate 360', 'Rise 360', 'Storyline', 'MAIA', 'ElevenLabs'],
      tier2: ['Adobe Captivate', 'Lectora', 'Canva Pro']
    },
    licenceOutil: { monthly: 200, annual: 2400, currency: 'EUR' },
    useCases: [
      'Onboarding complet',
      'Formation compliance',
      'Parcours certifiant',
      'Formation technique approfondie'
    ],
    bestFor: {
      complexity: 'high',
      updateFrequency: 'low',
      interactivity: 'high',
      audience: 'large',
      duration: 'long'
    },
    aiImpact: {
      automated: 25,
      augmented: 45,
      humanOnly: 30,
      reductionRatio: 50
    },
    phases: [
      { name: 'Analyse', percentage: 15 },
      { name: 'Design/SB', percentage: 35 },
      { name: 'Developpement', percentage: 40 },
      { name: 'QA/Deploy', percentage: 10 }
    ]
  },
  {
    id: 'microlearning',
    name: 'Microlearning',
    nameShort: 'Micro',
    description: 'Modules courts de 2-7 minutes, mobile-first',
    icon: 'Zap',
    color: '#8B5CF6',
    duration: { min: 2, max: 7, unit: 'minutes' },
    productionTime: { min: 0.5, max: 1, unit: 'jours' },
    effortRatio: { min: 25, max: 45, description: 'heures : minute finale' },
    team: [
      { role: 'Content Curator', fte: 0.5 },
      { role: 'Instructional Designer', fte: 0.5 },
      { role: 'Multimedia Producer', fte: 0.5 },
      { role: 'Platform Admin', fte: 0.3 }
    ],
    tools: {
      tier1: ['Rise 360', 'HeyGen', 'Canva', '7taps'],
      tier2: ['Axonify', 'EdApp', 'Degreed']
    },
    licenceOutil: { monthly: 100, annual: 1200, currency: 'EUR' },
    useCases: [
      'Rappels compliance',
      'Updates produit',
      'Renforcement',
      'Just-in-time learning'
    ],
    bestFor: {
      complexity: 'low',
      updateFrequency: 'high',
      interactivity: 'medium',
      audience: 'any',
      duration: 'short'
    },
    aiImpact: {
      automated: 35,
      augmented: 45,
      humanOnly: 20,
      reductionRatio: 55
    },
    phases: [
      { name: 'Analyse', percentage: 10 },
      { name: 'Chunking', percentage: 20 },
      { name: 'Production', percentage: 45 },
      { name: 'Distrib/Analytics', percentage: 25 }
    ]
  },
  {
    id: 'video',
    name: 'Video Learning',
    nameShort: 'Video',
    description: 'Videos AI avatar, screencasts, talking heads',
    icon: 'Video',
    color: '#EC4899',
    duration: { min: 3, max: 10, unit: 'minutes' },
    productionTime: { min: 2, max: 4, unit: 'jours' },
    effortRatio: { min: 10, max: 20, description: 'heures : minute finale (AI)' },
    team: [
      { role: 'Scriptwriter', fte: 0.5 },
      { role: 'Multimedia Producer', fte: 1.0 },
      { role: 'Video Editor', fte: 0.5 }
    ],
    tools: {
      tier1: ['HeyGen', 'Synthesia', 'ElevenLabs', 'Camtasia', 'Descript'],
      tier2: ['Colossyan', 'D-ID', 'After Effects', 'Premiere Pro']
    },
    licenceOutil: { monthly: 150, annual: 1800, currency: 'EUR' },
    useCases: [
      'Communication L&D',
      'Soft skills',
      'Demonstrations',
      'Updates frequents'
    ],
    bestFor: {
      complexity: 'medium',
      updateFrequency: 'high',
      interactivity: 'low',
      audience: 'large',
      duration: 'medium'
    },
    aiImpact: {
      automated: 40,
      augmented: 35,
      humanOnly: 25,
      reductionRatio: 60
    },
    phases: [
      { name: 'Pre-prod', percentage: 30 },
      { name: 'Production', percentage: 35 },
      { name: 'Post-prod', percentage: 25 },
      { name: 'Hosting', percentage: 10 }
    ]
  },
  {
    id: 'assessment',
    name: 'Assessment & Quiz',
    nameShort: 'Assessment',
    description: 'Quiz, certifications, evaluations formatives et sommatives',
    icon: 'ClipboardCheck',
    color: '#10B981',
    duration: { min: 10, max: 30, unit: 'minutes' },
    productionTime: { min: 5, max: 7, unit: 'jours' },
    effortRatio: { min: 30, max: 60, description: 'heures : 20 items' },
    team: [
      { role: 'Assessment Designer', fte: 0.5 },
      { role: 'Item Writer', fte: 0.5 },
      { role: 'SME', fte: 0.3 },
      { role: 'Psychometrician', fte: 0.2 },
      { role: 'Platform Admin', fte: 0.3 }
    ],
    tools: {
      tier1: ['Articulate', 'MAIA', 'Questionmark', 'TAO'],
      tier2: ['Learnosity', 'Honorlock', 'ProctorU']
    },
    licenceOutil: { monthly: 100, annual: 1200, currency: 'EUR' },
    useCases: [
      'Validation acquis',
      'Certification metier',
      'Compliance verification',
      'Diagnostic competences'
    ],
    bestFor: {
      complexity: 'medium',
      updateFrequency: 'low',
      interactivity: 'high',
      audience: 'large',
      duration: 'any'
    },
    aiImpact: {
      automated: 30,
      augmented: 45,
      humanOnly: 25,
      reductionRatio: 50
    },
    phases: [
      { name: 'Design', percentage: 25 },
      { name: 'Item Writing', percentage: 35 },
      { name: 'Calibration', percentage: 20 },
      { name: 'Reporting', percentage: 20 }
    ]
  },
  {
    id: 'performance-support',
    name: 'Performance Support',
    nameShort: 'Perf Support',
    description: 'Job aids, checklists, guides rapides, EPSS',
    icon: 'FileText',
    color: '#F59E0B',
    duration: { min: 1, max: 5, unit: 'minutes' },
    productionTime: { min: 4, max: 8, unit: 'heures' },
    effortRatio: { min: 5, max: 10, description: 'heures : asset' },
    team: [
      { role: 'Instructional Designer', fte: 0.5 },
      { role: 'Graphic Designer', fte: 0.3 }
    ],
    tools: {
      tier1: ['MAIA', 'Canva', 'Gamma', 'WalkMe'],
      tier2: ['Whatfix', 'Pendo', 'Tango']
    },
    licenceOutil: { monthly: 50, annual: 600, currency: 'EUR' },
    useCases: [
      'Support moment de besoin',
      'Aide memoire',
      'Troubleshooting',
      'Process guides'
    ],
    bestFor: {
      complexity: 'low',
      updateFrequency: 'high',
      interactivity: 'low',
      audience: 'any',
      duration: 'instant'
    },
    aiImpact: {
      automated: 45,
      augmented: 40,
      humanOnly: 15,
      reductionRatio: 60
    },
    phases: [
      { name: 'Analyse', percentage: 20 },
      { name: 'Design', percentage: 40 },
      { name: 'Validation', percentage: 25 },
      { name: 'Distribution', percentage: 15 }
    ]
  }
];

export const getWorkflowById = (id) => workflows.find(w => w.id === id);

export const getWorkflowColor = (id) => {
  const workflow = getWorkflowById(id);
  return workflow?.color || '#6B7280';
};
