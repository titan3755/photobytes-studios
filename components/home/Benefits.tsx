'use client'; // This directive MUST be at the top

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Rebuilt from Benefits.jsx
export function Benefits() {
  // Mock data for carouselData
  const carouselData = [
    {
      title: 'Creative Solutions',
      desc: 'We think outside the box to bring your vision to life.',
      imgUrl:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Dedicated Support',
      desc: 'Our team is here to support you at every step of the project.',
      imgUrl:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Pixel-Perfect Design',
      desc: 'We pay attention to every detail, ensuring a flawless result.',
      imgUrl:
        'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="w-full h-[500px] lg:h-[600px] bg-gray-900 mt-20">
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper h-full"
      >
        {carouselData.map((unit) => (
          <SwiperSlide key={unit.title}>
            <div className="relative w-full h-full">
              <Image
                src={unit.imgUrl}
                alt={unit.title}
                fill
                className="object-cover brightness-50"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-5">
                <h2 className="text-white font-bold text-4xl lg:text-5xl">
                  {unit.title}
                </h2>
                <p className="mt-6 text-white font-sans font-medium text-lg max-w-lg mx-auto">
                  {unit.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
