import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FilePlus, CheckCircle } from 'lucide-react';

function UploadSection({ onFileSelect }) {
  const { darkMode } = useTheme();
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert('Please drop a PDF file only!');
    }
  };

  return (
    <div className="mb-8">
      <p className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-2">
        Step 1
      </p>
      <h2 className={`text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Upload your PDF
      </h2>

      <div
        onClick={() => document.getElementById('fileInput').click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragging
            ? 'border-blue-600 bg-blue-50 scale-105'
            : darkMode
            ? 'border-gray-600 hover:border-blue-500 bg-gray-800'
            : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50'}`}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {fileName ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={48} className="text-blue-600" />
            <p className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              File Selected!
            </p>
            <p className="text-blue-600 font-semibold">{fileName}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FilePlus
              size={48}
              className={`transition-all duration-300 ${isDragging ? 'text-blue-600 scale-110' : 'text-gray-400'}`}
            />
            <p className={`text-lg font-black mb-1 ${isDragging ? 'text-blue-600' : darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isDragging ? 'Drop your PDF here!' : 'Click or Drag & Drop your PDF'}
            </p>
            <p className="text-gray-400 text-sm">Only PDF files are accepted</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadSection;