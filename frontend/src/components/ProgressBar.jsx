import { useTheme } from '../context/ThemeContext';
import { Upload, Layout, Cpu, Download, Check } from 'lucide-react';

function ProgressBar({ step, sidebarOpen }) {
  const { darkMode } = useTheme();

  const steps = [
    { id: 1, label: 'Upload PDF', icon: <Upload size={14} /> },
    { id: 2, label: 'Select Purpose', icon: <Layout size={14} /> },
    { id: 3, label: 'AI Formatting', icon: <Cpu size={14} /> },
    { id: 4, label: 'Download', icon: <Download size={14} /> },
  ];

const getStepStyle = (s) => {
    if (step > s.id) {
      // Completed — dark blue
      return {
        background: '#1d4ed8',
        color: '#ffffff',
        boxShadow: '0 2px 8px rgba(29,78,216,0.4)',
        transform: 'scale(1)',
      };
    } else {
      // Not yet — light gray
      return {
        background: darkMode ? 'rgba(55,65,81,0.3)' : 'rgba(243,244,246,0.8)',
        color: darkMode ? '#4b5563' : '#d1d5db',
        boxShadow: 'none',
        transform: 'scale(1)',
      };
    }
  };

  const getConnectorStyle = (index) => {
    return {
      width: '32px',
      height: '2px',
      margin: '0 4px',
      borderRadius: '99px',
      transition: 'all 0.5s ease',
      background: step > index + 1 ? '#2563eb' : darkMode ? 'rgba(55,65,81,0.3)' : '#e5e7eb',
    };
  };

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes stepPulse {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        @keyframes stepComplete {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .step-current {
          animation: stepPulse 2s infinite;
        }
        .step-complete {
          animation: stepComplete 0.4s ease;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '0',
        left: sidebarOpen ? '256px' : '56px',
right: '0',
transition: 'left 0.3s ease',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 24px',
        background: darkMode
          ? 'rgba(17,24,39,0.80)'
          : 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: darkMode
          ? '1px solid rgba(55,65,81,0.5)'
          : '1px solid rgba(229,231,235,0.5)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          {steps.map((s, index) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>

              {/* Step Pill */}
              <div
                className={
                  step === s.id ? 'step-current' :
                  step > s.id ? 'step-complete' : ''
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  ...getStepStyle(s),
                }}
              >
                {step > s.id ? <Check size={12} /> : s.icon}
                <span>{s.label}</span>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div style={getConnectorStyle(index)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProgressBar;