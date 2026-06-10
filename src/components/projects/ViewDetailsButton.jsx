import { Eye } from 'lucide-react';

export default function ViewDetailsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-xl no-underline transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none"
    >
      <Eye className="w-4 h-4" />
      View Details
    </button>
  );
}
