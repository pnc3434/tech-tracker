import React, { useState, useEffect } from 'react';

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenType = () => {
    if (windowSize.width < 768) return 'мобильный';
    if (windowSize.width < 1024) return 'планшет';
    return 'десктоп';
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      margin: '25px 0',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8edf3'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Отслеживание размера окна (useEffect)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <p><strong>Ширина:</strong> {windowSize.width}px</p>
          <p><strong>Высота:</strong> {windowSize.height}px</p>
        </div>
        <div>
          <p><strong>Тип экрана:</strong> {getScreenType()}</p>
          <p><strong>Соотношение:</strong> {(windowSize.width / windowSize.height).toFixed(2)}:1</p>
        </div>
      </div>
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#7f8c8d' }}>
        Попробуйте изменить размер окна браузера
      </p>
    </div>
  );
}

export default WindowSizeTracker;