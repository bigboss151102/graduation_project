'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollArrow({ targetId }: { targetId: string }) {
  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center pt-6 pb-2">
      <motion.button
        onClick={scrollTo}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cursor-pointer"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={32}
            strokeWidth={1.5}
            style={{ color: 'var(--blue)', opacity: 0.6 }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
