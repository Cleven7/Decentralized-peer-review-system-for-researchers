import { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  paperId: string;
  onSubmit: (review: { rating: number; comments: string }) => Promise<void>;
  onCancel: () => void;
}

export function ReviewForm({ paperId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ rating, comments });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Submit Review</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="p-4 text-red-300 bg-red-900 bg-opacity-50 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-400'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          {rating === 0 && (
            <p className="mt-1 text-sm text-red-400">Please select a rating</p>
          )}
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-2">
            Comments
          </label>
          <textarea
            id="comments"
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Share your thoughts about this paper..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed purple-glow"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}