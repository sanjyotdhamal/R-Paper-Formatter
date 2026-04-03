import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Cpu, BookOpen, Search, ChevronDown, Mic, Newspaper, X, Upload, FolderOpen } from 'lucide-react';

function FormatSelector({ onFormatSelect }) {
  const { darkMode } = useTheme();
  const [purpose, setPurpose] = useState('');
  const [selected, setSelected] = useState('');
  const [journalSearch, setJournalSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState('');
  const [otherTemplate, setOtherTemplate] = useState(null);

  const conferenceFormats = [
    { name: 'IEEE', icon: <Cpu size={24} />, desc: 'Engineering & Computer Science' },
    { name: 'Springer', icon: <BookOpen size={24} />, desc: 'European Conferences' },
    { name: 'Other', icon: <FolderOpen size={24} />, desc: 'Upload your own template' },
  ];

  const journalFormats = [
    { name: 'Elsevier', field: 'Engineering, CS, AI, Science, Medical' },
    { name: 'IEEE', field: 'Engineering, CS, AI, Science' },
    { name: 'APA', field: 'Psychology, Education, Social Science, Management' },
    { name: 'MLA', field: 'English, Literature, Humanities' },
    { name: 'Chicago / Turabian', field: 'History, Humanities, Arts, Business' },
    { name: 'Nature', field: 'Biology, Chemistry, Physics, Science' },
    { name: 'Wiley', field: 'Science, Engineering, Medical, Business' },
    { name: 'Taylor & Francis', field: 'Social Science, Humanities, Engineering' },
    { name: 'MDPI', field: 'Engineering, AI, CS, Sustainability' },
    { name: 'SAGE', field: 'Management, Education, Social Science' },
    { name: 'OUP', field: 'Law, Literature, Medicine, Humanities' },
    { name: 'Cambridge', field: 'Math, Science, Economics, Humanities' },
    { name: 'ACS', field: 'Chemistry, Material Science, Pharma' },
    { name: 'RSC', field: 'Chemistry, Chemical Engineering' },
    { name: 'AMA', field: 'Medicine, Healthcare, Clinical Research' },
    { name: 'Vancouver', field: 'Medical, Biology, Health Science' },
    { name: 'Harvard', field: 'Business, Economics, Social Science' },
    { name: 'IJERT / IRJET / UGC', field: 'Engineering, Student Projects, College Papers' },
  ];

  const filteredJournals = journalFormats.filter(j =>
    j.name.toLowerCase().includes(journalSearch.toLowerCase()) ||
    j.field.toLowerCase().includes(journalSearch.toLowerCase())
  );

  const handlePurpose = (p) => {
    setPurpose(p);
    setSelected('');
    setSelectedJournal('');
    setJournalSearch('');
    setShowDropdown(false);
    setOtherTemplate(null);
    onFormatSelect('');
  };

  const handleFormatSelect = (name) => {
    setSelected(name);
    if (name !== 'Other') {
      onFormatSelect(name);
    }
  };

  const handleOtherTemplate = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOtherTemplate(file.name);
      onFormatSelect('Other: ' + file.name);
    }
  };

  const handleJournalSelect = (name) => {
    setSelectedJournal(name);
    setJournalSearch(name);
    setShowDropdown(false);
    onFormatSelect('Journal: ' + name);
  };

  return (
    <div className="mb-8">
      <p className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-2">
        Step 2
      </p>
      <h2 className={`text-4xl font-black mb-4
        ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Select Purpose
      </h2>

      {/* Purpose Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handlePurpose('conference')}
          className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all
            flex items-center justify-center gap-2
            ${purpose === 'conference'
              ? 'bg-blue-600 text-white border-blue-600'
              : darkMode
                ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400'}`}
        >
          <Mic size={16} /> Conference
        </button>
        <button
          onClick={() => handlePurpose('journal')}
          className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all
            flex items-center justify-center gap-2
            ${purpose === 'journal'
              ? 'bg-blue-600 text-white border-blue-600'
              : darkMode
                ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400'}`}
        >
          <Newspaper size={16} /> Journal
        </button>
      </div>

      {/* Conference Formats */}
      {purpose === 'conference' && (
        <div>
          <p className={`text-sm font-semibold mb-3
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Select Conference Format:
          </p>
          <div className="grid grid-cols-3 gap-4">
            {conferenceFormats.map((format) => (
              <button
                key={format.name}
                onClick={() => handleFormatSelect(format.name)}
                className={`p-4 rounded-2xl border-2 text-left transition-all hover:scale-105
                  ${selected === format.name
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                    : darkMode
                      ? 'border-gray-700 bg-gray-800 hover:border-blue-500 text-gray-300'
                      : 'border-gray-200 bg-white hover:border-blue-400 text-gray-700 shadow-sm'
                  }`}
              >
                <div className={`mb-2 ${selected === format.name ? 'text-white' : 'text-blue-600'}`}>
                  {format.icon}
                </div>
                <p className="font-black text-sm">{format.name}</p>
                <p className={`text-xs mt-1
                  ${selected === format.name ? 'text-blue-100' : 'text-gray-400'}`}>
                  {format.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Other Template Upload */}
          {selected === 'Other' && (
            <div className="mt-4">
              <p className={`text-sm font-semibold mb-3
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Upload your Conference Template:
              </p>
              <div
                onClick={() => document.getElementById('otherTemplateInput').click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
                  ${otherTemplate
                    ? 'border-blue-600 bg-blue-50'
                    : darkMode
                      ? 'border-gray-600 hover:border-blue-500 bg-gray-800'
                      : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50'}`}
              >
                <input
                  id="otherTemplateInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleOtherTemplate}
                />
                <Upload size={32} className={`mx-auto mb-2 ${otherTemplate ? 'text-blue-600' : 'text-gray-400'}`} />
                {otherTemplate ? (
                  <p className="text-blue-600 font-bold text-sm">✅ {otherTemplate}</p>
                ) : (
                  <>
                    <p className={`font-black text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Upload Conference Template
                    </p>
                    <p className="text-gray-400 text-xs">PDF, DOC or DOCX accepted</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Journal Search Dropdown */}
      {purpose === 'journal' && (
        <div>
          <p className={`text-sm font-semibold mb-3
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Search and Select Journal Format:
          </p>

          <div className="relative">
            {/* Search Input */}
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer
                ${showDropdown
                  ? 'border-blue-600'
                  : darkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search journal format... (e.g. APA, Nature, Elsevier)"
                value={journalSearch}
                onChange={(e) => {
                  setJournalSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(true);
                }}
                className={`flex-1 outline-none bg-transparent text-sm font-medium
                  ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
              />
              {selectedJournal && (
                <button onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJournal('');
                  setJournalSearch('');
                  onFormatSelect('');
                }}>
                  <X size={16} className="text-gray-400 hover:text-red-400" />
                </button>
              )}
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Dropdown List */}
            {showDropdown && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border-2
                shadow-xl z-50 max-h-64 overflow-y-auto
                ${darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'}`}>
                {filteredJournals.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    No format found
                  </div>
                ) : filteredJournals.map((journal) => (
                  <button
                    key={journal.name}
                    onClick={() => handleJournalSelect(journal.name)}
                    className={`w-full text-left px-4 py-3 transition-all border-b last:border-0
                      ${selectedJournal === journal.name
                        ? 'bg-blue-600 text-white'
                        : darkMode
                          ? 'border-gray-700 hover:bg-gray-700 text-gray-300'
                          : 'border-gray-100 hover:bg-blue-50 text-gray-700'}`}
                  >
                    <p className="font-bold text-sm">{journal.name}</p>
                    <p className={`text-xs mt-0.5
                      ${selectedJournal === journal.name ? 'text-blue-100' : 'text-gray-400'}`}>
                      {journal.field}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Journal Badge */}
          {selectedJournal && (
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                ✅ {selectedJournal} selected
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FormatSelector;