import { Star, ArrowRight, Info, Users, Shield, Activity, CheckCircle } from "lucide-react";
import heroImage from "../assets/images/hero-image.png";

export const Home = () => {
  return (
    <div className="h-screen overflow-hidden bg-white">
      <section className="h-[calc(100vh-80px)] flex items-center relative">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-50/40"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,white_100%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8">
            {/* Left Content */}
            <div className="lg:w-5/12 space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium text-blue-900">Live System</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl lg:text-5xl font-bold text-blue-950 leading-tight">
                  RespireX: AI-Powered Lungs Disease Detection
                </h1>
                
                <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                  Advanced AI technology for accurate and rapid chest disease diagnosis. 
                  Making healthcare smarter and more accessible.
                </p>
                
                {/* Feature List */}
                <div className="space-y-2.5">
                  {['Real-time Analysis', 'High Accuracy', 'Instant Results'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                  Try Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm">
                  Learn More
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-blue-950">500+</span>
                        <span className="text-blue-600 text-xs">↑12%</span>
                      </div>
                      <p className="text-xs text-slate-500">Healthcare Professionals</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-blue-950">99%</span>
                        <span className="text-blue-600 text-xs">↑2.5%</span>
                      </div>
                      <p className="text-xs text-slate-500">Detection Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-6/12 h-full flex items-center">
              <div className="relative bg-white rounded-xl border border-slate-100 p-6 w-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-blue-50/50">
                  <img 
                    src={heroImage} 
                    alt="AI Healthcare Illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info Cards */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm border border-slate-100 p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-blue-950">99%</p>
                        <span className="text-blue-600 text-xs">↑2.5%</span>
                      </div>
                      <p className="text-xs text-slate-500">Detection Rate</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-slate-100 p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-950">AI-Powered</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        Real-time Analysis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

