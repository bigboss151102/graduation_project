'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollArrow from './ScrollArrow';

const timelineItems = [
  { year: '2021', label: 'Bắt đầu tại Bách Khoa', desc: 'Nhập học ngành Khoa học Dữ liệu và Trí tuệ Nhân tạo tại Đại học Bách Khoa Đà Nẵng.' },
  { year: '2023', label: 'Khám phá AI', desc: 'Yêu thích machine learning và xây dựng mạng neural đầu tiên của mình.' },
  { year: '2024', label: 'Xây dựng hệ thống thực tế', desc: 'Phát triển các ứng dụng AI sẵn sàng triển khai và đóng góp vào nghiên cứu.' },
  { year: '2026', label: 'Ngày tốt nghiệp', desc: 'Bước lên sân khấu — một chương kết thúc, một hành trình mới bắt đầu.' },
];

function TimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="flex gap-5 items-start"
    >
      {/* Year pill */}
      <div className="flex-shrink-0 pt-0.5">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: 'rgba(74,128,240,0.1)',
            color: 'var(--blue-dark)',
            border: '1px solid rgba(74,128,240,0.22)',
          }}
        >
          {item.year}
        </span>
      </div>
      {/* Content */}
      <div className="pb-8 border-l border-gray-100 pl-5 relative">
        <div
          className="absolute -left-1.5 top-2 w-3 h-3 rounded-full"
          style={{ background: 'var(--blue)', opacity: 0.7 }}
        />
        <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
        <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="about" className="py-28 px-6" style={{ background: 'rgba(255,255,255,0.15)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-3 font-medium"
            style={{ color: 'var(--blue)' }}
          >
            Một chút về mình! 👋
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Hoàng Công Trọng
          </h2>
          <p
            className="text-sm font-medium uppercase tracking-widest mb-6"
            style={{ color: 'var(--blue)' }}
          >
            AI Engineer
          </p>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto font-light">
            Mình là Trọng — sinh viên ngành DSAI, mê AI từ hồi chưa biết AI là gì. 4 năm qua có những đêm thức đến 3 giờ sáng chỉ để debug một cái lỗi ngu, nhưng cũng có những khoảnh khắc mọi thứ suddenly click — và mình biết mình đã chọn đúng con đường.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 text-center"
          >
            Hành trình
          </motion.p>
          <div>
            {timelineItems.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
      <ScrollArrow targetId="event" />
    </section>
  );
}
