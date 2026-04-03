import toast from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  PlusCircle,
  FileText,
  Search,
  Settings,
  BarChart2,
  HelpCircle,
  Inbox,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  Star,
  Pencil,
  Trash2,
  Download,
  User,
  Clock,
} from 'lucide-react';

function Sidebar({ onToggle, chats, setChats }) {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const menuRef = useRef(null);

  const downloadedCount = chats.filter(c => c.downloaded).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `Research Paper ${chats.length + 1}`,
      format: 'IEEE',
      starred: false,
      downloaded: false,
    };
    setChats([...chats, newChat]);
    setActiveChat(newChat.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      setChats(chats.filter(c => c.id !== id));
      toast.success('Paper deleted!');
      setOpenMenuId(null);
    }
  };

  const handleStar = (id) => {
    setChats(chats.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
    setOpenMenuId(null);
    toast.success('Paper starred!');
  };

  const handleRename = (id, name) => {
    setRenamingId(id);
    setRenameValue(name);
    setOpenMenuId(null);
  };

  const handleRenameSubmit = (id) => {
    if (renameValue.trim()) {
      setChats(chats.map(c => c.id === id ? { ...c, name: renameValue } : c));
      toast.success('Paper renamed!');
    }
    setRenamingId(null);
  };

  const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day ago`;
};

const filteredChats = chats.filter(chat =>

    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const bg = darkMode ? '#111827' : '#ffffff';
  const border = darkMode ? '1px solid #1f2937' : '1px solid #f3f4f6';
  const textColor = darkMode ? '#9ca3af' : '#6b7280';
  const hoverBg = darkMode ? '#1f2937' : '#f9fafb';
  const menuBg = darkMode ? '#1f2937' : '#ffffff';
  const menuBorder = darkMode ? '1px solid #374151' : '1px solid #e5e7eb';

  return (
  <div
  className="sidebar-fixed"
  style={{
    top: '65px',
    left: 0,
    height: 'calc(100vh - 64px)',
    zIndex: 40,
    display: 'flex',
    flexDirection: 'column',
    width: isOpen ? '256px' : '56px',
    transition: 'width 0.3s ease',
    borderRight: border,
    background: bg,
    overflow: 'hidden',
  }}
>
      {/* Top Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'space-between' : 'center',
        padding: isOpen ? '12px 16px' : '12px 0',
        borderBottom: border,
      }}>
        {isOpen && (
          <span style={{ fontSize: '13px', fontWeight: 700, color: textColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Papers
          </span>
        )}
        <button onClick={handleToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, display: 'flex', padding: '4px', borderRadius: '8px' }}>
          {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
      </div>

      {/* New Format Button */}
      <div style={{ padding: isOpen ? '12px 12px 0' : '12px 8px 0' }}>
        <button
          onClick={handleNewChat}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: '8px',
            padding: isOpen ? '8px 12px' : '8px',
            borderRadius: '12px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          <PlusCircle size={16} />
          {isOpen && <span>New Format</span>}
        </button>
      </div>

      {/* Search */}
      {isOpen && (
        <div style={{ padding: '8px 12px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 12px', borderRadius: '12px',
            background: darkMode ? '#1f2937' : '#f9fafb',
            border: menuBorder,
          }}>
            <Search size={14} color={textColor} />
            <input
              type="text"
              placeholder="Search papers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: '13px', color: darkMode ? '#e5e7eb' : '#374151',
                width: '100%',
              }}
            />
          </div>
        </div>
      )}

      {/* Recent Label */}
      {isOpen && (
        <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={12} color={textColor} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: textColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Recent
          </span>
        </div>
      )}

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isOpen ? '0 8px' : '8px 4px', minHeight: 0 }} ref={menuRef}>
        {isOpen ? (
          filteredChats.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: '8px' }}>
              <Inbox size={32} color={textColor} />
              <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>No papers yet!</span>
              <span style={{ fontSize: '12px', color: textColor, textAlign: 'center' }}>Click '+ New Format' to get started</span>
            </div>
          ) : filteredChats.map((chat) => (
            <div
              key={chat.id}
              style={{ position: 'relative', marginBottom: '2px' }}
            >
              {renamingId === chat.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={() => handleRenameSubmit(chat.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(chat.id)}
                  style={{
                    width: '100%', padding: '6px 12px', borderRadius: '10px',
                    border: '2px solid #2563eb', outline: 'none',
                    fontSize: '13px', fontWeight: 500,
                    background: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#111827',
                  }}
                />
              ) : (
                <div
                  onClick={() => setActiveChat(chat.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 10px', borderRadius: '10px', cursor: 'pointer',
                    background: activeChat === chat.id ? '#2563eb' : 'transparent',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeChat !== chat.id) e.currentTarget.style.background = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    if (activeChat !== chat.id) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    {chat.starred
                      ? <Star size={14} color={activeChat === chat.id ? '#ffffff' : '#f59e0b'} fill={activeChat === chat.id ? '#ffffff' : '#f59e0b'} />
                      : <FileText size={14} color={activeChat === chat.id ? '#ffffff' : textColor} />
                    }
                    <div style={{ overflow: 'hidden' }}>
  <span style={{
    fontSize: '13px', fontWeight: 500,
    color: activeChat === chat.id ? '#ffffff' : darkMode ? '#e5e7eb' : '#374151',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    display: 'block',
  }}>
    {chat.name}
  </span>
  <span style={{
    fontSize: '10px',
    color: activeChat === chat.id ? 'rgba(255,255,255,0.7)' : '#9ca3af',
  }}>
    {chat.createdAt ? getTimeAgo(chat.createdAt) : ''}
  </span>
</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                      background: activeChat === chat.id ? 'rgba(255,255,255,0.2)' : (darkMode ? '#374151' : '#f3f4f6'),
                      color: activeChat === chat.id ? '#ffffff' : textColor,
                    }}>
                      {chat.format}
                    </span>

                    {/* 3 Dots Menu */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                      }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: activeChat === chat.id ? '#ffffff' : textColor,
                        display: 'flex', padding: '2px', borderRadius: '6px',
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Dropdown Menu */}
              {openMenuId === chat.id && (
                <div style={{
                  position: 'absolute', right: '0', top: '32px', zIndex: 100,
                  background: menuBg, border: menuBorder,
                  borderRadius: '12px', padding: '4px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  minWidth: '160px',
                }}>
                  <button
                    onClick={() => handleStar(chat.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px', border: 'none',
                      background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      color: darkMode ? '#e5e7eb' : '#374151',
                    }}
                  >
                    <Star size={14} color="#f59e0b" />
                    {chat.starred ? 'Unstar' : 'Star'}
                  </button>

                  <button
                    onClick={() => handleRename(chat.id, chat.name)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px', border: 'none',
                      background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      color: darkMode ? '#e5e7eb' : '#374151',
                    }}
                  >
                    <Pencil size={14} color="#2563eb" />
                    Rename
                  </button>

                  <hr style={{ margin: '4px 0', border: 'none', borderTop: menuBorder }} />

                  <button
                    onClick={() => handleDelete(chat.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px', border: 'none',
                      background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      color: '#ef4444',
                    }}
                  >
                    <Trash2 size={14} color="#ef4444" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              title={chat.name}
              style={{
                width: '100%', display: 'flex', justifyContent: 'center',
                padding: '8px', borderRadius: '10px', marginBottom: '4px',
                background: activeChat === chat.id ? '#2563eb' : 'transparent',
                color: activeChat === chat.id ? '#ffffff' : textColor,
                border: 'none', cursor: 'pointer',
              }}
            >
              {chat.starred ? <Star size={16} color="#f59e0b" fill="#f59e0b" /> : <FileText size={16} />}
            </button>
          ))
        )}
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: border, padding: isOpen ? '8px' : '8px 4px', flexShrink: 0, paddingBottom: '16px' }}>

        {/* Downloads Count */}
        <button
          title="Downloads"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: '10px', padding: isOpen ? '8px 12px' : '8px',
            borderRadius: '10px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            color: textColor, marginBottom: '2px',
          }}
        >
          <Download size={16} />
          {isOpen && <span>{downloadedCount} Papers Downloaded</span>}
        </button>

        {/* Settings */}
        <button
          title="Settings"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: '10px', padding: isOpen ? '8px 12px' : '8px',
            borderRadius: '10px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            color: textColor, marginBottom: '2px',
          }}
        >
          <Settings size={16} />
          {isOpen && <span>Settings</span>}
        </button>

        {/* Help */}
        <button
          title="Help & Guide"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: '10px', padding: isOpen ? '8px 12px' : '8px',
            borderRadius: '10px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            color: textColor, marginBottom: '2px',
          }}
        >
          <HelpCircle size={16} />
          {isOpen && <span>Help & Guide</span>}
        </button>

        {/* Stats */}
        <button
          title="My Stats"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: '10px', padding: isOpen ? '8px 12px' : '8px',
            borderRadius: '10px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            color: textColor, marginBottom: '2px',
          }}
        >
          <BarChart2 size={16} />
          {isOpen && <span>My Stats</span>}
        </button>

        {/* Profile */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: isOpen ? 'flex-start' : 'center',
          gap: '10px', padding: isOpen ? '8px 12px' : '8px',
          borderRadius: '10px', marginTop: '4px',
          borderTop: border,
          cursor: 'pointer',
        }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: '#2563eb', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
          }}>
            <User size={16} color="#ffffff" />
          </div>
          {isOpen && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#e5e7eb' : '#111827', margin: 0 }}>
                Sanjyot Dhamal
              </p>
              <p style={{ fontSize: '11px', color: textColor, margin: 0 }}>
                Free Plan
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Sidebar;