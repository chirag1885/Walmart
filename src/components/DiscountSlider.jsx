import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// Sample discount/ads data - you can replace with dynamic data
const slides = [
  {
    id: 1,
    title: 'Super Summer Sale',
    desc: 'Up to 50% off on all electronics!',
    bgColor: '#6f42c1',
  },
  {
    id: 2,
    title: 'Flash Deal',
    desc: 'Limited time 30% off on shoes',
    bgColor: '#d6336c',
  },
  {
    id: 3,
    title: 'Buy 1 Get 1 Free',
    desc: 'On selected fashion brands',
    bgColor: '#198754',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  arrows: true,
};

function DiscountSlider() {
  return (
    <section className="max-w-5xl mx-auto mb-8">
      <Slider {...sliderSettings}>
        {slides.map(({ id, title, desc, bgColor }) => (
          <motion.div
            key={id}
            className="flex flex-col justify-center items-center rounded-lg text-white p-10 shadow-lg select-none"
            style={{ backgroundColor: bgColor, minHeight: '180px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-extrabold mb-3">{title}</h3>
            <p className="text-lg max-w-md text-center">{desc}</p>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
}

export default DiscountSlider;