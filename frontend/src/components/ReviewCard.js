import React from 'react';

const ReviewCard = ({ review, onClick }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLanguageColor = (language) => {
    const colors = {
      python: 'bg-blue-500',
      javascript: 'bg-yellow-500',
      java: 'bg-orange-500',
      cpp: 'bg-blue-600',
      csharp: 'bg-purple-500',
      go: 'bg-cyan-500',
      rust: 'bg-orange-600',
      php: 'bg-indigo-500',
      ruby: 'bg-red-500',
      swift: 'bg-orange-400'
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 p-4"
      onClick={() => onClick(review)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getLanguageColor(review.language)}`}></div>
          <h3 className="font-semibold text-gray-800 text-lg">{review.filename}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(review.score)}`}>
          {review.score}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="capitalize font-medium">{review.language}</span>
        <span>{new Date(review.created_at).toLocaleDateString()}</span>
      </div>
      
      {review.issues && (
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Issues: </span>
          <span>{review.issues}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          Click to view details
        </div>
        <div className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          View Analysis →
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;















