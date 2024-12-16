export const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <span key={index} className="text-yellow-500 text-2xl">
                ★
              </span>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <span key={index} className="text-yellow-500 text-2xl">
                ☆
              </span>
            );
          } else {
            return (
              <span key={index} className="text-gray-300 text-2xl">
                ★
              </span>
            );
          }
        })}
        <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };