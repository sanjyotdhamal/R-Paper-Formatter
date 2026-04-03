import { useTheme } from '../context/ThemeContext';
import { FileSearch, Sun, Moon } from 'lucide-react';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center border-b
      ${darkMode
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur-md'
        : 'bg-white/95 border-gray-100 backdrop-blur-md'}`}>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <FileSearch size={28} className="text-blue-600" />
        <span className={`text-xl font-black tracking-tight
          ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          R-Paper <span className="text-blue-600">Formatter</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <button className="text-gray-400 hover:text-blue-600 font-medium transition-all text-sm tracking-wide">
          Features
        </button>
        <button className="text-gray-400 hover:text-blue-600 font-medium transition-all text-sm tracking-wide">
          Formats
        </button>
        <button className="text-gray-400 hover:text-blue-600 font-medium transition-all text-sm tracking-wide">
          About
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-all
        flex items-center gap-2
          ${darkMode
            ? 'border-gray-700 text-gray-300 hover:border-blue-500'
            : 'border-gray-200 text-gray-700 hover:border-blue-400'}`}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default Navbar;