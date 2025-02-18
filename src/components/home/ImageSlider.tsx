import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import img_spring from '@/assets/images/slider/spring.jpg';
import img_summer from '@/assets/images/slider/summer.jpg';
import img_fall from '@/assets/images/slider/fall.jpg';
import img_winter from '@/assets/images/slider/winter.jpg';


const images = [
  {
    src: img_spring,
    alt: '슬라이드 1'
  },
  {
    src: img_summer,
    alt: '슬라이드 2'
  },
  {
    src: img_fall,
    alt: '슬라이드 3'
  },
  {
    src: img_winter,
    alt: '슬라이드 4'
  }
];

const ImageSlider: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        marginBottom: '50px',
        backgroundColor: '#f8f9fa',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Swiper
        style={{
          width: '80%',
          paddingBottom: '50px'
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={images[index].src}
              alt={images[index].alt}
              style={{ width: '100%', height: '450px', objectFit: 'contain', margin: '0 auto' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;