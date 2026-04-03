import SkeletonLoader from './components/SkeletonLoader';
import { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import toast from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import FormatSelector from './components/FormatSelector';
import FormatButton from './components/FormatButton';
import ResultSection from './components/ResultSection';
import ProgressBar from './components/ProgressBar';

function App() {
  const { darkMode } = useTheme();
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowApp(true);
      setIsTransitioning(false);
    }, 500);
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setStep(2);
  };

  const handleFormatSelect = (selectedFormat) => {
    setFormat(selectedFormat);
    setStep(3);
  };

  const handleFormat = () => {
    if (!file) {
      toast.error('Drop a PDF first, genius!');
      return;
    }
    if (!format) {
      toast.error('Pick a format before we roll!');
      return;
    }
    setLoading(true);
    setShowResult(false);
    toast.loading('AI is cooking your paper...', { id: 'formatting' });
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setStep(4);
      toast.success('Paper formatted like a pro!', { id: 'formatting' });

      // Add to recent chats
      const newChat = {
  id: Date.now(),
  name: file.name.replace('.pdf', ''),
  format: format.includes('Journal') ? 'Journal' : format,
  starred: false,
  downloaded: false,
  createdAt: Date.now(),
};

      setChats(prev => [newChat, ...prev]);

    }, 2000);
  };

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${darkMode ? 'bg-gray-900 text-white dotted-bg-dark' : 'bg-white text-gray-800 dotted-bg'}`}>

      {/* Navbar */}
      <Navbar />

      {/* Progress Bar — always at bottom */}
      {showApp && <ProgressBar step={step} sidebarOpen={sidebarOpen} />}

      {!showApp ? (
        <div className={`pt-16 ${isTransitioning ? 'animate-fade-slide-out' : 'animate-fade-slide-in'}`}>
          <HeroSection onGetStarted={handleGetStarted} />
        </div>
      ) : (
        <div className="pt-16">

          {/* Sidebar */}
          <Sidebar
            onToggle={handleSidebarToggle}
            chats={chats}
            setChats={setChats}
          />

          {/* Main Content */}
          <div
            style={{
              marginLeft: sidebarOpen ? '256px' : '56px',
              transition: 'margin-left 0.3s ease',
              padding: '32px',
              paddingBottom: '80px',
              minHeight: '100vh',
            }}
          >
            <UploadSection onFileSelect={handleFileSelect} />
            <FormatSelector onFormatSelect={handleFormatSelect} />
            <FormatButton onClick={handleFormat} />
            {loading && <SkeletonLoader />}
            {showResult && (
              <ResultSection file={file.name} format={format} />
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default App;