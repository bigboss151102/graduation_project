'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ScrollArrow from './ScrollArrow';

export default function RSVP() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', attendance: '', message: '' });
  const [errors, setErrors] = useState({ name: '', attendance: '' });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { name: '', attendance: '' };
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    if (!form.attendance) newErrors.attendance = 'Vui lòng chọn một option nhé.';
    if (newErrors.name || newErrors.attendance) {
      setErrors(newErrors);
      return;
    }
    setErrors({ name: '', attendance: '' });
    setLoading(true);

    const errors: string[] = [];

    // Ghi vào Google Sheets (GET để tránh CORS)
    try {
      const url = new URL(process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL!);
      url.searchParams.set('name', form.name);
      url.searchParams.set('attendance', form.attendance);
      url.searchParams.set('message', form.message);
      await fetch(url.toString(), { mode: 'no-cors' });
    } catch (err) {
      console.error('[Google Sheets]', err);
      errors.push('Google Sheets');
    }

    // Gửi email qua EmailJS
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          name: form.name,
          attendance: form.attendance === 'yes' ? 'Sẽ có mặt' : 'Bận rồi',
          message: form.message,
          title: 'Lời chúc tốt nghiệp',
          email: '',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
    } catch (err) {
      console.error('[EmailJS]', JSON.stringify(err));
      errors.push('EmailJS');
    }

    setLoading(false);

    if (errors.length === 2) {
      alert('Có lỗi xảy ra, bạn thử lại nhé!');
    } else {
      setSubmitted(true);
    }
  };

  const inputClass =
    'w-full border rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 bg-white';

  return (
    <section id="rsvp" className="py-28 px-6" style={{ background: 'linear-gradient(160deg, #ddeaff 0%, #eef4ff 40%, #f5f8ff 100%)', backgroundAttachment: 'fixed' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-3 font-medium" style={{ color: 'var(--blue)' }}>
            Viết cho mình vài lời nhé
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Mỗi lời chúc là một phần kỷ niệm của mình.
          </h2>
        </motion.div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                className={`${inputClass} ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                style={errors.name ? {} : { boxShadow: '0 1px 4px rgba(74,128,240,0.08)' }}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.name}
                </motion.p>
              )}
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Bạn có đến không?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: 'Mình sẽ có mặt! 🎉', val: 'yes' }, { label: 'Rất tiếc, mình bận rồi 🥺 ', val: 'no' }].map(({ label, val }) => {
                  const selected = form.attendance === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setForm({ ...form, attendance: val });
                        if (errors.attendance) setErrors({ ...errors, attendance: '' });
                      }}
                      className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${selected ? 'btn-gold' : ''}`}
                      style={!selected ? { border: '1.5px solid #cbd5e1', background: 'white', color: '#6b7280', boxShadow: '0 1px 4px rgba(74,128,240,0.08)' } : {}}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {errors.attendance && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.attendance}
                </motion.p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Lời nhắn
              </label>
              <textarea
                placeholder="Một lời chúc, một kỷ niệm, hay đơn giản là lời chúc mừng..."
                className={`${inputClass} border-gray-300 resize-none`}
                style={{ boxShadow: '0 1px 4px rgba(74,128,240,0.08)' }}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={15} />
              {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(74,128,240,0.1)' }}
            >
              <CheckCircle size={32} style={{ color: 'var(--blue)' }} />
            </div>
            <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-3">
              Cảm ơn bạn, {form.name}!
            </h3>
            <p className="text-gray-400 font-light">
              {form.attendance === 'yes'
                ? 'Mình rất mong được gặp bạn ở đó. Sự có mặt của bạn là tất cả với mình. 🎓'
                : 'Không sao, mình sẽ nhớ bạn! Cảm ơn vì đã gửi lời chúc đến mình nhé 💙'}
            </p>
          </motion.div>
        )}
      </div>
      <ScrollArrow targetId="event" />
    </section>
  );
}
