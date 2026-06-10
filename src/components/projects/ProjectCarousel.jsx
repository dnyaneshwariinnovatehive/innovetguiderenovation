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
    <div className="relative px-0 lg:px-14">
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
        className="absolute left-0 top-[calc(50%-28px)] -translate-y-1/2 z-20 w-11 h-11 lg:w-13 lg:h-13 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:shadow-[0_8px_25px_rgba(27,85,115,0.35)] hover:scale-110 active:scale-90 -ml-3 lg:-ml-5"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-[calc(50%-28px)] -translate-y-1/2 z-20 w-11 h-11 lg:w-13 lg:h-13 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:shadow-[0_8px_25px_rgba(27,85,115,0.35)] hover:scale-110 active:scale-90 -mr-3 lg:-mr-5"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #1B5573 !important; opacity: 0.25 !important; transition: all 0.35s ease !important; width: 8px !important; height: 8px !important; }
        .swiper-pagination-bullet-active { opacity: 1 !important; width: 24px !important; border-radius: 4px !important; background: linear-gradient(to right, #1B5573, #2A6B8C) !important; }
        .swiper-pagination-bullet-active-prev, .swiper-pagination-bullet-active-next { transform: scale(0.8) !important; }
      `}</style>
    </div>
  );
}