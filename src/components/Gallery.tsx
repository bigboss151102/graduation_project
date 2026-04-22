'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const placeholderImages = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Campus memories' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Late-night coding' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Team projects' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Study sessions' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Graduation ceremony' },
  { id: 6, src: '/images/gallery-6.jpg', alt: 'Friends & memories' },
];

const placeholderColors = [
  'linear-gradient(135deg, #C0D4FF 0%, #4A80F0 100%)',
  'linear-gradient(135deg, #d0e0ff 0%, #6A96F5 100%)',
  'linear-gradient(135deg, #b8ccff 0%, #3A6CD4 100%)',
  'linear-gradient(135deg, #c8d8ff 0%, #5580E8 100%)',
  'linear-gradient(135deg, #dae6ff 0%, #4A80F0 100%)',
  'linear-gradient(135deg, #b0c8ff 0%, #3060C8 100%)',
];

function GalleryItem({ item, index }: { item: (typeof placeholderImages)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="gallery-item relative cursor-pointer"
      style={{ height: '220px', borderRadius: '12px', overflow: 'hidden' }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        onError={(e) => {
          const parent = (e.currentTarget as HTMLImageElement).parentElement;
          if (parent) {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            parent.style.background = placeholderColors[index];
            parent.innerHTML += `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px;"><div style="font-size:28px;opacity:0.7">📷</div><p style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:500;text-align:center;letter-spacing:0.05em">${item.alt}</p></div>`;
          }
        }}
      />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
      >
        <p className="text-white text-sm font-medium">{item.alt}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="py-28 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-3 font-medium"
            style={{ color: 'var(--blue)' }}
          >
            Memories
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            The Journey in Photos
          </h2>
          <p className="text-gray-400 text-base font-light">
            Snapshots from four years of growth, laughter, and learning.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholderImages.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-gray-400 text-xs mt-6 font-light"
        >
          Add your own photos by placing them in the{' '}
          <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
            /public/images/
          </code>{' '}
          folder
        </motion.p>
      </div>
    </section>
  );
}
