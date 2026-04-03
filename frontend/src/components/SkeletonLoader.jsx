import { useTheme } from '../context/ThemeContext';

function SkeletonLoader() {
  const { darkMode } = useTheme();

  return (
    <div className="mb-8">
      <div className={`rounded-2xl border-2 p-8
        ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white shadow-sm'}`}>

        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-full animate-pulse
            ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="flex flex-col gap-2">
            <div className={`w-48 h-4 rounded-lg animate-pulse
              ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`w-32 h-3 rounded-lg animate-pulse
              ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className={`w-3/4 h-5 rounded-lg animate-pulse mb-3
          ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`w-1/2 h-4 rounded-lg animate-pulse mb-6
          ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Content Skeleton */}
        <div className={`rounded-xl p-5 mb-4
          ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`w-24 h-3 rounded-lg animate-pulse mb-3
            ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
          <div className={`w-full h-3 rounded-lg animate-pulse mb-2
            ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
          <div className={`w-full h-3 rounded-lg animate-pulse mb-2
            ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
          <div className={`w-3/4 h-3 rounded-lg animate-pulse
            ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-center">
          <div className={`w-48 h-10 rounded-xl animate-pulse
            ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>

      </div>
    </div>
  );
}

export default SkeletonLoader;