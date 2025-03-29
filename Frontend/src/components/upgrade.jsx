import React, { useState } from 'react';
import { Check, Star, Zap, Shield, Clock, Users, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const PricingCard = ({ plan, price, features, buttonText, popular, onClick, recommended }) => (
  <div className={`relative rounded-xl p-8 bg-white border ${
    popular ? 'border-blue-200 shadow-xl scale-105' : 'border-slate-100'
  } transition-all duration-300 hover:shadow-lg group`}>
    {/* Popular/Recommended Badge */}
    {(popular || recommended) && (
      <div className="absolute -top-4 left-4">
        <span className={`${
          popular ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'
        } px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
          {popular ? <Zap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
          {popular ? 'Most Popular' : 'Recommended'}
        </span>
      </div>
    )}
    
    <div className="space-y-6">
      {/* Plan Header */}
      <div>
        <h3 className="text-2xl font-bold text-blue-950">{plan}</h3>
        <div className="mt-3 flex items-baseline">
          <span className="text-4xl font-bold text-slate-900">${price}</span>
          <span className="text-slate-500 text-sm ml-2">/month</span>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-4 min-h-[240px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onClick}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          popular
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:-translate-y-0.5'
        }`}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const Upgrade = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showTooltip, setShowTooltip] = useState(null);

  const plans = [
    {
      plan: "Basic",
      price: billingCycle === 'monthly' ? "0" : "0",
      features: [
        "10 AI-powered scans per month",
        "Basic result analysis",
        "Email support within 24 hours",
        "Access to basic features",
        "Standard API access"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      plan: "Pro",
      price: billingCycle === 'monthly' ? "29" : "290",
      features: [
        "Unlimited AI-powered scans",
        "Advanced result analysis",
        "Priority support 24/7",
        "Access to all premium features",
        "Advanced API integration"
      ],
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      plan: "Enterprise",
      price: billingCycle === 'monthly' ? "99" : "990",
      features: [
        "Custom AI model training",
        "Dedicated support team",
        "Custom integration options",
        "Advanced analytics dashboard",
        "White-label solution"
      ],
      buttonText: "Contact Sales",
      recommended: true
    }
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Enterprise Security",
      description: "HIPAA compliant and secure data handling",
      tooltip: "We maintain the highest security standards with HIPAA compliance"
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock expert assistance",
      tooltip: "Our support team is available 24/7 to help you"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Team Collaboration",
      description: "Easy sharing and collaboration features",
      tooltip: "Work seamlessly with your team members"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-slate-50/80 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h2 className="text-4xl font-bold text-blue-950">
            Choose the Right Plan for Your Needs
          </h2>
          <p className="text-lg text-slate-600">
            Get access to advanced AI-powered lung disease detection features
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                billingCycle === 'annual' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Annual Billing
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 relative"
              onMouseEnter={() => setShowTooltip(index)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <div className="p-2 bg-blue-50 rounded-lg w-fit mb-4 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-blue-950">{feature.title}</h3>
                <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
              </div>
              <p className="text-sm text-slate-600 mt-2">{feature.description}</p>
              
              {/* Tooltip */}
              {showTooltip === index && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg w-48 text-center">
                  {feature.tooltip}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index} 
              {...plan} 
              onClick={() => console.log(`Selected ${plan.plan}`)} 
            />
          ))}
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-16 text-center bg-white p-8 rounded-xl border border-slate-100">
          <h3 className="text-xl font-semibold text-blue-950 mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for?
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              Check our FAQ
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
