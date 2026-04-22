'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollArrow from './ScrollArrow';

export default function PersonalMessage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="message"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.78)' }}
    >
      {/* Decorative quote mark */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 font-playfair text-[200px] leading-none select-none pointer-events-none"
        style={{ color: 'rgba(74,128,240,0.06)', top: '20px' }}
      >
        &ldquo;
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] mb-6 font-medium"
          style={{ color: 'var(--blue)' }}
        >
          Lời nhắn từ mình
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 leading-relaxed mb-8"
          style={{ fontStyle: 'italic' }}
        >
          Sự có mặt của bạn trong ngày đặc biệt này có ý nghĩa rất lớn với mình.
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-500 text-lg leading-relaxed font-light max-w-2xl mx-auto"
        >
          Hành trình này không phải đi một mình. Mỗi thầy cô, bạn bè và người thân đã tin tưởng vào mình — tất cả đều là một phần trong cột mốc này. Cảm ơn bạn đã là một phần trong câu chuyện của mình.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 font-playfair text-xl font-semibold"
          style={{ color: 'var(--blue-dark)' }}
        >
          — Hoàng Công Trọng
        </motion.p>
      </div>
      <ScrollArrow targetId="rsvp" />


    </section>
  );
}
