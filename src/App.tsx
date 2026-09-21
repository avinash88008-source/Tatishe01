import { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleContactClick = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('hello@mainframe.co');
      showToast('hello@mainframe.co copied to clipboard');
    } else {
      window.location.href = 'mailto:hello@mainframe.co';
    }
  };

  return (
    <div className="relative min-h-screen w-full select-auto overflow-hidden bg-black text-black">
      {/* Background Video (mouse-scrub controlled) */}
      <BackgroundVideo />

      {/* Navbar (fixed top, z-10) */}
      <Navbar onContactClick={handleContactClick} />

      {/* Hero Section (z-1) */}
      <main>
        <Hero />
      </main>

      {/* Subtle toast for actions */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-black/90 px-5 py-2.5 text-[14px] text-white shadow-lg backdrop-blur-md transition-all animate-fade-in"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
