import React, { useState } from 'react';
import Sentiment from 'sentiment';
import { motion } from 'framer-motion';

const sentiment = new Sentiment();

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [sentimentScore, setSentimentScore] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Analyze feedback in real-time and update sentiment score
  const analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);
    setSentimentScore(result.comparative);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    analyzeSentiment(e.target.value);
  };

  const isValidMobile = (num) => /^\d{10}$/.test(num);

  // Simulated SMS sending and setting submitted state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert('Please enter your feedback');
      return;
    }
    if (!isValidMobile(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setSubmitted(true);

    // Simulated SMS sending + PDF receipt generation alert
    setTimeout(() => alert(`PDF receipt sent to mobile number: ${mobileNumber}`), 1200);
  };

  const sentimentEmoji = () => {
    if (sentimentScore === null) return '🤔';
    if (sentimentScore > 0.2) return '😊';
    if (sentimentScore < -0.2) return '😞';
    return '😐';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl max-w-xl mx-auto p-8 text-gray-800"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-800">
        Send Your Feedback
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <textarea
          className="border border-purple-300 rounded-lg p-4 text-lg resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          rows={6}
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
          required
          aria-label="Feedback input"
        />

        <p className="text-xl select-none">
          Sentiment:{' '}
          <span aria-live="polite" aria-atomic="true">
            {sentimentEmoji()}
          </span>
        </p>

        <input
          type="tel"
          className="border border-purple-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          maxLength={10}
          placeholder="Your 10-digit mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          aria-label="Mobile number input"
          pattern="\d{10}"
        />

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#6b46c1' }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-purple-700 text-white font-bold p-4 rounded-lg shadow-md shadow-purple-600"
        >
          Submit Feedback
        </motion.button>
      </form>

      {submitted && (
        <motion.div
          className="mt-8 p-5 rounded-lg bg-green-100 border border-green-400 text-green-700 font-semibold text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          role="alert"
          aria-live="assertive"
        >
          Thank you for your valuable feedback!
        </motion.div>
      )}
    </motion.div>
  );
}

export default FeedbackPage;