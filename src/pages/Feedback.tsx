import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle, ArrowLeft, Star } from 'lucide-react';

const Feedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleFeedbackChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setFeedback(text);
      setCharCount(text.length);
    }
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (selectedRating) => {
    setHoverRating(selectedRating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== '' && rating > 0) {
      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', { feedback, rating });
      // Show success state
      setSubmitted(true);
      // Reset form
      setFeedback('');
      setRating(0);
      setCharCount(0);
    }
  };

  const handleNewFeedback = () => {
    setSubmitted(false);
  };

  const handleGBoack = () => {
    navigate('/customer');
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={handleGBoack} className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          {!submitted ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Share Your Feedback</h1>
                  <p className="text-gray-600">We'd love to hear your thoughts to improve our service</p>
                </div>
              </div>

              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rate Your Experience
                  </label>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => handleRatingHover(star)}
                          onMouseLeave={handleRatingLeave}
                          className="transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`h-8 w-8 transition-colors duration-200 ${
                              star <= (hoverRating || rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 hover:text-yellow-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        (hoverRating || rating) > 0 ? 'text-indigo-600' : 'text-gray-500'
                      }`}>
                        {getRatingText(hoverRating || rating)}
                      </span>
                      {rating > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {rating} out of 5 stars
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback Text Section */}
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Please share your thoughts, suggestions, or concerns..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition duration-200"
                    required
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <span className={`text-sm ${charCount > maxChars * 0.8 ? 'text-amber-600' : 'text-gray-500'}`}>
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    * Both rating and feedback are required.
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={rating === 0 || feedback.trim() === ''}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:transform-none disabled:shadow-md"
                  >
                    <span>Submit Feedback</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Feedback!</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                We appreciate your input and will use it to improve our services. Your feedback is valuable to us!
              </p>
              <button
                onClick={handleNewFeedback}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                Submit Another Feedback
              </button>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-gray-800 mb-2">Why Your Feedback Matters</h3>
            <p className="text-gray-600 text-sm">
              Your insights help us understand what's working and what needs improvement. We use this feedback to enhance
              our products, services, and overall shopping experience. Every suggestion counts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;