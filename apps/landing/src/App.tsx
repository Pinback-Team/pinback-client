import { useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Contents from './components/contents/Contents';

function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = scrollRef.current;
      if (!container) return;

      const activeElement = document.activeElement as HTMLElement;
      const isInputFocused =
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.tagName === 'BUTTON' ||
        activeElement.tagName === 'A' ||
        activeElement.isContentEditable;

      if (isInputFocused) return;

      const pageHeight = window.innerHeight;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          container.scrollBy({ top: pageHeight, behavior: 'smooth' });
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          container.scrollBy({ top: -pageHeight, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth outline-none"
      tabIndex={-1}
    >
      <Header />

      <main>
        <Contents />
      </main>
    </div>
  );
}

export default App;
