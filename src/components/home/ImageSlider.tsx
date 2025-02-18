import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  'https://picsum.photos/800/300',
  'https://picsum.photos/800/300',
  'https://picsum.photos/800/300',
  'https://picsum.photos/800/300',
];

const ImageSlider: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        backgroundColor: '#f8f9fa',
        marginBottom: '50px',
        position: 'relative'
      }}
    >
      <Swiper
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
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;