import React, { useState } from 'react';

// Bluenove colors
const COLORS = {
    primary: '#0D3A50',
    highlight: '#52CBFF',
    text: '#2D2D2D',
    lightGray: '#E8E8E8',
    white: '#FFFFFF',
    categories: {
        authoring: '#0D3A50',
        video: '#E94F37',
        voice: '#2E86AB',
        presentation: '#8B5CF6',
        course: '#10B981'
    }
};

// Tool data by category
const toolsData = {
    authoring: {
        name: 'Authoring Traditionnel',
        color: COLORS.categories.authoring,
        tools: [
            { name: 'Articulate 360', score: 95, innovation: 85, enterprise: 95, ease: 82, price: 75 },
            { name: 'Adobe Captivate', score: 85, innovation: 80, enterprise: 90, ease: 60, price: 70 },
            { name: 'iSpring Suite', score: 82, innovation: 75, enterprise: 80, ease: 95, price: 90 },
            { name: 'Lectora', score: 78, innovation: 65, enterprise: 85, ease: 55, price: 65 }
        ]
    },
    video: {
        name: 'Video IA - Avatars',
        color: COLORS.categories.video,
        tools: [
            { name: 'Synthesia', score: 92, innovation: 98, enterprise: 95, ease: 85, price: 70 },
            { name: 'Colossyan', score: 88, innovation: 90, enterprise: 90, ease: 82, price: 80 },
            { name: 'HeyGen', score: 85, innovation: 88, enterprise: 70, ease: 88, price: 95 },
            { name: 'Elai.io', score: 78, innovation: 80, enterprise: 65, ease: 80, price: 88 }
        ]
    },
    voice: {
        name: 'Voix IA - TTS',
        color: COLORS.categories.voice,
        tools: [
            { name: 'ElevenLabs', score: 94, innovation: 98, enterprise: 85, ease: 88, price: 75 },
            { name: 'Murf AI', score: 86, innovation: 82, enterprise: 80, ease: 95, price: 90 },
            { name: 'Play.ht', score: 84, innovation: 80, enterprise: 75, ease: 75, price: 85 },
            { name: 'WellSaid Labs', score: 80, innovation: 75, enterprise: 78, ease: 82, price: 80 }
        ]
    },
    presentation: {
        name: 'Presentations IA',
        color: COLORS.categories.presentation,
        tools: [
            { name: 'Gamma', score: 90, innovation: 98, enterprise: 70, ease: 95, price: 95 },
            { name: 'Beautiful.ai', score: 85, innovation: 85, enterprise: 80, ease: 90, price: 90 },
            { name: 'Canva Magic', score: 83, innovation: 80, enterprise: 75, ease: 98, price: 88 },
            { name: 'Tome', score: 78, innovation: 85, enterprise: 65, ease: 88, price: 85 }
        ]
    },
    course: {
        name: 'Generation Cours IA',
        color: COLORS.categories.course,
        tools: [
            { name: 'Coursebox', score: 88, innovation: 92, enterprise: 82, ease: 90, price: 85 },
            { name: 'Mindsmith', score: 85, innovation: 88, enterprise: 78, ease: 85, price: 80 },
            { name: 'LearnWorlds', score: 80, innovation: 75, enterprise: 85, ease: 78, price: 75 },
            { name: '7taps', score: 75, innovation: 82, enterprise: 60, ease: 92, price: 70 }
        ]
    }
};

// Spider Graph dimensions
const spiderDimensions = [
    { key: 'score', label: 'Score Global' },
    { key: 'innovation', label: 'Innovation IA' },
    { key: 'enterprise', label: 'Enterprise Ready' },
    { key: 'ease', label: 'Facilite d\'usage' },
    { key: 'price', label: 'Rapport Qualite/Prix' }
];

