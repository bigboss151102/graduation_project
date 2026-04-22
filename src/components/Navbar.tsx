'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Về tôi', href: '#about' },
  { label: 'Sự kiện', href: '#event' },
  { label: 'Lời nhắn', href: '#message' },
  { label: 'Tham dự', href: '#rsvp' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']);
  const shadow = useTransform(scrollY, [0, 80], ['0 0 0 rgba(0,0,0,0)', '0 2px 20px rgba(0,0,0,0.06)']);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      style={{ background: bg, boxShadow: shadow, backdropFilter: 'blur(12px)' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-playfair text-lg font-semibold text-gray-900 hover:opacity-70 transition-opacity"
        >
          HCT<span style={{ color: 'var(--blue)' }}> · </span>
          <span className="text-sm font-normal text-gray-400">2026</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#rsvp')}
            className="btn-gold px-5 py-2 rounded-full text-xs font-medium tracking-wide"
          >
            Tham dự ngay
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left text-sm text-gray-600 py-2 border-b border-gray-50"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#rsvp')}
            className="btn-gold w-full py-3 rounded-full text-sm font-medium mt-2"
          >
            Tham dự ngay
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
