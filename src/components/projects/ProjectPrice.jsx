export default function ProjectPrice({ price = 0 }) {
  return (
    <span className="text-lg font-bold text-gray-900 tracking-tight">
      ₹{price}
    </span>
  );
}