// Four Quadrant Component
const FourQuadrant = ({ selectedCategory, showAll }) => {
    const width = 700;
    const height = 500;
    const padding = 60;

    const getToolsToShow = () => {
        if (showAll) {
            return Object.entries(toolsData).flatMap(([cat, data]) =>
                data.tools.map(t => ({ ...t, category: cat, color: data.color }))
            );
        }
        const data = toolsData[selectedCategory];
        return data.tools.map(t => ({ ...t, category: selectedCategory, color: data.color }));
    };

    const tools = getToolsToShow();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-primary">
                Quadrant Strategique - Innovation vs Enterprise Readiness
            </h3>
            <svg width={width} height={height} className="mx-auto">
                {/* Background quadrants */}
                <rect x={padding} y={padding} width={(width-2*padding)/2} height={(height-2*padding)/2}
                    fill="#FEF3C7" opacity="0.5" />
                <rect x={padding + (width-2*padding)/2} y={padding} width={(width-2*padding)/2} height={(height-2*padding)/2}
                    fill="#D1FAE5" opacity="0.5" />
                <rect x={padding} y={padding + (height-2*padding)/2} width={(width-2*padding)/2} height={(height-2*padding)/2}
                    fill="#FEE2E2" opacity="0.5" />
                <rect x={padding + (width-2*padding)/2} y={padding + (height-2*padding)/2} width={(width-2*padding)/2} height={(height-2*padding)/2}
                    fill="#DBEAFE" opacity="0.5" />

                {/* Quadrant labels */}
                <text x={padding + 20} y={padding + 25} fill="#92400E" fontSize="12" fontWeight="600">
                    INNOVATEURS
                </text>
                <text x={width - padding - 80} y={padding + 25} fill="#065F46" fontSize="12" fontWeight="600">
                    LEADERS
                </text>
                <text x={padding + 20} y={height - padding - 15} fill="#991B1B" fontSize="12" fontWeight="600">
                    CHALLENGERS
                </text>
                <text x={width - padding - 80} y={height - padding - 15} fill="#1E40AF" fontSize="12" fontWeight="600">
                    ETABLIS
                </text>

                {/* Axes */}
                <line x1={padding} y1={height/2} x2={width-padding} y2={height/2}
                    stroke={COLORS.lightGray} strokeWidth="2" />
                <line x1={width/2} y1={padding} x2={width/2} y2={height-padding}
                    stroke={COLORS.lightGray} strokeWidth="2" />

                {/* Axis labels */}
                <text x={width/2} y={height - 15} textAnchor="middle" fill={COLORS.text} fontSize="13" fontWeight="600">
                    Enterprise Readiness →
                </text>
                <text x={15} y={height/2} textAnchor="middle" fill={COLORS.text} fontSize="13" fontWeight="600"
                    transform={`rotate(-90, 15, ${height/2})`}>
                    Innovation IA →
                </text>

                {/* Grid lines */}
                {[25, 50, 75].map(v => (
                    <g key={v}>
                        <line
                            x1={padding + (width - 2*padding) * (v/100)}
                            y1={padding}
                            x2={padding + (width - 2*padding) * (v/100)}
                            y2={height - padding}
                            stroke={COLORS.lightGray} strokeWidth="1" strokeDasharray="4,4" />
                        <line
                            x1={padding}
                            y1={padding + (height - 2*padding) * (1 - v/100)}
                            x2={width - padding}
                            y2={padding + (height - 2*padding) * (1 - v/100)}
                            stroke={COLORS.lightGray} strokeWidth="1" strokeDasharray="4,4" />
                    </g>
                ))}

                {/* Tool dots */}
                {tools.map((tool) => {
                    const x = padding + (width - 2*padding) * (tool.enterprise / 100);
                    const y = padding + (height - 2*padding) * (1 - tool.innovation / 100);
                    const radius = 8 + (tool.score - 70) / 5;

                    return (
                        <g key={tool.name}>
                            <circle
                                cx={x} cy={y} r={radius}
                                fill={tool.color}
                                stroke="white" strokeWidth="2"
                                opacity="0.9"
                            />
                            <text
                                x={x} y={y - radius - 5}
                                textAnchor="middle"
                                fill={COLORS.text}
                                fontSize="10"
                                fontWeight="500"
                            >
                                {tool.name}
                            </text>
                            <text
                                x={x} y={y + 4}
                                textAnchor="middle"
                                fill="white"
                                fontSize="9"
                                fontWeight="bold"
                            >
                                {tool.score}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {Object.entries(toolsData).map(([key, data]) => (
                    <div key={key} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.color }}></div>
                        <span className="text-sm text-gray-700">{data.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Spider Graph Component
const SpiderGraph = ({ category }) => {
    const data = toolsData[category];
    const width = 450;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 140;
    const levels = 5;

    const angleSlice = (Math.PI * 2) / spiderDimensions.length;

    const getPathD = (tool) => {
        return spiderDimensions.map((dim, i) => {
            const value = tool[dim.key] / 100;
            const x = cx + radius * value * Math.cos(angleSlice * i - Math.PI / 2);
            const y = cy + radius * value * Math.sin(angleSlice * i - Math.PI / 2);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ') + ' Z';
    };

    const toolColors = ['#0D3A50', '#52CBFF', '#E94F37', '#10B981'];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2 text-primary">
                {data.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">Comparaison radar multi-dimensionnelle</p>

            <svg width={width} height={height} className="mx-auto">
                {/* Background circles */}
                {[...Array(levels)].map((_, i) => (
                    <circle
                        key={i}
                        cx={cx} cy={cy}
                        r={radius * (i + 1) / levels}
                        fill="none"
                        stroke={COLORS.lightGray}
                        strokeWidth="1"
                    />
                ))}

                {/* Axes */}
                {spiderDimensions.map((dim, i) => {
                    const x = cx + radius * Math.cos(angleSlice * i - Math.PI / 2);
                    const y = cy + radius * Math.sin(angleSlice * i - Math.PI / 2);
                    const labelX = cx + (radius + 35) * Math.cos(angleSlice * i - Math.PI / 2);
                    const labelY = cy + (radius + 35) * Math.sin(angleSlice * i - Math.PI / 2);

                    return (
                        <g key={dim.key}>
                            <line x1={cx} y1={cy} x2={x} y2={y}
                                stroke={COLORS.lightGray} strokeWidth="1" />
                            <text
                                x={labelX} y={labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={COLORS.text}
                                fontSize="11"
                                fontWeight="500"
                            >
                                {dim.label}
                            </text>
                        </g>
                    );
                })}

                {/* Tool paths */}
                {data.tools.map((tool, i) => (
                    <path
                        key={tool.name}
                        d={getPathD(tool)}
                        fill={toolColors[i]}
                        fillOpacity="0.15"
                        stroke={toolColors[i]}
                        strokeWidth="2"
                    />
                ))}

                {/* Tool dots */}
                {data.tools.map((tool, toolIndex) => (
                    spiderDimensions.map((dim, i) => {
                        const value = tool[dim.key] / 100;
                        const x = cx + radius * value * Math.cos(angleSlice * i - Math.PI / 2);
                        const y = cy + radius * value * Math.sin(angleSlice * i - Math.PI / 2);
                        return (
                            <circle
                                key={`${tool.name}-${dim.key}`}
                                cx={x} cy={y} r="4"
                                fill={toolColors[toolIndex]}
                            />
                        );
                    })
                ))}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
                {data.tools.map((tool, i) => (
                    <div key={tool.name} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: toolColors[i] }}></div>
                        <span className="text-sm font-medium text-gray-700">
                            {tool.name} ({tool.score}/100)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Recommendations Table
const RecommendationsTable = () => {
    const recommendations = [
        { useCase: 'Formation Corporate Complexe', primary: 'Articulate 360', secondary: 'Adobe Captivate', reason: 'Storyline pour interactivite, Rise pour rapidite' },
        { useCase: 'Video Training Grande Echelle', primary: 'Synthesia', secondary: 'ElevenLabs', reason: 'Avatars realistes + voix premium' },
        { useCase: 'L&D avec Interactivite Video', primary: 'Colossyan', secondary: 'Synthesia', reason: 'Branching, hotspots, quiz dans la video' },
        { useCase: 'Rapid Development / PME', primary: 'iSpring Suite', secondary: 'Coursebox', reason: 'PowerPoint -> SCORM rapide' },
        { useCase: 'Marketing / Social Learning', primary: 'HeyGen', secondary: 'Gamma', reason: 'Volume illimite + presentations IA' },
        { useCase: 'Voix-off Premium', primary: 'ElevenLabs', secondary: 'Murf AI', reason: 'Qualite vocale inegalee' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-primary">
                Recommandations par Cas d'Usage
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-primary">
                            <th className="text-left p-3 text-white font-semibold">Cas d'Usage</th>
                            <th className="text-left p-3 text-white font-semibold">Recommandation #1</th>
                            <th className="text-left p-3 text-white font-semibold">Alternative</th>
                            <th className="text-left p-3 text-white font-semibold">Justification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((rec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="p-3 font-medium text-primary">{rec.useCase}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 rounded text-white text-xs font-semibold bg-accent">
                                        {rec.primary}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-600">{rec.secondary}</td>
                                <td className="p-3 text-gray-500">{rec.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Score Cards
const ScoreCards = () => {
    const leaders = [
        { name: 'Articulate 360', category: 'Authoring', score: 95 },
        { name: 'ElevenLabs', category: 'Voix IA', score: 94 },
        { name: 'Synthesia', category: 'Video IA', score: 92 },
        { name: 'Gamma', category: 'Presentation', score: 90 },
        { name: 'Coursebox', category: 'Cours IA', score: 88 },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {leaders.map((tool, i) => (
                <div key={tool.name}
                    className="bg-white rounded-xl shadow-lg p-4 text-center transform hover:scale-105 transition-transform">
                    <div className="text-3xl mb-2">{i < 3 ? '🏆' : '⭐'}</div>
                    <div className="text-2xl font-bold text-primary">{tool.score}</div>
                    <div className="text-xs text-gray-400 mb-1">/100</div>
                    <div className="font-semibold text-sm text-gray-700">{tool.name}</div>
                    <div className="text-xs px-2 py-1 rounded mt-2 bg-blue-50 text-primary">
                        {tool.category}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Main ToolsVisualization Component
export function ToolsVisualization() {
    const [selectedCategory, setSelectedCategory] = useState('video');
    const [showAllQuadrant, setShowAllQuadrant] = useState(true);

    const categories = Object.entries(toolsData).map(([key, data]) => ({
        key,
        name: data.name
    }));

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-2">
                    Benchmark Outils Authoring Digital Learning
                </h1>
                <p className="text-gray-500">
                    Analyse Product Owner de 30+ solutions — Authoring, Video IA, Voix IA, Presentations IA, Generation de cours
                </p>
            </div>

            {/* Score Cards */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-primary">
                    Top Leaders par Categorie
                </h2>
                <ScoreCards />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Four Quadrant */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showAllQuadrant}
                                onChange={(e) => setShowAllQuadrant(e.target.checked)}
                                className="w-4 h-4 rounded"
                            />
                            <span className="text-sm text-gray-600">Afficher toutes les categories</span>
                        </label>
                        {!showAllQuadrant && (
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-1 border rounded text-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat.key} value={cat.key}>{cat.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <FourQuadrant selectedCategory={selectedCategory} showAll={showAllQuadrant} />
                </div>

                {/* Spider Graphs */}
                <SpiderGraph category="authoring" />
                <SpiderGraph category="video" />
                <SpiderGraph category="voice" />
                <SpiderGraph category="presentation" />
                <SpiderGraph category="course" />

                {/* Recommendations */}
                <div className="lg:col-span-2">
                    <RecommendationsTable />
                </div>
            </div>
        </div>
    );
}
