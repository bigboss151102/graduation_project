'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react';
import ScrollArrow from './ScrollArrow';

function ZaloIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3C8.82 3 3 8.82 3 16C3 19.08 4.06 21.9 5.84 24.1L4 28L8.14 26.22C10.26 27.38 12.56 28 16 28C23.18 28 29 22.18 29 15C29 8.82 23.18 3 16 3ZM21.5 20.5C21.22 21.22 19.9 21.84 19.22 21.92C18.6 21.98 17.82 22.04 14.68 20.74C10.84 19.16 8.42 15.26 8.22 15C8.04 14.76 6.8 13.1 6.8 11.38C6.8 9.66 7.68 8.82 8.04 8.44C8.36 8.08 8.76 8 9.02 8C9.26 8 9.5 8 9.72 8.02C9.96 8.02 10.26 7.92 10.56 8.62C10.88 9.36 11.62 11.08 11.7 11.24C11.8 11.4 11.86 11.6 11.74 11.82C10.98 13.38 10.18 13.32 10.62 14.06C12.06 16.48 13.52 17.32 15.72 18.36C16.08 18.54 16.28 18.52 16.48 18.28C16.66 18.06 17.38 17.22 17.6 16.86C17.82 16.5 18.06 16.56 18.36 16.66C18.66 16.76 20.38 17.62 20.7 17.8C21.02 17.98 21.22 18.06 21.3 18.18C21.4 18.32 21.4 19.06 21.08 19.84L21.5 20.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function EventDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Hoàng+Công+Trọng+Lễ+Tốt+Nghiệp&dates=20260425T010000Z/20260425T060000Z&details=Lễ+tốt+nghiệp+của+Hoàng+Công+Trọng&location=54+Nguyen+Luong+Bang,+Hoa+Khanh+Bac,+Lien+Chieu,+Da+Nang,+Vietnam`;

  const mapEmbedUrl =
    'https://maps.google.com/maps?q=54+Nguyen+Luong+Bang,+Hoa+Khanh+Bac,+Lien+Chieu,+Da+Nang,+Vietnam&z=15&output=embed';

  const cardStyle = {
    background: 'rgba(255,255,255,0.7)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  };

  const iconBox = {
    background: 'rgba(74,128,240,0.1)',
    color: 'var(--blue)',
  };

  return (
    <section id="event" className="py-28 px-6" style={{ background: 'rgba(255,255,255,0.78)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-3 font-medium" style={{ color: 'var(--blue)' }}>
            Đánh dấu lịch của bạn
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Thông tin lễ tốt nghiệp
          </h2>
        </motion.div>

        {/* 2-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {/* Left: Event info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl p-7 flex flex-col gap-6"
            style={cardStyle}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Thông tin buổi lễ</p>

            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Ngày</p>
                <p className="font-semibold text-gray-900">Thứ Bảy, 25 tháng 4 năm 2026</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <Clock size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Giờ</p>
                <p className="font-semibold text-gray-900">8:00 Sáng</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Địa điểm</p>
                <p className="font-semibold text-gray-900">Đại học Bách Khoa Đà Nẵng</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng
                </p>
              </div>
            </div>

            {/* Calendar button */}
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gold px-5 py-3 rounded-full text-sm font-medium self-start"
            >
              <CalendarPlus size={15} />
              Thêm vào Google Calendar
            </a>
          </motion.div>

          {/* Right: Contact */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl p-7 flex flex-col gap-6"
            style={cardStyle}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Liên hệ với mình</p>

            {/* Zalo + Phone */}
            <a href="tel:0934996927" className="flex items-center gap-4 hover:opacity-70 transition-opacity">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <ZaloIcon />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Zalo / Điện thoại</p>
                <p className="font-semibold text-gray-900">0934 996 927</p>
              </div>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/hoangtrong.151102" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-70 transition-opacity">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Facebook</p>
                <p className="font-semibold text-gray-900">Hoàng Trọng</p>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/h.c.trong_02/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-70 transition-opacity">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Instagram</p>
                <p className="font-semibold text-gray-900">h.c.trong_02</p>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)', height: '300px' }}
        >
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ địa điểm"
          />
        </motion.div>
      </div>
      <ScrollArrow targetId="countdown" />
    </section>
  );
}
