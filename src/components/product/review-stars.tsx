
import { Star, StarHalf } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  reviewCount?: number;
  starSize?: number;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, reviewCount, starSize = 16 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="text-primary" style={{ width: starSize, height: starSize }} />
      ))}
      {halfStar === 1 && (
        <StarHalf key="half" fill="currentColor" className="text-primary" style={{ width: starSize, height: starSize }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-muted-foreground/50" style={{ width: starSize, height: starSize }} />
      ))}
      {reviewCount !== undefined && (
        <span className="ml-2 text-xs text-muted-foreground">({reviewCount} reviews)</span>
      )}
    </div>
  );
};

export default ReviewStars;
