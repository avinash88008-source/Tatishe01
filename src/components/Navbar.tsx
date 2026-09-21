import { useState } from 'react';

interface NavbarProps {
  onContactClick?: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="mainframe-navbar"
        className="fixed top-0 left-0 right-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
      >
        {/* Logo (left) */}
        <div id="mainframe-logo" className="flex items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center text-[23px] text-black"
          aria-label="Main Navigation"
        >
          <a
            href="#labs"
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            Labs
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#studio"
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            Studio
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#openings"
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            Openings
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#shop"
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            Shop
          </a>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            id="desktop-cta"
            onClick={(e) => {
              if (onContactClick) {
                e.preventDefault();
                onContactClick();
              }
            }}
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          id="mobile-menu-button"
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-opacity duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <a
          href="#labs"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Labs
        </a>
        <a
          href="#studio"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Studio
        </a>
        <a
          href="#openings"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Openings
        </a>
        <a
          href="#shop"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Shop
        </a>
        <a
          href="#contact"
          onClick={() => {
            closeMobileMenu();
            if (onContactClick) onContactClick();
          }}
          className="text-[32px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
