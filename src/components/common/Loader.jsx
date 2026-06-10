export default function Loader({ size = 'md', className = '' }) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-primary/20 border-t-primary rounded-full animate-spin`} />
    </div>
  );
}
