import React, { useState } from 'react';

// Bluenove colors
const COLORS = {
    primary: '#0D3A50',
    highlight: '#52CBFF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    text: '#2D2D2D',
    lightGray: '#E8E8E8',
    lms: '#FF6B35',
    authoring: '#0D3A50',
    video: '#E94F37',
    voice: '#2E86AB',
    presentation: '#8B5CF6',
    course: '#10B981'
};

// Criteria for LMS tools
const lmsCriteria = [
    { key: 'ai', name: 'IA & Innovation', weight: 20, description: 'Fonctionnalites IA, innovation' },
    { key: 'integration', name: 'Integration', weight: 15, description: 'SAP SF, API, SSO, LMS' },
    { key: 'offline', name: 'Offline', weight: 15, description: 'Capacite hors-connexion' },
    { key: 'multilingual', name: 'Multilingue', weight: 12, description: 'Langues supportees' },
    { key: 'scalability', name: 'Scalabilite', weight: 12, description: 'Support 160K+ users' },
    { key: 'compliance', name: 'Compliance', weight: 10, description: 'RGPD, SOC2, securite' }
];

// Criteria for Authoring tools
const authoringCriteria = [
    { key: 'functionality', name: 'Fonctionnalites', weight: 25, description: 'Richesse features, qualite IA' },
    { key: 'integration', name: 'Integration', weight: 20, description: 'LMS, SCORM, API, SSO' },
    { key: 'usability', name: 'Facilite', weight: 20, description: 'Courbe apprentissage, UX' },
    { key: 'price', name: 'Prix/Valeur', weight: 15, description: 'Modele tarifaire, ROI' },
    { key: 'vendor', name: 'Vendor', weight: 10, description: 'Stabilite, roadmap, support' },
    { key: 'compliance', name: 'Compliance', weight: 10, description: 'RGPD, securite, certifications' }
];

