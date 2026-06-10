export default function Loader({ size = 'md', className = '' }) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-[3px] border-primary/10 border-t-primary rounded-full animate-spin`} />
        <div className={`absolute inset-0 ${sizeClasses[size]} border-[3px] border-transparent border-b-accent/30 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  );
}