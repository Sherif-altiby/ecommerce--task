import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
}

const Stars = ({ rating }: StarsProps) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={11}
        fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
        stroke={i < Math.floor(rating) ? "#F59E0B" : "#CBD5E1"}
      />
    ))}
  </div>
);

export default Stars;