// All tools data
const allTools = {
    // ==================== LMS TOOLS ====================
    'docebo': {
        id: 'docebo',
        name: 'Docebo',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Do',
        isLMS: true,
        scores: { ai: 85, integration: 95, offline: 50, multilingual: 90, scalability: 95, compliance: 90 },
        globalScore: 92,
        verdict: 'Solution actuelle en production. Excellente integration SAP SF, gap offline.',
        strengths: [
            'Deja deploye et operationnel (continuite business)',
            'Integration native SAP SuccessFactors excellente',
            'Training Orchestra deja connecte (ILT/VILT)',
            'Deep Search AI + Auto-Tagging + Skill-Tagging',
            'Unlimited storage (crucial pour 160K users)',
            '400+ integrations disponibles',
            'Real-time analytics performants'
        ],
        weaknesses: [
            'Offline access limite (problematique navires)',
            'Connexion internet obligatoire',
            'Certaines capacites IA en roadmap'
        ],
        pricing: 'Enterprise (sur devis)',
        headquarters: 'Biassono, Italie (bureau Paris)',
        founded: 2005,
        bestFor: 'Bureaux, management, compliance groupe',
        confidence: 3
    },
    'sana-labs': {
        id: 'sana-labs',
        name: 'Sana Labs',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Sa',
        isLMS: true,
        scores: { ai: 98, integration: 85, offline: 40, multilingual: 95, scalability: 85, compliance: 85 },
        globalScore: 89,
        verdict: 'Plateforme 100% IA-native. Alternative innovante IA-first.',
        strengths: [
            'Plateforme 100% IA-native (creation 3h vs 3 semaines)',
            'Tuteurs IA personnels 24/7',
            '+40 integrations HRIS (SAP SuccessFactors inclus)',
            'Interface ultra-intuitive',
            'Dashboards temps reel avec IA analyst',
            'Acquisition par Workday (credibilite enterprise)'
        ],
        weaknesses: [
            'Connexion internet obligatoire (probleme navires)',
            'Migration depuis Docebo complexe',
            'Acteur plus recent, moins implante industrie/logistique'
        ],
        pricing: 'Enterprise (sur devis)',
        headquarters: 'Stockholm, Suede',
        founded: 2016,
        bestFor: 'Formation innovation (TANGRAM), programmes pilotes IA',
        confidence: 3
    },
    'paradiso-lms': {
        id: 'paradiso-lms',
        name: 'Paradiso LMS',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Pa',
        isLMS: true,
        scores: { ai: 80, integration: 75, offline: 98, multilingual: 98, scalability: 90, compliance: 85 },
        globalScore: 88,
        verdict: 'Champion offline-first. Solution recommandee pour offshore/maritime.',
        strengths: [
            'Offline-first architecture (synchronisation automatique)',
            'App mobile native iOS/Android',
            'Multi-tenant (gerer 650 navires separement)',
            '100+ langues supportees',
            'Integration SAP SuccessFactors disponible',
            'Chatbots IA pour support instantane'
        ],
        weaknesses: [
            'Interface moins contemporaine',
            'Cout potentiellement eleve au regard de la maturite'
        ],
        pricing: 'Sur devis (~100-300K/an)',
        headquarters: 'Floride, USA',
        founded: 2007,
        bestFor: 'Personnel navigant (650 navires), contextes deconnectes',
        confidence: 3
    },
    'cornerstone': {
        id: 'cornerstone',
        name: 'Cornerstone OnDemand',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Cs',
        isLMS: true,
        scores: { ai: 85, integration: 90, offline: 45, multilingual: 85, scalability: 98, compliance: 95 },
        globalScore: 87,
        verdict: 'Alternative grande enterprise. Concu pour 100K+ utilisateurs.',
        strengths: [
            'Concu pour 100K+ utilisateurs',
            'Galaxy AI: base 50,000+ competences',
            'Integration native SAP SuccessFactors',
            'VR/immersive learning',
            'Reduction temps reporting ~83%'
        ],
        weaknesses: [
            'Cloud-based (connexion requise)',
            'Interface complexe (courbe apprentissage)',
            'Licence enterprise elevee'
        ],
        pricing: 'Enterprise (tres eleve)',
        headquarters: 'Santa Monica, Californie, USA',
        founded: 1999,
        bestFor: 'Grandes enterprises, talent management integre',
        confidence: 3
    },
    'd2l-brightspace': {
        id: 'd2l-brightspace',
        name: 'D2L Brightspace',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'D2',
        isLMS: true,
        scores: { ai: 75, integration: 80, offline: 45, multilingual: 85, scalability: 95, compliance: 98 },
        globalScore: 85,
        verdict: 'Robustesse et haute disponibilite. Focus conformite stricte.',
        strengths: [
            'Robustesse et haute disponibilite',
            'Focus conformite stricte (GDPR, SOC 2)',
            'Lumi AI builder',
            'Analytics predictifs',
            'Scalabilite eprouvee'
        ],
        weaknesses: [
            'Interface a orientation "academique"',
            'Innovation IA moins avancee',
            'Migration couteuse depuis Docebo'
        ],
        pricing: 'Enterprise (sur devis)',
        headquarters: 'Kitchener, Canada',
        founded: 1999,
        bestFor: 'Conformite reglementaire, environnements academiques',
        confidence: 2
    },
    'talentlms': {
        id: 'talentlms',
        name: 'TalentLMS',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'TL',
        isLMS: true,
        scores: { ai: 85, integration: 70, offline: 80, multilingual: 80, scalability: 60, compliance: 80 },
        globalScore: 83,
        verdict: 'AI Coach 24/7 unique. Ideal populations terrain.',
        strengths: [
            'AI Coach 24/7 (tuteur virtuel unique)',
            'Microlearning format ideal terrain',
            'Acces offline possible',
            'Interface ultra-simple (SMB-friendly)',
            'TalentCraft creation rapide',
            'Prix abordable'
        ],
        weaknesses: [
            'Scalabilite limitee pour 160K users',
            'Moins riche sur compliance complexe'
        ],
        pricing: '~150/mois par site',
        headquarters: 'Atlanta, USA',
        founded: 2012,
        bestFor: 'Dockers (420 ports), entrepots CEVA (800 sites)',
        confidence: 3
    },
    'cypher-learning': {
        id: 'cypher-learning',
        name: 'CYPHER Learning',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Cy',
        isLMS: true,
        scores: { ai: 88, integration: 75, offline: 65, multilingual: 90, scalability: 82, compliance: 80 },
        globalScore: 82,
        verdict: 'Copilot IA puissant. Gamification et 50+ langues.',
        strengths: [
            'Copilot IA avance',
            'Gamification native',
            '50+ langues supportees',
            'MATRIX LMS flexible',
            'Prix competitif'
        ],
        weaknesses: [
            'Interface complexe',
            'Support variable selon region',
            'Moins connu en France'
        ],
        pricing: 'Sur devis',
        headquarters: 'San Francisco, Californie, USA',
        founded: 2009,
        bestFor: 'Gamification, audiences internationales',
        confidence: 2
    },
    'workramp': {
        id: 'workramp',
        name: 'WorkRamp',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Wr',
        isLMS: true,
        scores: { ai: 82, integration: 78, offline: 70, multilingual: 75, scalability: 80, compliance: 78 },
        globalScore: 80,
        verdict: 'AI Practice role-play. Focus commercial et sales enablement.',
        strengths: [
            'AI Practice role-play unique',
            'Integration Salesforce native',
            'Revenue enablement',
            'Analytics avances',
            'UX moderne'
        ],
        weaknesses: [
            'Focus commercial (moins L&D general)',
            'Pas de presence France',
            'Pricing premium'
        ],
        pricing: 'Enterprise (sur devis)',
        headquarters: 'San Francisco, Californie, USA',
        founded: 2015,
        bestFor: 'Sales enablement, onboarding commercial',
        confidence: 2
    },
    'absorb-lms': {
        id: 'absorb-lms',
        name: 'Absorb LMS',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Ab',
        isLMS: true,
        scores: { ai: 75, integration: 78, offline: 65, multilingual: 75, scalability: 82, compliance: 82 },
        globalScore: 78,
        verdict: 'Create AI pour automatisation admin. Solution solide mid-market.',
        strengths: [
            'Create AI pour generation contenus',
            'Automatisation admin poussee',
            'Interface intuitive',
            'Support client reactif',
            'Rapport qualite/prix'
        ],
        weaknesses: [
            'Innovation IA limitee vs leaders',
            'Moins de fonctionnalites avancees',
            'Scalabilite a valider >100K'
        ],
        pricing: 'Mid-market',
        headquarters: 'Calgary, Canada',
        founded: 2002,
        bestFor: 'Mid-market, automatisation admin',
        confidence: 2
    },
    'disco': {
        id: 'disco',
        name: 'Disco',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: 'Di',
        isLMS: true,
        scores: { ai: 78, integration: 68, offline: 50, multilingual: 70, scalability: 70, compliance: 72 },
        globalScore: 74,
        verdict: 'Community-driven, social learning innovant.',
        strengths: [
            'Social learning natif',
            'Community-driven',
            'UX moderne et engageante',
            'Bon pour cohorts',
            'Prix accessible'
        ],
        weaknesses: [
            'Moins structure pour compliance',
            'Scalabilite limitee',
            'Fonctionnalites enterprise basiques'
        ],
        pricing: 'Sur devis',
        headquarters: 'Toronto, Canada',
        founded: 2019,
        bestFor: 'Social learning, formations cohort-based',
        confidence: 2
    },
    '360learning': {
        id: '360learning',
        name: '360Learning',
        category: 'LMS + IA',
        categoryColor: COLORS.lms,
        logo: '36',
        isLMS: true,
        scores: { ai: 72, integration: 65, offline: 50, multilingual: 85, scalability: 75, compliance: 72 },
        globalScore: 72,
        verdict: 'Apprentissage collaboratif. Acteur francais reconnu.',
        strengths: [
            'Apprentissage collaboratif natif',
            'Presence France (Paris)',
            'UGC (User Generated Content)',
            'Interface moderne',
            'Support FR'
        ],
        weaknesses: [
            'Moins complet pour usages complexes',
            'IA moins avancee',
            'Integration SAP limitee'
        ],
        pricing: 'Sur devis',
        headquarters: 'Paris, France',
        founded: 2013,
        bestFor: 'Formation collaborative, peer learning',
        confidence: 2
    },

    // ==================== AUTHORING TOOLS ====================
    'articulate-360': {
        id: 'articulate-360',
        name: 'Articulate 360',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'A360',
        isLMS: false,
        scores: { functionality: 98, integration: 98, usability: 82, price: 70, vendor: 95, compliance: 90 },
        globalScore: 95,
        verdict: 'Standard de l\'industrie. Storyline pour interactivite complexe, Rise pour rapidite.',
        strengths: [
            'Ecosysteme complet (Storyline, Rise, Review, Content Library 9M+ assets)',
            'SCORM/xAPI/cmi5 natif',
            'AI 360 : creation 9x plus rapide, 80+ langues',
            'Community massive, templates abondants'
        ],
        weaknesses: [
            'Prix eleve ($1,199-1,499/an)',
            'Storyline = desktop only (pas de co-authoring temps reel)'
        ],
        pricing: '$1,199-1,499/an',
        headquarters: 'New York, USA',
        founded: 2002,
        bestFor: 'Formation corporate complexe, interactivite avancee',
        confidence: 3
    },
    'adobe-captivate': {
        id: 'adobe-captivate',
        name: 'Adobe Captivate',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'AC',
        isLMS: false,
        scores: { functionality: 95, integration: 95, usability: 60, price: 65, vendor: 90, compliance: 85 },
        globalScore: 85,
        verdict: 'Meilleur pour simulations logicielles et formations techniques.',
        strengths: [
            'Simulations 3 modes (Demo, Training, Assessment)',
            'Responsive design natif',
            'Adobe Firefly integre (images, avatars)',
            'Integration Creative Cloud'
        ],
        weaknesses: [
            'Courbe d\'apprentissage elevee',
            'Interface modernisee = moins de controle granulaire'
        ],
        pricing: '~$1,299/an',
        headquarters: 'Californie, USA',
        founded: 2004,
        bestFor: 'Simulations logicielles, formations techniques',
        confidence: 3
    },
    'ispring-suite': {
        id: 'ispring-suite',
        name: 'iSpring Suite AI',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'iS',
        isLMS: false,
        scores: { functionality: 75, integration: 90, usability: 95, price: 90, vendor: 78, compliance: 80 },
        globalScore: 82,
        verdict: 'Meilleur rapport qualite/prix pour conversion PowerPoint rapide.',
        strengths: [
            'Native PowerPoint (add-in)',
            'AI Translator 70+ langues, TTS 58 langues',
            'Prix abordable ($499-770/an)',
            'Support client excellent'
        ],
        weaknesses: [
            'Limite aux structures PowerPoint',
            'Interactivite avancee limitee vs Storyline'
        ],
        pricing: '$499-770/an',
        headquarters: 'Virginie, USA',
        founded: 2001,
        bestFor: 'Conversion PowerPoint, rapid development',
        confidence: 3
    },
    'lectora': {
        id: 'lectora',
        name: 'Lectora',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'Le',
        isLMS: false,
        scores: { functionality: 80, integration: 90, usability: 55, price: 60, vendor: 75, compliance: 95 },
        globalScore: 78,
        verdict: 'Reference pour l\'accessibilite WCAG et conformite 508.',
        strengths: [
            'Accessibilite WCAG 2.1 native',
            'Conformite Section 508',
            'Templates accessibles',
            'Robuste et eprouve'
        ],
        weaknesses: [
            'Interface datee',
            'Courbe d\'apprentissage importante',
            'Prix eleve pour PME'
        ],
        pricing: '99-199/mois',
        headquarters: 'USA',
        founded: 1999,
        bestFor: 'Accessibilite, conformite reglementaire',
        confidence: 2
    },
    'camtasia': {
        id: 'camtasia',
        name: 'Camtasia',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'Cm',
        isLMS: false,
        scores: { functionality: 70, integration: 65, usability: 90, price: 95, vendor: 85, compliance: 70 },
        globalScore: 75,
        verdict: 'Meilleur outil de screen capture et montage video simple.',
        strengths: [
            'Screen capture de qualite professionnelle',
            'Interface intuitive',
            'Prix one-time ($249)',
            'Ideal tutoriels logiciels'
        ],
        weaknesses: [
            'Pas de SCORM natif',
            'Limite a la video',
            'Pas d\'interactivite avancee'
        ],
        pricing: '$249 (one-time)',
        headquarters: 'Michigan, USA',
        founded: 2002,
        bestFor: 'Tutoriels video, screen capture',
        confidence: 3
    },
    'elucidat': {
        id: 'elucidat',
        name: 'Elucidat',
        category: 'Authoring Traditionnel',
        categoryColor: COLORS.authoring,
        logo: 'El',
        isLMS: false,
        scores: { functionality: 82, integration: 85, usability: 88, price: 65, vendor: 80, compliance: 85 },
        globalScore: 80,
        verdict: 'Cloud collaboratif pour equipes distribuees.',
        strengths: [
            'Collaboration temps reel',
            'Cloud-native',
            'Templates responsive',
            'Analytics integres'
        ],
        weaknesses: [
            'Pricing custom (pas transparent)',
            'Moins de controle granulaire'
        ],
        pricing: 'Custom',
        headquarters: 'UK',
        founded: 2013,
        bestFor: 'Equipes collaboratives, entreprises',
        confidence: 2
    },
    // VIDEO IA
    'synthesia': {
        id: 'synthesia',
        name: 'Synthesia',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'Sy',
        isLMS: false,
        scores: { functionality: 98, integration: 85, usability: 85, price: 70, vendor: 90, compliance: 95 },
        globalScore: 92,
        verdict: 'Leader inconteste pour enterprise. Meilleurs avatars du marche.',
        strengths: [
            'Avatars les plus realistes (uncanny valley minimise)',
            '140+ langues avec lip-sync natif',
            'SOC 2 Type II + GDPR',
            'SCORM export natif',
            'G2: 4.7/5 (2,000+ reviews)'
        ],
        weaknesses: [
            'Pricing par minutes (peut couter cher a l\'echelle)',
            'Script-driven only (pas de capture live)',
            'Interactivite limitee (pas de branching natif)'
        ],
        pricing: '$29-89/mois (Starter a Creator)',
        headquarters: 'Londres, UK',
        founded: 2017,
        bestFor: 'Enterprise, video training a grande echelle',
        confidence: 3
    },
    'colossyan': {
        id: 'colossyan',
        name: 'Colossyan',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'Co',
        isLMS: false,
        scores: { functionality: 90, integration: 95, usability: 82, price: 80, vendor: 85, compliance: 90 },
        globalScore: 88,
        verdict: 'Meilleur choix L&D avec interactivite video native.',
        strengths: [
            '200+ avatars diversifies',
            'Interactivite dans la video (branching, hotspots, quiz)',
            'Multi-avatar conversations',
            'SOC 2 + GDPR',
            'API incluse (360 min/an plan Business)'
        ],
        weaknesses: [
            'Avatars legerement moins realistes que Synthesia',
            'Moins connu (brand awareness)'
        ],
        pricing: '$27-67/mois',
        headquarters: 'UK/USA',
        founded: 2020,
        bestFor: 'L&D interactif, formations avec branching',
        confidence: 3
    },
    'heygen': {
        id: 'heygen',
        name: 'HeyGen',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'HG',
        isLMS: false,
        scores: { functionality: 88, integration: 65, usability: 90, price: 95, vendor: 75, compliance: 70 },
        globalScore: 85,
        verdict: 'Meilleur rapport volume/prix. Ideal marketing + social.',
        strengths: [
            'Unlimited video generation (vs minutes)',
            '120+ avatars, custom avatars',
            'ChatGPT-powered scripts',
            'URL-to-video'
        ],
        weaknesses: [
            'Moins enterprise-ready que Synthesia',
            'SCORM non natif',
            'Focus marketing > L&D'
        ],
        pricing: '$29-39/mois/seat',
        headquarters: 'Californie, USA',
        founded: 2020,
        bestFor: 'Volume eleve, marketing, social learning',
        confidence: 2
    },
    'd-id': {
        id: 'd-id',
        name: 'D-ID',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'DI',
        isLMS: false,
        scores: { functionality: 82, integration: 60, usability: 85, price: 80, vendor: 78, compliance: 75 },
        globalScore: 78,
        verdict: 'Innovant avec photo-to-video, mais moins mature pour L&D.',
        strengths: [
            'Photo-to-video unique',
            'API puissante',
            'Creative AI tools',
            'Pricing flexible'
        ],
        weaknesses: [
            'Moins d\'avatars stock',
            'Qualite variable selon photo',
            'Moins oriente L&D'
        ],
        pricing: 'Free-Custom',
        headquarters: 'Tel Aviv, Israel',
        founded: 2017,
        bestFor: 'Cas creatifs, personnalisation poussee',
        confidence: 2
    },
    'elai': {
        id: 'elai',
        name: 'Elai.io',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'Ei',
        isLMS: false,
        scores: { functionality: 80, integration: 75, usability: 82, price: 88, vendor: 70, compliance: 72 },
        globalScore: 78,
        verdict: 'Bon rapport qualite/prix pour PME et startups.',
        strengths: [
            '80+ avatars',
            '75+ langues',
            'Prix competitif',
            'Interface intuitive'
        ],
        weaknesses: [
            'Moins mature que leaders',
            'Support limite',
            'Fonctionnalites enterprise limitees'
        ],
        pricing: '$23-100/mois',
        headquarters: 'Ukraine/USA',
        founded: 2020,
        bestFor: 'PME, budget limite',
        confidence: 2
    },
    'hour-one': {
        id: 'hour-one',
        name: 'Hour One',
        category: 'Video IA - Avatars',
        categoryColor: COLORS.video,
        logo: 'H1',
        isLMS: false,
        scores: { functionality: 78, integration: 70, usability: 80, price: 75, vendor: 75, compliance: 78 },
        globalScore: 76,
        verdict: 'Solution solide avec focus enterprise.',
        strengths: [
            '100+ avatars',
            'Focus enterprise',
            'Customisation avancee',
            'Multi-scene support'
        ],
        weaknesses: [
            'Pricing moins transparent',
            'Moins connu',
            'Fonctionnalites L&D basiques'
        ],
        pricing: '$30-112/mois',
        headquarters: 'USA/Israel',
        founded: 2019,
        bestFor: 'Enterprise, videos corporate',
        confidence: 2
    },
    // VOIX IA
    'elevenlabs': {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: '11',
        isLMS: false,
        scores: { functionality: 98, integration: 85, usability: 88, price: 75, vendor: 85, compliance: 80 },
        globalScore: 94,
        verdict: 'Qualite vocale inegalee. Standard premium du marche.',
        strengths: [
            'Voix quasi-indistinguables de l\'humain',
            '32+ langues avec fluidite native',
            'Voice cloning avec quelques minutes d\'audio',
            'Speech-to-speech, text-to-sound-effects',
            'Voice isolation (nettoyage audio)'
        ],
        weaknesses: [
            'Prix premium ($49-99/mois)',
            'Focus voix unique (pas multi-personnages natif)'
        ],
        pricing: '$49-99/mois',
        headquarters: 'USA/UK',
        founded: 2022,
        bestFor: 'Qualite maximale, voix-off premium',
        confidence: 3
    },
    'murf-ai': {
        id: 'murf-ai',
        name: 'Murf AI',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: 'Mu',
        isLMS: false,
        scores: { functionality: 85, integration: 80, usability: 95, price: 90, vendor: 80, compliance: 78 },
        globalScore: 86,
        verdict: 'Meilleur equilibre versatilite/facilite d\'usage.',
        strengths: [
            '200+ voix, 35+ langues',
            'Interface tres intuitive',
            'AI Translation (20+ langues)',
            'Collaboration equipe native',
            'Prix accessible (~$29/mois)'
        ],
        weaknesses: [
            'Qualite legerement inferieure a ElevenLabs',
            'Controles avances limites'
        ],
        pricing: '~$29/mois',
        headquarters: 'USA',
        founded: 2020,
        bestFor: 'Equipes, facilite d\'usage, budget moyen',
        confidence: 3
    },
    'play-ht': {
        id: 'play-ht',
        name: 'Play.ht',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: 'Ph',
        isLMS: false,
        scores: { functionality: 82, integration: 75, usability: 75, price: 90, vendor: 78, compliance: 75 },
        globalScore: 84,
        verdict: 'Meilleur controle granulaire et value at scale.',
        strengths: [
            'Per-word timestamps (sync precise)',
            'Speed/pitch controls avances',
            '900+ voix, 140+ langues',
            'Unlimited plan $99/mois (2.5M chars)'
        ],
        weaknesses: [
            'Qualite variable selon voix',
            'Interface moins intuitive'
        ],
        pricing: '$39-99/mois',
        headquarters: 'USA',
        founded: 2018,
        bestFor: 'Volume eleve, controle precis',
        confidence: 2
    },
    'wellsaid-labs': {
        id: 'wellsaid-labs',
        name: 'WellSaid Labs',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: 'WS',
        isLMS: false,
        scores: { functionality: 78, integration: 75, usability: 82, price: 85, vendor: 78, compliance: 80 },
        globalScore: 80,
        verdict: 'Voix naturelles pour podcasts et narration.',
        strengths: [
            '50+ voix de qualite',
            'Focus narration naturelle',
            'Pricing flexible',
            'Good pour podcasts'
        ],
        weaknesses: [
            'Moins de langues (20+)',
            'Voice cloning limite',
            'Fonctionnalites basiques'
        ],
        pricing: 'Free-$49/mois',
        headquarters: 'USA',
        founded: 2018,
        bestFor: 'Podcasts, narration, debutants',
        confidence: 2
    },
    'resemble-ai': {
        id: 'resemble-ai',
        name: 'Resemble AI',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: 'Re',
        isLMS: false,
        scores: { functionality: 85, integration: 80, usability: 75, price: 82, vendor: 75, compliance: 78 },
        globalScore: 82,
        verdict: 'Specialiste du voice cloning custom.',
        strengths: [
            'Voice cloning de haute qualite',
            '150+ langues',
            'API robuste',
            'Emotion controls'
        ],
        weaknesses: [
            'Interface technique',
            'Moins de voix stock',
            'Courbe d\'apprentissage'
        ],
        pricing: '$19-99/mois',
        headquarters: 'Canada',
        founded: 2019,
        bestFor: 'Voice cloning, cas techniques',
        confidence: 2
    },
    'lovo-ai': {
        id: 'lovo-ai',
        name: 'LOVO AI',
        category: 'Voix IA - TTS',
        categoryColor: COLORS.voice,
        logo: 'LO',
        isLMS: false,
        scores: { functionality: 80, integration: 70, usability: 82, price: 78, vendor: 72, compliance: 75 },
        globalScore: 78,
        verdict: 'Plateforme complete voix + video.',
        strengths: [
            '500+ voix, 100+ langues',
            'Video editing integre',
            'Art generator',
            'Templates varies'
        ],
        weaknesses: [
            'Jack of all trades',
            'Qualite variable',
            'Support limite'
        ],
        pricing: '$49-149/mois',
        headquarters: 'USA',
        founded: 2019,
        bestFor: 'Tout-en-un voix + video basique',
        confidence: 2
    },
    // PRESENTATIONS IA
    'gamma': {
        id: 'gamma',
        name: 'Gamma',
        category: 'Presentations IA',
        categoryColor: COLORS.presentation,
        logo: 'Ga',
        isLMS: false,
        scores: { functionality: 95, integration: 70, usability: 98, price: 95, vendor: 80, compliance: 75 },
        globalScore: 90,
        verdict: 'Innovation maximale. Design conversationnel revolutionnaire.',
        strengths: [
            'Text-to-presentation le plus avance',
            '20+ AI models, 100+ themes',
            'Smart layouts automatiques',
            'Freemium accessible',
            'Export PPT/PDF/PNG/Google Slides'
        ],
        weaknesses: [
            'Moins de templates "corporate" que Beautiful.ai',
            'Personnalisation fine limitee'
        ],
        pricing: 'Freemium',
        headquarters: 'USA',
        founded: 2022,
        bestFor: 'Creation rapide, presentations creatives',
        confidence: 3
    },
    'beautiful-ai': {
        id: 'beautiful-ai',
        name: 'Beautiful.ai',
        category: 'Presentations IA',
        categoryColor: COLORS.presentation,
        logo: 'Ba',
        isLMS: false,
        scores: { functionality: 85, integration: 80, usability: 90, price: 88, vendor: 82, compliance: 80 },
        globalScore: 85,
        verdict: 'Meilleur pour presentations business professionnelles.',
        strengths: [
            'Smart Slides = design automatique en temps reel',
            'Integrations: Salesforce, Slack, ChatGPT',
            'Locked slides pour brand consistency',
            '$12/mois tres accessible'
        ],
        weaknesses: [
            'Moins innovant que Gamma',
            'Personnalisation limitee'
        ],
        pricing: '$12+/mois',
        headquarters: 'USA',
        founded: 2017,
        bestFor: 'Presentations corporate, brand consistency',
        confidence: 3
    },
    'canva-magic': {
        id: 'canva-magic',
        name: 'Canva Magic Design',
        category: 'Presentations IA',
        categoryColor: COLORS.presentation,
        logo: 'Ca',
        isLMS: false,
        scores: { functionality: 82, integration: 75, usability: 98, price: 88, vendor: 90, compliance: 80 },
        globalScore: 83,
        verdict: 'Polyvalent et accessible pour tous.',
        strengths: [
            'Ecosysteme Canva complet',
            'Facilite d\'usage maximale',
            'Templates abondants',
            'Export tous formats'
        ],
        weaknesses: [
            'IA moins avancee pour presentations',
            'Pas specialise slides',
            'Limites pour cas complexes'
        ],
        pricing: '$12.99/mois',
        headquarters: 'Australie',
        founded: 2013,
        bestFor: 'Usage general, debutants, equipes marketing',
        confidence: 3
    },
    'tome': {
        id: 'tome',
        name: 'Tome',
        category: 'Presentations IA',
        categoryColor: COLORS.presentation,
        logo: 'To',
        isLMS: false,
        scores: { functionality: 85, integration: 68, usability: 88, price: 82, vendor: 72, compliance: 70 },
        globalScore: 78,
        verdict: 'Storytelling IA innovant mais moins mature.',
        strengths: [
            'Narratif automatique',
            'Design moderne',
            'IA generative integree',
            'Collaboration native'
        ],
        weaknesses: [
            'Moins de templates business',
            'Export limite',
            'Startup (stabilite?)'
        ],
        pricing: 'Free-$20/mois',
        headquarters: 'USA',
        founded: 2021,
        bestFor: 'Storytelling, pitchs creatifs',
        confidence: 2
    },
    'pitch': {
        id: 'pitch',
        name: 'Pitch',
        category: 'Presentations IA',
        categoryColor: COLORS.presentation,
        logo: 'Pi',
        isLMS: false,
        scores: { functionality: 80, integration: 82, usability: 85, price: 85, vendor: 80, compliance: 82 },
        globalScore: 80,
        verdict: 'Collaboration equipe avec analytics.',
        strengths: [
            'Collaboration temps reel excellente',
            'Analytics de presentations',
            'Video recording integre',
            'Templates modernes'
        ],
        weaknesses: [
            'IA moins avancee',
            'Moins connu',
            'Focus equipes'
        ],
        pricing: 'Free-$20/user/mois',
        headquarters: 'Allemagne',
        founded: 2018,
        bestFor: 'Equipes, collaboration, startups',
        confidence: 2
    },
    // GENERATION COURS IA
    'coursebox': {
        id: 'coursebox',
        name: 'Coursebox',
        category: 'Generation Cours IA',
        categoryColor: COLORS.course,
        logo: 'Cb',
        isLMS: false,
        scores: { functionality: 92, integration: 85, usability: 90, price: 85, vendor: 80, compliance: 82 },
        globalScore: 88,
        verdict: 'Solution tout-en-un la plus complete. Doc -> Cours en 10 min.',
        strengths: [
            'Document/Video/URL -> Course automatique',
            '500+ AI avatars',
            'Quiz IA + grading avec rubrics',
            'Chatbot apprenant',
            'SCORM + LTI export',
            '100+ langues',
            'LMS integre ou embed'
        ],
        weaknesses: [
            'Qualite cours depend des inputs',
            'Personnalisation design limitee'
        ],
        pricing: 'Freemium',
        headquarters: 'UK',
        founded: 2021,
        bestFor: 'Rapid course development, tout-en-un',
        confidence: 2
    },
    'mindsmith': {
        id: 'mindsmith',
        name: 'Mindsmith',
        category: 'Generation Cours IA',
        categoryColor: COLORS.course,
        logo: 'Ms',
        isLMS: false,
        scores: { functionality: 88, integration: 82, usability: 85, price: 78, vendor: 78, compliance: 80 },
        globalScore: 85,
        verdict: 'AI comme assistant instructional designer. Controle + rapidite.',
        strengths: [
            'AI Storyboard (design avant creation)',
            '12x faster que traditionnel',
            'SCORM + xAPI',
            '30+ langues',
            'Engagement rates industry-leading'
        ],
        weaknesses: [
            'Moins d\'avatars que Coursebox',
            'Pricing $39-75/mois'
        ],
        pricing: '$39-75/mois',
        headquarters: 'USA',
        founded: 2021,
        bestFor: 'Instructional designers, controle creatif',
        confidence: 2
    },
    'learnworlds': {
        id: 'learnworlds',
        name: 'LearnWorlds',
        category: 'Generation Cours IA',
        categoryColor: COLORS.course,
        logo: 'Lw',
        isLMS: false,
        scores: { functionality: 78, integration: 85, usability: 78, price: 72, vendor: 82, compliance: 85 },
        globalScore: 80,
        verdict: 'LMS + Authoring combines pour vente de cours.',
        strengths: [
            'LMS complet integre',
            'E-commerce natif',
            'SCORM import/export',
            'White-label',
            'Community features'
        ],
        weaknesses: [
            'IA moins avancee',
            'Plus LMS qu\'authoring',
            'Pricing complexe'
        ],
        pricing: '$24-249/mois',
        headquarters: 'Grece',
        founded: 2014,
        bestFor: 'Vente de cours, academies, creators',
        confidence: 2
    },
    'edapp': {
        id: 'edapp',
        name: 'EdApp',
        category: 'Generation Cours IA',
        categoryColor: COLORS.course,
        logo: 'Ed',
        isLMS: false,
        scores: { functionality: 80, integration: 78, usability: 88, price: 90, vendor: 75, compliance: 78 },
        globalScore: 78,
        verdict: 'Microlearning mobile-first avec gamification.',
        strengths: [
            'Mobile-first design',
            'Gamification native',
            'Templates microlearning',
            'Freemium genereux',
            'Rapid authoring'
        ],
        weaknesses: [
            'Limite au microlearning',
            'Pas pour cours longs',
            'Fonctionnalites avancees payantes'
        ],
        pricing: 'Freemium',
        headquarters: 'Australie',
        founded: 2015,
        bestFor: 'Microlearning, mobile, deskless workers',
        confidence: 2
    },
    '7taps': {
        id: '7taps',
        name: '7taps',
        category: 'Generation Cours IA',
        categoryColor: COLORS.course,
        logo: '7t',
        isLMS: false,
        scores: { functionality: 75, integration: 55, usability: 92, price: 70, vendor: 68, compliance: 65 },
        globalScore: 75,
        verdict: 'Microlearning ultra-rapide mais limite.',
        strengths: [
            'Creation en 7 taps',
            'Ultra-simple',
            'Partage instant (lien)',
            'Mobile-native'
        ],
        weaknesses: [
            'Pas de SCORM',
            'Fonctionnalites tres limitees',
            'Pas pour formation formelle',
            'Pricing custom'
        ],
        pricing: 'Custom',
        headquarters: 'USA',
        founded: 2020,
        bestFor: 'Microlearning rapide, internal comms',
        confidence: 2
    }
};

