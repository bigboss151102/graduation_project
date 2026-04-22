'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: 'transparent' }}
    >

      {/* Portrait Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-8 relative"
      >
        <div
          className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mx-auto"
          style={{
            boxShadow: '0 20px 60px rgba(74,128,240,0.25), 0 8px 20px rgba(0,0,0,0.08)',
            border: '3px solid rgba(74,128,240,0.3)',
          }}
        >
          <Image
            src="/images/portrait.jpg"
            alt="Hoàng Công Trọng"
            width={176}
            height={176}
            className="w-full h-full object-cover"
            priority
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src =
                'https://ui-avatars.com/api/?name=Hoang+Cong+Trong&size=176&background=4A80F0&color=fff&bold=true&font-size=0.4';
            }}
          />
        </div>
        {/* Ring decoration */}
        <div
          className="absolute -inset-2 rounded-full pointer-events-none"
          style={{
            border: '1px solid rgba(74,128,240,0.2)',
          }}
        />
      </motion.div>

      {/* Small label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
        style={{ color: 'var(--blue)' }}
      >
        Da Nang University of Science and Technology
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight max-w-4xl mb-5"
        style={{ color: '#1a1a1a', letterSpacing: '-0.02em' }}
      >
        Mình sắp tốt nghiệp rồi{' '}
        <span style={{ WebkitTextFillColor: 'initial' }}>🎓</span>
        <br />
        <span style={{ fontStyle: 'italic', fontWeight: 400, fontSize: '0.65em' }}>
          và sẽ thật ý nghĩa nếu bạn có mặt ở đó, cùng mình.
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light italic"
      >
        Sau những năm tháng học hỏi, xây dựng và trưởng thành khoảnh khắc này cuối cùng cũng đến.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
      >
        <button
          onClick={() => scrollTo('rsvp')}
          className="btn-gold px-10 py-4 rounded-full text-base font-medium tracking-wide"
        >
          Tham dự cùng mình nhé !
        </button>
      </motion.div>

      {/* Scroll arrow */}
      <motion.button
        onClick={() => scrollTo('message')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        aria-label="Scroll down"
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
    </section>
  );
}
