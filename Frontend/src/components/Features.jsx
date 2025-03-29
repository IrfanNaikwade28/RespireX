import { Brain, Zap, Clock, Shield, Users, BarChart3, Stethoscope, FileText, Cloud, ArrowRight } from 'lucide-react';

// Add image imports
const heroBackground = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"; // Medical/tech pattern background

const featureImage1 = "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80"; // Medical scan/diagnostic image

const featureImage2 = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"; // Cloud/technology related image

const featureImage3 = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"; // Medical team collaboration image

export const Features = () => {
    const features = [
        {
            icon: <Brain className="w-6 h-6 text-blue-600" />,
            title: "AI-Powered Detection",
            description: "Advanced machine learning algorithms for accurate lung disease detection",
            stats: "99% accuracy rate",
            bgColor: "bg-blue-50",
        },
        {
            icon: <Clock className="w-6 h-6 text-teal-600" />,
            title: "Real-Time Analysis",
            description: "Get instant results and analysis for quick medical decisions",
            stats: "< 30 seconds per scan",
            bgColor: "bg-teal-50"
        },
        {
            icon: <Shield className="w-6 h-6 text-indigo-600" />,
            title: "HIPAA Compliant",
            description: "Secure and compliant handling of sensitive medical data",
            stats: "Enterprise-grade security",
            bgColor: "bg-indigo-50"
        }
    ];

    const detailedFeatures = [
        {
            icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
            title: "Advanced Diagnostics",
            description: "Utilize cutting-edge AI technology for precise lung disease detection and analysis",
            benefits: [
                "Multiple disease detection",
                "Detailed severity analysis",
                "Pattern recognition",
                "Historical comparison"
            ],
            image: featureImage1,
            gradient: "from-blue-50 to-indigo-50/30"
        },
        {
            icon: <Cloud className="w-8 h-8 text-teal-600" />,
            title: "Cloud Integration",
            description: "Seamlessly integrate with existing healthcare systems and cloud storage",
            benefits: [
                "Easy data access",
                "Automatic backups",
                "Cross-platform support",
                "Secure storage"
            ],
            image: featureImage2,
            gradient: "from-teal-50 to-blue-50/30"
        },
        {
            icon: <Users className="w-8 h-8 text-indigo-600" />,
            title: "Collaboration Tools",
            description: "Enable efficient teamwork among healthcare professionals",
            benefits: [
                "Real-time sharing",
                "Case discussions",
                "Team annotations",
                "Access control"
            ],
            image: featureImage3,
            gradient: "from-indigo-50 to-blue-50/30"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Background Pattern */}
            <div className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 opacity-5">
                    <img src={heroBackground} alt="" className="w-full h-full object-cover" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-2 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                            <span className="text-sm font-medium text-blue-600">AI-Powered Healthcare</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 leading-tight">
                            Advanced Features for
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Modern Healthcare</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Empower your medical practice with AI-driven lung disease detection and comprehensive analysis tools
                        </p>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {features.map((feature, index) => (
                            <div key={index} 
                                className="group bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className={`p-4 ${feature.bgColor} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-blue-950 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                                    <span>{feature.stats}</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Features Section */}
                    {detailedFeatures.map((feature, index) => (
                        <div key={index} className="mb-32">
                            <div className={`flex flex-col md:flex-row items-center gap-16 ${
                                index % 2 === 1 ? 'md:flex-row-reverse' : ''
                            }`}>
                                {/* Content */}
                                <div className="md:w-1/2 space-y-6">
                                    <div className={`p-4 ${feature.gradient} rounded-2xl w-fit`}>
                                        {feature.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold text-blue-950 leading-tight">
                                        {feature.title}
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {feature.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-3 group">
                                                <div className="p-1.5 bg-blue-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                    <Zap className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-slate-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Feature Image with Animation */}
                                <div className="md:w-1/2">
                                    <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-500`}>
                                        <div className="relative overflow-hidden rounded-xl aspect-square">
                                            <img 
                                                src={feature.image} 
                                                alt={feature.title}
                                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Enhanced CTA Section */}
                    <div className="relative text-center bg-gradient-to-b from-white to-slate-50 rounded-3xl p-16 border border-slate-100 shadow-xl overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <img src={heroBackground} alt="" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-blue-950 mb-4">
                                Ready to Transform Your Practice?
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                                Join healthcare professionals worldwide who trust RespireX for accurate lung disease detection
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="group px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 justify-center shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="group px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 justify-center">
                                    View Documentation
                                    <FileText className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