// Lucide Icons components
const Check = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const X = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const Star = ({ className, fill }) => (
    <svg className={className} viewBox="0 0 24 24" fill={fill || "currentColor"} stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const ChevronLeft = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// Spider Graph Component for Individual Tool
const ToolSpiderGraph = ({ tool }) => {
    const width = 400;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = 150;
    const levels = 5;

    const criteria = tool.isLMS ? lmsCriteria : authoringCriteria;
    const angleSlice = (Math.PI * 2) / criteria.length;

    const getPolygonPoints = () => {
        return criteria.map((criterion, i) => {
            const score = tool.scores[criterion.key] / 100;
            const x = cx + maxRadius * score * Math.cos(angleSlice * i - Math.PI / 2);
            const y = cy + maxRadius * score * Math.sin(angleSlice * i - Math.PI / 2);
            return `${x},${y}`;
        }).join(' ');
    };

    return (
        <svg width={width} height={height} className="mx-auto">
            {/* Background circles */}
            {[...Array(levels)].map((_, i) => (
                <circle
                    key={i}
                    cx={cx} cy={cy}
                    r={maxRadius * (i + 1) / levels}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
            ))}

            {/* Axes and labels */}
            {criteria.map((criterion, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const x = cx + maxRadius * Math.cos(angle);
                const y = cy + maxRadius * Math.sin(angle);
                const labelX = cx + (maxRadius + 35) * Math.cos(angle);
                const labelY = cy + (maxRadius + 35) * Math.sin(angle);

                return (
                    <g key={criterion.key}>
                        <line x1={cx} y1={cy} x2={x} y2={y} stroke="#9CA3AF" strokeWidth="1" />
                        <text
                            x={labelX} y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs font-bold"
                            fill="#374151"
                        >
                            {criterion.name}
                        </text>
                        <text
                            x={labelX} y={labelY + 14}
                            textAnchor="middle"
                            className="text-xs"
                            fill="#9CA3AF"
                        >
                            ({criterion.weight}%)
                        </text>
                    </g>
                );
            })}

            {/* Score levels */}
            {[20, 40, 60, 80, 100].map((score) => {
                const r = maxRadius * score / 100;
                return (
                    <text
                        key={score}
                        x={cx + 5}
                        y={cy - r + 4}
                        className="text-xs"
                        fill="#9CA3AF"
                    >
                        {score}
                    </text>
                );
            })}

            {/* Tool polygon */}
            <polygon
                points={getPolygonPoints()}
                fill={tool.categoryColor}
                fillOpacity="0.25"
                stroke={tool.categoryColor}
                strokeWidth="3"
            />

            {/* Data points */}
            {criteria.map((criterion, i) => {
                const score = tool.scores[criterion.key] / 100;
                const angle = angleSlice * i - Math.PI / 2;
                const x = cx + maxRadius * score * Math.cos(angle);
                const y = cy + maxRadius * score * Math.sin(angle);
                return (
                    <circle
                        key={criterion.key}
                        cx={x} cy={y} r="6"
                        fill={tool.categoryColor}
                        stroke="white"
                        strokeWidth="2"
                    />
                );
            })}
        </svg>
    );
};

// Tool Card Component
const ToolCard = ({ tool, onSelect }) => {
    const isRecommended = tool.globalScore >= 80;

    return (
        <div
            className="bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:border-blue-300 transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => onSelect(tool.id)}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: tool.categoryColor }}
                    >
                        {tool.logo}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">{tool.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${tool.categoryColor}15`, color: tool.categoryColor }}>
                            {tool.category}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: tool.categoryColor }}>{tool.globalScore}</div>
                    <div className="text-xs text-gray-400">/100</div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
                {isRecommended ? (
                    <>
                        <div className="bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-green-700">RECOMMANDE</span>
                    </>
                ) : (
                    <>
                        <div className="bg-yellow-500 rounded-full p-1">
                            <Star className="w-3 h-3 text-white" fill="white" />
                        </div>
                        <span className="text-xs font-semibold text-yellow-700">A EVALUER</span>
                    </>
                )}
            </div>

            <p className="text-xs text-gray-500 line-clamp-2">{tool.verdict}</p>
        </div>
    );
};

