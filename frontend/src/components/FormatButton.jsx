import { useTheme } from '../context/ThemeContext';
import { Sparkles } from 'lucide-react';

function FormatButton({ onClick }) {
  const { darkMode } = useTheme();

  return (
    <div className="mb-8">
      <p className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-2">
        Step 3
      </p>
      <h2 className={`text-4xl font-black mb-4
        ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Format your Paper
      </h2>

      <div className={`rounded-2xl border-2 p-8 text-center
        ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white shadow-sm'}`}>
        <button
          onClick={onClick}
          className="bg-blue-600 text-white px-12 py-4 rounded-xl text-lg
          font-black hover:bg-blue-700 transition-all hover:scale-105 shadow-lg
          flex items-center gap-2 mx-auto"
        >
          <Sparkles size={22} />
          Format Paper
        </button>
        <p className="text-gray-400 text-sm mt-3">
          AI will instantly format your paper
        </p>
      </div>
    </div>
  );
}

export default FormatButton;