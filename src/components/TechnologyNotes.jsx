import React, { useState } from 'react';

function TechnologyNotes({ notes, onNotesChange, techId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

  const handleSave = () => {
    onNotesChange(techId, localNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    setIsEditing(false);
  };

  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: '10px',
      padding: '15px',
      marginTop: '10px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1em' }}>📝 Мои заметки</h4>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.85em',
              cursor: 'pointer'
            }}
          >
            {notes ? 'Редактировать' : 'Добавить'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSave}
              style={{
                background: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.85em',
                cursor: 'pointer'
              }}
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.85em',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          placeholder="Добавьте свои заметки по этой технологии..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '10px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontFamily: 'inherit',
            fontSize: '0.9em',
            resize: 'vertical',
            marginBottom: '10px'
          }}
        />
      ) : (
        <div>
          {notes ? (
            <p style={{ margin: 0, color: '#2c3e50', lineHeight: '1.5' }}>{notes}</p>
          ) : (
            <p style={{ margin: 0, color: '#7f8c8d', fontStyle: 'italic' }}>
              Заметок пока нет. Добавьте свои мысли по этой технологии.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyNotes;