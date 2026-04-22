'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollArrow from './ScrollArrow';

const TARGET = new Date('2026-04-25T08:00:00+07:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function Digit({ value, label, index }: { value: number; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      <div
        className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center mb-3"
        style={{
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 4px 24px rgba(74,128,240,0.1)',
          border: '1px solid rgba(74,128,240,0.12)',
        }}
      >
        <span
          className="font-playfair text-3xl md:text-5xl font-semibold tabular-nums"
          style={{ color: 'var(--blue-dark)' }}
        >
          {pad(value)}
        </span>
      </div>
      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</p>
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    setTime(calcTimeLeft());
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time?.days ?? 0, label: 'Ngày' },
    { value: time?.hours ?? 0, label: 'Giờ' },
    { value: time?.minutes ?? 0, label: 'Phút' },
    { value: time?.seconds ?? 0, label: 'Giây' },
  ];

  return (
    <section id="countdown" className="py-28 px-6" style={{ background: 'linear-gradient(160deg, rgba(210,230,255,0.55) 0%, rgba(195,220,255,0.45) 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-3 font-medium" style={{ color: 'var(--blue)' }}>
            Ngày trọng đại
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Đếm ngược đến ngày lễ
          </h2>
          <p className="text-gray-400 font-light">
            Thứ Bảy, 25 tháng 4 năm 2026 · 8:00 Sáng
          </p>
        </motion.div>

        {/* Timer */}
        <div className="flex items-start justify-center gap-4 md:gap-8">
          {units.map((u, i) => (
            <Digit key={u.label} value={u.value} label={u.label} index={i} />
          ))}
        </div>
      </div>
      <ScrollArrow targetId="footer" />
    </section>
  );
}
