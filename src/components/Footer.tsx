'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer
      id="footer"
      className="py-20 px-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(195,220,255,0.7) 0%, rgba(175,208,255,0.75) 100%)' }}
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--blue))' }}
      />

      <div className="max-w-2xl mx-auto" ref={ref}>
        {/* GradCap icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl mb-8 mt-8"
        >
          🎓
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-3xl md:text-4xl font-medium text-gray-800 leading-relaxed mb-4"
          style={{ fontStyle: 'italic' }}
        >
          Cảm ơn bạn đã là một phần trong câu chuyện của mình.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-playfair text-xl md:text-2xl"
          style={{ color: 'var(--blue)' }}
        >
          Hẹn gặp bạn trong ngày trọng đại của mình !
        </motion.p>

      </div>
    </footer>
  );
}
