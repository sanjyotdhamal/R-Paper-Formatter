import { useTheme } from '../context/ThemeContext';
import { CheckCircle, Download } from 'lucide-react';

function ResultSection({ file, format }) {
  const { darkMode } = useTheme();

  return (
    <div className="mb-8">
      <p className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-2">
        Step 4
      </p>
      <h2 className={`text-4xl font-black mb-4
        ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Your Formatted Paper
      </h2>

      <div className={`rounded-2xl border-2 p-8
        ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white shadow-sm'}`}>

        {/* Success Message */}
        <div className="text-center mb-6">
          <CheckCircle size={52} className="text-blue-600 mb-3 mx-auto" />
          <h3 className={`text-xl font-black mb-1
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Paper Formatted Successfully!
          </h3>
          <p className="text-gray-400 text-sm">
            {file} → formatted to{' '}
            <span className="text-blue-600 font-bold">{format}</span>
          </p>
        </div>

        {/* Preview Box */}
        <div className={`rounded-xl p-6 mb-6
          ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>

          <p className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-3">
            Preview
          </p>

          {/* Paper Preview */}
          <div className={`rounded-lg p-6
            ${darkMode ? 'bg-gray-600' : 'bg-white shadow-sm'}`}>

            {/* Paper Title */}
            <p className={`font-black text-center text-base mb-1
              ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Title of the Research Paper
            </p>
            <p className="text-center text-xs mb-1 text-gray-400">
              Author Name, Co-Author Name
            </p>
            <p className="text-center text-xs mb-4 text-gray-400">
              Department of Computer Science — {format} Format
            </p>

            <hr className={`mb-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`} />

            {/* Abstract */}
            <p className="font-black text-xs mb-1 text-blue-600 uppercase tracking-widest">
              Abstract
            </p>
            <p className={`text-xs leading-relaxed mb-4
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              This paper presents a comprehensive study formatted according to {format} guidelines.
              The document follows all official formatting rules including proper citations,
              headings hierarchy, and reference formatting standards.
            </p>

            {/* Introduction */}
            <p className="font-black text-xs mb-1 text-blue-600 uppercase tracking-widest">
              I. Introduction
            </p>
            <p className={`text-xs leading-relaxed mb-4
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The introduction section provides background information and context
              for the research. All sections are properly formatted according to
              {format} standards with correct indentation and spacing.
            </p>

            {/* References */}
            <p className="font-black text-xs mb-1 text-blue-600 uppercase tracking-widest">
              References
            </p>
            <p className={`text-xs leading-relaxed
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              [1] A. Author, "Title of Paper," Journal Name, vol. 1, no. 1, pp. 1-10, 2024.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-10 py-3 rounded-xl
            font-black hover:bg-blue-700 transition-all hover:scale-105 shadow-lg
            flex items-center gap-2 mx-auto">
            <Download size={18} />
            Download Formatted Paper
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;