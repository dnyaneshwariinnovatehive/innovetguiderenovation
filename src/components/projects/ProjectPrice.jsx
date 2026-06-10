export default function ProjectPrice({ price = 0 }) {
  return (
    <span className="text-lg font-bold text-primary tracking-tight">
      ₹{typeof price === 'number' ? price.toLocaleString() : price}
    </span>
  );
}
