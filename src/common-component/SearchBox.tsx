import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CommitIcon from '@mui/icons-material/Commit';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'commit' | 'agent' | 'user' | 'knowledge';
  subtitle?: string;
}

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelectResult?: (item: SearchResultItem) => void;
  className?: string;
  results?: SearchResultItem[];
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search senior commits, agents, knowledge base...',
  onSearch,
  onSelectResult,
  className = '',
  results
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample default search index for live demonstration of knowledge preservation features
  const defaultResults: SearchResultItem[] = [
    { id: '1', title: 'Refactored auth middleware saga for JWT rotation', category: 'commit', subtitle: 'Preserved from Senior Dev (Alex M.)' },
    { id: '2', title: 'Central Knowledge Harvesting Agent #84', category: 'agent', subtitle: 'Organizing 1,240 pushed commits' },
    { id: '3', title: 'Optimized PostgreSQL connection pool leaks', category: 'knowledge', subtitle: 'Deleted Code Snippet & Solution context' },
    { id: '4', title: 'Nivetha Selvakumar (Senior Architect)', category: 'user', subtitle: 'Agent Active • 45 Commits Preserved' }
  ];

  const displayResults = results || defaultResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onSearch) onSearch('');
  };

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (category: SearchResultItem['category']) => {
    switch (category) {
      case 'commit': return <CommitIcon fontSize="small" style={{ color: 'var(--accent-cyan)' }} />;
      case 'agent': return <AutoAwesomeIcon fontSize="small" style={{ color: 'var(--accent-purple)' }} />;
      case 'user': return <PersonIcon fontSize="small" style={{ color: 'var(--accent-emerald)' }} />;
      case 'knowledge': return <CodeIcon fontSize="small" style={{ color: 'var(--accent-amber)' }} />;
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '480px' }} className={className}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-input)',
          border: `1px solid ${isOpen ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
          borderRadius: '14px',
          padding: '0.55rem 0.85rem',
          transition: 'all 0.25s ease',
          boxShadow: isOpen ? 'var(--shadow-glow)' : 'none'
        }}
      >
        <SearchIcon style={{ color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)', marginRight: '0.5rem', transition: 'color 0.2s ease' }} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-sans)'
          }}
        />

        {query ? (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon fontSize="small" />
          </button>
        ) : (
          <kbd
            style={{
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              userSelect: 'none'
            }}
          >
            /
          </kbd>
        )}
      </div>

      {/* DROPDOWN RESULTS PREVIEW */}
      {isOpen && query.trim().length > 0 && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '0.5rem',
            maxHeight: '320px',
            overflowY: 'auto'
          }}
        >
          <div style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Agent Knowledge Results ({displayResults.length})
          </div>

          {displayResults.length > 0 ? (
            displayResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectResult) onSelectResult(item);
                  setQuery(item.title);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                  {getCategoryIcon(item.category)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No agent knowledge found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
