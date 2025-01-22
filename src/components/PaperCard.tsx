import { Calendar, Star, User2, MessageSquare, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Paper } from '../types';
import { ReviewForm } from './ReviewForm';
import { submitReviewToBlockchain } from '../utils/ethereum';

interface PaperCardProps {
  paper: Paper;
  onReviewSubmitted?: () => void;
}

export function PaperCard({ paper, onReviewSubmitted }: PaperCardProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showCollaborateForm, setShowCollaborateForm] = useState(false);
  const [collaborationMessage, setCollaborationMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (review: { rating: number; comments: string }) => {
    try {
      setError(null);
      const txHash = await submitReviewToBlockchain(
        paper.id,
        review.rating,
        review.comments
      );
      console.log('Review submitted successfully:', txHash);
      setShowReviewForm(false);
      onReviewSubmitted?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit review';
      setError(message);
      throw error;
    }
  };

  const handleCollaborateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically send a collaboration request to the backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setShowCollaborateForm(false);
      // Show success message or notification
    } catch (err) {
      setError('Failed to send collaboration request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-white">
      {error && (
        <div className="mb-4 p-4 text-red-300 bg-red-900 bg-opacity-50 rounded-md">
          {error}
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
      <p className="text-gray-300 mb-4">{paper.abstract}</p>
      
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center">
          <User2 className="h-4 w-4 mr-1" />
          <span>{paper.author.name}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(paper.dateSubmitted).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{paper.reviews.length} reviews</span>
        </div>
      </div>

      {paper.reviews.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-lg font-semibold text-purple-300">Reviews</h4>
          {paper.reviews.map((review) => (
            <div key={review.id} className="bg-gray-700 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">{review.reviewer.name}</span>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-400">{review.comments}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${paper.status === 'accepted' ? 'bg-green-900 text-green-300' :
            paper.status === 'rejected' ? 'bg-red-900 text-red-300' :
            paper.status === 'under_review' ? 'bg-yellow-900 text-yellow-300' :
            'bg-gray-700 text-gray-300'
          }`}>
          {paper.status.replace('_', ' ')}
        </span>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setError(null);
              setShowCollaborateForm(true);
            }}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <Users className="h-4 w-4" />
            <span>Collaborate</span>
          </button>
          <button
            onClick={() => {
              setError(null);
              setShowReviewForm(true);
            }}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-purple-300 hover:text-purple-200 transition-colors"
          >
            <Star className="h-4 w-4" />
            <span>Review</span>
          </button>
        </div>
      </div>

      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full">
            <ReviewForm
              paperId={paper.id}
              onSubmit={handleReviewSubmit}
              onCancel={() => {
                setError(null);
                setShowReviewForm(false);
              }}
            />
          </div>
        </div>
      )}

      {showCollaborateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Request Collaboration</h3>
              <button
                onClick={() => setShowCollaborateForm(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCollaborateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message to Author
                </label>
                <textarea
                  value={collaborationMessage}
                  onChange={(e) => setCollaborationMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Explain your interest in collaborating and what you can contribute..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCollaborateForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-dark-900 bg-emerald-400 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed emerald-glow"
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}