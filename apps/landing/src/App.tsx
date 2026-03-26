import { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Contents from './components/contents/Contents';
import { useKeyboardScroll } from './hooks/useKeyboardScroll';

function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useKeyboardScroll(scrollRef);

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
