import React from 'react';

const ReviewDetailModal = ({ review, isOpen, onClose }) => {
  if (!isOpen || !review) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${getLanguageColor(review.language)}`}></div>
              <h2 className="text-xl font-bold text-gray-800">{review.filename}</h2>
              <span className="capitalize text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                {review.language}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full text-lg font-bold ${getScoreColor(review.score)}`}>
                Score: {review.score}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Code</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {review.code || 'No code available'}
                </pre>
              </div>
            </div>

            {/* Analysis Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis</h3>
              <div className="space-y-4">
                {/* Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Code Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Lines of Code:</span>
                      <span className="ml-2 font-semibold">{review.analysis?.lines || 0}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Functions:</span>
                      <span className="ml-2 font-semibold">{review.analysis?.functions || 0}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Branches:</span>
                      <span className="ml-2 font-semibold">{review.analysis?.branches || 0}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quality Score:</span>
                      <span className={`ml-2 font-semibold ${getScoreColor(review.score)}`}>
                        {review.score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI vs Human Detection */}
                {review.ai_detection && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center text-sm">
                      <span className="text-lg mr-2">🤖</span>
                      AI vs Human Code Analysis
                    </h4>
                    
                    {/* Percentage Bars */}
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-purple-700">AI-Generated</span>
                          <span className="text-xs font-bold text-purple-800">{review.ai_detection.ai_generated_percentage}%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                            style={{width: `${review.ai_detection.ai_generated_percentage}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-blue-700">Human-Written</span>
                          <span className="text-xs font-bold text-blue-800">{review.ai_detection.human_written_percentage}%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                            style={{width: `${review.ai_detection.human_written_percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Confidence & Verdict */}
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-600">Confidence: </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        review.ai_detection.confidence === 'High' ? 'bg-green-200 text-green-800' :
                        review.ai_detection.confidence === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {review.ai_detection.confidence}
                      </span>
                    </div>

                    {review.ai_detection.verdict && (
                      <div className="bg-white bg-opacity-60 rounded p-2 text-xs text-purple-800">
                        <strong>Verdict:</strong> {review.ai_detection.verdict}
                      </div>
                    )}
                  </div>
                )}

                {/* Syntax Errors */}
                {review.syntax_errors && review.syntax_errors.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 mb-2">🚨 Syntax Errors</h4>
                    <ul className="space-y-2 text-sm">
                      {review.syntax_errors.map((error, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-red-700">
                            <strong>Line {error.line}:</strong> {error.message}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Logic Errors */}
                {review.logic_errors && review.logic_errors.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Logic Issues</h4>
                    <ul className="space-y-2 text-sm">
                      {review.logic_errors.map((error, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span className="text-yellow-700">
                            <strong>{error.type}:</strong> {error.message}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Code Explanation */}
                {review.explanation && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Code Explanation</h4>
                    <div className="text-sm text-blue-700 whitespace-pre-wrap">{review.explanation}</div>
                  </div>
                )}

                {/* Suggestions */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 mb-2">💡 Suggestions</h4>
                  <ul className="space-y-2 text-sm">
                    {(review.suggestions || [
                      'Consider adding error handling for better robustness',
                      'Use more descriptive variable names for better readability',
                      'Add comments to explain complex logic'
                    ]).map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-green-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Issues Summary */}
                {review.issues && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Issues Summary</h4>
                    <p className="text-sm text-gray-700">{review.issues}</p>
                  </div>
                )}

                {/* Timestamp */}
                <div className="text-xs text-gray-500">
                  Reviewed on: {new Date(review.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Copy code to clipboard
                navigator.clipboard.writeText(review.code || '');
                alert('Code copied to clipboard!');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;
