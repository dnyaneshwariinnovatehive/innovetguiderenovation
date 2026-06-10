'use client';

import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectCarousel({ projects }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const prevRef = useCallback((node) => {
    if (node) setPrevEl(node);
  }, []);

  const nextRef = useCallback((node) => {
    if (node) setNextEl(node);
  }, []);

  if (!projects || projects.length === 0) return null;

  const canLoop = projects.length > 3;

  return (
    <div className="relative px-0 lg:px-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ prevEl, nextEl }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={canLoop}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="!pb-14 select-none"
      >
        {projects.map((project, i) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <button
        ref={prevRef}
        className="absolute left-0 top-[calc(50%-28px)] -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-primary/30 hover:scale-105 active:scale-95 -ml-3 lg:-ml-1"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-[calc(50%-28px)] -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-primary/30 hover:scale-105 active:scale-95 -mr-3 lg:-mr-1"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #1B5573 !important; opacity: 0.3 !important; transition: all 0.3s ease !important; }
        .swiper-pagination-bullet-active { opacity: 1 !important; width: 20px !important; border-radius: 4px !important; }
      `}</style>
    </div>
  );
}
