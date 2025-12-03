import React from 'react';

function TechnologySearch({ searchQuery, onSearchChange, resultsCount, totalCount }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      margin: '25px 0',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8edf3'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>🔍 Поиск технологий</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по названию или описанию..."
          style={{
            flex: 1,
            padding: '12px 15px',
            border: '2px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '1em',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3498db'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0 15px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            ✕
          </button>
        )}
      </div>
      <div style={{ color: '#5d6d7e', fontSize: '0.95em' }}>
        Найдено: <strong style={{ color: '#2c3e50' }}>{resultsCount}</strong> из <strong style={{ color: '#2c3e50' }}>{totalCount}</strong> технологий
      </div>
    </div>
  );
}

export default TechnologySearch;