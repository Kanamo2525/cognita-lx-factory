export const tools = {
  'articulate-360': {
    id: 'articulate-360',
    name: 'Articulate 360',
    category: 'Authoring',
    description: 'Suite complete authoring e-learning avec Rise et Storyline',
    price: { amount: 1399, period: 'year', currency: 'USD' },
    url: 'https://articulate.com/360',
    features: ['SCORM/xAPI', 'Responsive', 'Branching', 'Quiz', 'Review'],
    workflows: ['elearning', 'microlearning', 'assessment']
  },
  'rise-360': {
    id: 'rise-360',
    name: 'Rise 360',
    category: 'Authoring',
    description: 'Authoring rapide responsive, inclus dans Articulate 360',
    price: { amount: 0, period: 'included', currency: 'USD' },
    url: 'https://articulate.com/360/rise',
    features: ['Responsive', 'Templates', 'Blocks', 'Collaboration'],
    workflows: ['elearning', 'microlearning']
  },
  'storyline': {
    id: 'storyline',
    name: 'Storyline 360',
    category: 'Authoring',
    description: 'Authoring avance pour interactions complexes',
    price: { amount: 0, period: 'included', currency: 'USD' },
    url: 'https://articulate.com/360/storyline',
    features: ['Simulations', 'Variables', 'Triggers', 'States', 'Layers'],
    workflows: ['elearning', 'assessment']
  },
  'heygen': {
    id: 'heygen',
    name: 'HeyGen',
    category: 'Video AI',
    description: 'Generation video AI avec avatars realistes',
    price: { amount: 29, period: 'month', currency: 'USD' },
    url: 'https://heygen.com',
    features: ['120+ Avatars', '40+ Langues', 'Lip-sync', 'Templates'],
    workflows: ['video', 'microlearning']
  },
  'synthesia': {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'Video AI',
    description: 'Plateforme video AI premium, 140+ langues',
    price: { amount: 29, period: 'month', currency: 'USD' },
    url: 'https://synthesia.io',
    features: ['150+ Avatars', '140+ Langues', 'Custom avatars', 'API'],
    workflows: ['video', 'microlearning']
  },
  'elevenlabs': {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Voice AI',
    description: 'Synthese vocale ultra-realiste, voice cloning',
    price: { amount: 22, period: 'month', currency: 'USD' },
    url: 'https://elevenlabs.io',
    features: ['Voice cloning', '32+ Langues', 'Emotions', 'API'],
    workflows: ['elearning', 'video', 'microlearning']
  },
  'maia': {
    id: 'maia',
    name: 'MAIA',
    category: 'AI Assistant',
    description: 'Assistant IA interne CMA CGM (ChatGPT)',
    price: { amount: 0, period: 'existing', currency: 'EUR' },
    url: null,
    features: ['Scripting', 'Structuration', 'Traduction', 'Items'],
    workflows: ['elearning', 'microlearning', 'video', 'assessment', 'performance-support']
  },
  'canva': {
    id: 'canva',
    name: 'Canva Pro',
    category: 'Design',
    description: 'Design graphique avec templates et IA',
    price: { amount: 13, period: 'month', currency: 'EUR' },
    url: 'https://canva.com',
    features: ['Templates', 'IA generative', 'Brand kit', 'Collaboration'],
    workflows: ['microlearning', 'performance-support', 'elearning']
  },
  'gamma': {
    id: 'gamma',
    name: 'Gamma',
    category: 'Presentations',
    description: 'Generation presentations IA, export PowerPoint',
    price: { amount: 15, period: 'month', currency: 'USD' },
    url: 'https://gamma.app',
    features: ['Generation IA', 'Templates', 'Export PPT', 'Collaboration'],
    workflows: ['elearning', 'performance-support']
  },
  'camtasia': {
    id: 'camtasia',
    name: 'Camtasia',
    category: 'Video',
    description: 'Capture ecran et montage video',
    price: { amount: 250, period: 'one-time', currency: 'USD' },
    url: 'https://techsmith.com/camtasia',
    features: ['Screen recording', 'Editing', 'Annotations', 'Export'],
    workflows: ['video', 'microlearning']
  },
  'descript': {
    id: 'descript',
    name: 'Descript',
    category: 'Video',
    description: 'Edition video/audio basee sur transcription',
    price: { amount: 12, period: 'month', currency: 'USD' },
    url: 'https://descript.com',
    features: ['Transcription', 'Text editing', 'Overdub', 'Filler removal'],
    workflows: ['video']
  },
  'walkme': {
    id: 'walkme',
    name: 'WalkMe',
    category: 'DAP',
    description: 'Digital Adoption Platform pour guidance in-app',
    price: { amount: null, period: 'custom', currency: 'USD' },
    url: 'https://walkme.com',
    features: ['In-app guidance', 'Analytics', 'Automation', 'Insights'],
    workflows: ['performance-support']
  },
  'questionmark': {
    id: 'questionmark',
    name: 'Questionmark',
    category: 'Assessment',
    description: 'Plateforme assessment et certification',
    price: { amount: null, period: 'custom', currency: 'USD' },
    url: 'https://questionmark.com',
    features: ['Item banking', 'Psychometrics', 'Proctoring', 'Reporting'],
    workflows: ['assessment']
  },
  '7taps': {
    id: '7taps',
    name: '7taps',
    category: 'Microlearning',
    description: 'Plateforme microlearning mobile-first',
    price: { amount: null, period: 'custom', currency: 'USD' },
    url: 'https://7taps.com',
    features: ['Mobile-native', 'Analytics', 'SMS/WhatsApp', 'No-code'],
    workflows: ['microlearning']
  }
};

export const getToolById = (id) => tools[id];

export const getToolsByWorkflow = (workflowId) => {
  return Object.values(tools).filter(tool =>
    tool.workflows.includes(workflowId)
  );
};

export const getToolsByCategory = (category) => {
  return Object.values(tools).filter(tool =>
    tool.category === category
  );
};

export const categories = [
  'Authoring',
  'Video AI',
  'Voice AI',
  'AI Assistant',
  'Design',
  'Presentations',
  'Video',
  'DAP',
  'Assessment',
  'Microlearning'
];
