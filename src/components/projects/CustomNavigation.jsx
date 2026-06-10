import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomNavigation({ onPrev, onNext, className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        onClick={onPrev}
        className="w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 text-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-primary/30 hover:scale-105 active:scale-95"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className="w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 text-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-primary/30 hover:scale-105 active:scale-95"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