// Full Tool Evaluation Page
const ToolEvaluationPage = ({ tool, onBack, onNavigate, allToolIds, currentIndex }) => {
    const isRecommended = tool.globalScore >= 80;
    const criteria = tool.isLMS ? lmsCriteria : authoringCriteria;

    const weightedScore = criteria.reduce((acc, criterion) => {
        return acc + (tool.scores[criterion.key] * criterion.weight / 100);
    }, 0);

    const getConfidenceStars = () => {
        return [...Array(3)].map((_, i) => (
            <Star
                key={i}
                className="w-4 h-4"
                fill={i < tool.confidence ? "#FBBF24" : "none"}
            />
        ));
    };

    return (
        <div className="max-w-7xl mx-auto bg-white min-h-screen">
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Retour a la liste</span>
                </button>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate(allToolIds[currentIndex - 1])}
                        disabled={currentIndex === 0}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-500">
                        {currentIndex + 1} / {allToolIds.length}
                    </span>
                    <button
                        onClick={() => onNavigate(allToolIds[currentIndex + 1])}
                        disabled={currentIndex === allToolIds.length - 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tool Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: tool.categoryColor }}
                    >
                        {tool.logo}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{tool.name}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${tool.categoryColor}15`, color: tool.categoryColor }}>
                                {tool.category}
                            </span>
                            <span className="text-sm text-gray-500">{tool.headquarters} | Fonde en {tool.founded}</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 text-lg">{tool.verdict}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Spider Graph */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Evaluation Multi-Dimensionnelle</h2>
                        <ToolSpiderGraph tool={tool} />
                    </div>
                </div>

                {/* Scores Panel */}
                <div className="space-y-6">
                    {/* Global Score */}
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                        <div className="text-center mb-4">
                            <div className="text-5xl font-bold" style={{ color: tool.categoryColor }}>
                                {tool.globalScore}
                            </div>
                            <div className="text-gray-400">/100</div>
                            <div className="text-sm text-gray-500 mt-1">Score pondere: {weightedScore.toFixed(1)}</div>
                        </div>

                        {/* Recommendation Badge */}
                        <div className="flex justify-center mb-4">
                            {isRecommended ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                                    <div className="bg-green-500 rounded-full p-1">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold text-green-700">RECOMMANDE</span>
                                </div>
                            ) : tool.globalScore >= 70 ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full">
                                    <Star className="w-5 h-5 text-yellow-600" fill="#CA8A04" />
                                    <span className="font-bold text-yellow-700">BON CHOIX</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
                                    <div className="bg-red-500 rounded-full p-1">
                                        <X className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold text-red-700">A EVALUER</span>
                                </div>
                            )}
                        </div>

                        {/* Confidence Level */}
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-gray-500">Confiance:</span>
                            <div className="flex">{getConfidenceStars()}</div>
                        </div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Scores Detailles</h3>
                        <div className="space-y-3">
                            {criteria.map((criterion) => (
                                <div key={criterion.key}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">{criterion.name} ({criterion.weight}%)</span>
                                        <span className="font-bold text-gray-700">{tool.scores[criterion.key]}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-500"
                                            style={{
                                                width: `${tool.scores[criterion.key]}%`,
                                                backgroundColor: tool.categoryColor
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                        <h3 className="font-bold text-gray-800 mb-2">Tarification</h3>
                        <div className="text-2xl font-bold" style={{ color: tool.categoryColor }}>
                            {tool.pricing}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            Ideal pour: {tool.bestFor}
                        </div>
                    </div>
                </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                        <div className="bg-green-500 rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        Forces
                    </h3>
                    <ul className="space-y-2">
                        {tool.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                                <span className="text-green-500 mt-1">✓</span>
                                {strength}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <div className="bg-red-500 rounded-full p-1">
                            <X className="w-4 h-4 text-white" />
                        </div>
                        Faiblesses
                    </h3>
                    <ul className="space-y-2">
                        {tool.weaknesses.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                                <span className="text-red-500 mt-1">!</span>
                                {weakness}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Scoring Guide */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" fill="#EAB308" />
                    Guide de Scoring
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <div className="font-semibold text-gray-700">90-100: Excellent</div>
                        <div className="text-gray-600">Leader de categorie</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-700">80-89: Tres bon</div>
                        <div className="text-gray-600">Recommande</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-700">70-79: Bon</div>
                        <div className="text-gray-600">A considerer</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-700">&lt;70: Moyen</div>
                        <div className="text-gray-600">Cas specifiques</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main ToolsEvaluation Component
export function ToolsEvaluation() {
    const [selectedTool, setSelectedTool] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('all');

    const categories = [
        { key: 'all', name: 'Tous les outils', color: COLORS.primary },
        { key: 'LMS + IA', name: 'LMS + IA', color: COLORS.lms },
        { key: 'Authoring Traditionnel', name: 'Authoring Traditionnel', color: COLORS.authoring },
        { key: 'Video IA - Avatars', name: 'Video IA', color: COLORS.video },
        { key: 'Voix IA - TTS', name: 'Voix IA', color: COLORS.voice },
        { key: 'Presentations IA', name: 'Presentations IA', color: COLORS.presentation },
        { key: 'Generation Cours IA', name: 'Generation Cours', color: COLORS.course }
    ];

    const filteredTools = Object.values(allTools).filter(tool =>
        categoryFilter === 'all' || tool.category === categoryFilter
    ).sort((a, b) => b.globalScore - a.globalScore);

    const allToolIds = Object.keys(allTools);
    const currentIndex = selectedTool ? allToolIds.indexOf(selectedTool) : -1;

    // Count tools by category
    const lmsCount = Object.values(allTools).filter(t => t.isLMS).length;
    const authoringCount = Object.values(allTools).filter(t => !t.isLMS).length;
    const recommendedCount = Object.values(allTools).filter(t => t.globalScore >= 80).length;

    if (selectedTool && allTools[selectedTool]) {
        return (
            <ToolEvaluationPage
                tool={allTools[selectedTool]}
                onBack={() => setSelectedTool(null)}
                onNavigate={(id) => setSelectedTool(id)}
                allToolIds={allToolIds}
                currentIndex={currentIndex}
            />
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-2">
                    Fiches Evaluation — LMS + Outils Authoring Digital Learning
                </h1>
                <p className="text-gray-500">
                    Cliquez sur un outil pour voir son evaluation detaillee avec spider graph
                </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setCategoryFilter(cat.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                categoryFilter === cat.key
                                    ? 'text-white shadow-lg'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                            }`}
                            style={categoryFilter === cat.key ? { backgroundColor: cat.color } : {}}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                {filteredTools.map((tool) => (
                    <ToolCard
                        key={tool.id}
                        tool={tool}
                        onSelect={setSelectedTool}
                    />
                ))}
            </div>

            {/* Stats Footer */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
                    <div>
                        <div className="text-3xl font-bold text-primary">{Object.keys(allTools).length}</div>
                        <div className="text-sm text-gray-500">Outils evalues</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold" style={{ color: COLORS.lms }}>{lmsCount}</div>
                        <div className="text-sm text-gray-500">LMS + IA</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold" style={{ color: COLORS.authoring }}>{authoringCount}</div>
                        <div className="text-sm text-gray-500">Authoring</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-600">{recommendedCount}</div>
                        <div className="text-sm text-gray-500">Recommandes</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold" style={{ color: COLORS.video }}>6</div>
                        <div className="text-sm text-gray-500">Categories</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold" style={{ color: COLORS.presentation }}>95</div>
                        <div className="text-sm text-gray-500">Score max</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
