import { useTheme } from '../context/ThemeContext';
import { FileText, Zap, Users, Award, Flame, Rocket, Bot, Mic, Newspaper, Upload, MousePointer, Download } from 'lucide-react';

function HeroSection({ onGetStarted }) {
  const { darkMode } = useTheme();

  const stats = [
    { icon: <FileText size={24} />, number: '10,000+', label: 'Papers Formatted' },
    { icon: <Users size={24} />, number: '5,000+', label: 'Researchers' },
    { icon: <Zap size={24} />, number: '99%', label: 'Accuracy Rate' },
    { icon: <Award size={24} />, number: '3', label: 'Formats Supported' },
  ];

  const features = [
    { icon: <Flame size={32} className="text-blue-600" />, title: 'Instant Formatting', desc: 'Format your paper in seconds using AI' },
    { icon: <Mic size={32} className="text-blue-600" />, title: 'Conference Ready', desc: 'Supports IEEE, Springer and Elsevier formats' },
    { icon: <Newspaper size={32} className="text-blue-600" />, title: 'Journal Ready', desc: 'Upload any journal template and AI formats accordingly' },
    { icon: <Bot size={32} className="text-blue-600" />, title: 'AI Powered', desc: 'Simply upload your PDF and let AI do the work' },
  ];

  const steps = [
    { id: '01', icon: <Upload size={28} className="text-blue-600" />, title: 'Upload PDF', desc: 'Upload your raw research paper in PDF format' },
    { id: '02', icon: <MousePointer size={28} className="text-blue-600" />, title: 'Select Purpose', desc: 'Choose Conference (IEEE, Springer, Elsevier) or Journal with your template' },
    { id: '03', icon: <Bot size={28} className="text-blue-600" />, title: 'AI Formats', desc: 'Our AI analyzes and formats your paper automatically' },
    { id: '04', icon: <Download size={28} className="text-blue-600" />, title: 'Download', desc: 'Download your perfectly formatted research paper' },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <p className="text-blue-600 font-semibold tracking-widest text-sm uppercase mb-4">
          AI Powered Research Tool
        </p>

        <h1 className={`text-4xl md:text-6xl font-black leading-tight mb-6
          ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Format your paper <br />
          <span className="text-blue-600">in seconds.</span>
        </h1>

        <p className={`text-xl max-w-2xl mx-auto mb-10
          ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
Upload your research paper and instantly convert it to your desired format —
whether for a <span className="text-blue-600 font-bold">Conference</span> (IEEE, Springer, Elsevier)
or a <span className="text-blue-600 font-bold">Journal</span> — using the power of AI.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl
            font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg
            flex items-center gap-2"
          >
            <Rocket size={20} />
            Get Started
          </button>
          <button
            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 rounded-xl font-bold text-lg
            border-2 border-gray-300 transition-all hover:scale-105
            flex items-center gap-2
            ${darkMode ? 'text-white hover:border-blue-400' : 'text-gray-700 hover:border-blue-400'}`}
          >
            <FileText size={20} />
            Learn More
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`border-y py-12
        ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center text-blue-600 mb-2">
                {stat.icon}
              </div>
              <p className={`text-3xl font-black mb-1
                ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="py-20 px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold tracking-widest text-sm uppercase mb-4">
            Features
          </p>
          <h2 className={`text-4xl font-black
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Everything you need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:scale-105
                ${darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className={`font-black text-lg mb-2
                ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className={`py-20 px-6
        ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold tracking-widest text-sm uppercase mb-4">
            How It Works
          </p>
          <h2 className={`text-4xl font-black
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Simple 4 step process
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center">

              {/* Step Number + Icon */}
              <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                ${darkMode ? 'bg-gray-700' : 'bg-white shadow-md'}`}>
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600
                  text-white text-xs font-black flex items-center justify-center">
                  {step.id}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-black text-lg mb-2
                ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute mt-8 ml-48 text-blue-300 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl
            font-black text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg
            flex items-center gap-2 mx-auto"
          >
            <Rocket size={20} />
            Start Formatting Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;