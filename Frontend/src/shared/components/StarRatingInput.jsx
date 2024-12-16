import { useState } from 'react';
import { GrSend } from 'react-icons/gr';

function StarRatingInput({ handleSubmitRating, handleRatingChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index);
    handleRatingChange({ target: { value: index } });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              type="button"
              className={index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star text-4xl mr-2">&#9733;</span>
            </button>
          );
        })}
      </div>
      <button
        className="px-6 py-1 mt-1 ml-1 flex items-center justify-center bg-blue-600 text-white rounded-2xl hover:bg-blue-500"
        onClick={handleSubmitRating}
        disabled={false}
      >
        Enviar
        <GrSend size={15} className='ml-1'/>
      </button>
    </div>
  );
}

export default StarRatingInput;
