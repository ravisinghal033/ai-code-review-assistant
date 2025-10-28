// import React, {useState} from 'react';
import React, { useState, useEffect } from "react";

import axios from 'axios';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css"; // nice dark theme
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import "prismjs/components/prism-c";
import 'prismjs/components/prism-cpp';
// import Prism from "prismjs";


export default function NewReview(){
  const [code,setCode]=useState('');
  const [language,setLanguage]=useState('python');
  const [analysis,setAnalysis]=useState(null);
  const [suggestions,setSuggestions]=useState([]);
  const [syntaxErrors,setSyntaxErrors]=useState([]);
  const [logicErrors,setLogicErrors]=useState([]);
  const [explanation,setExplanation]=useState('');
  const [aiAnalysis,setAiAnalysis]=useState(null);
  const [aiDetection,setAiDetection]=useState(null);
  const [filename,setFilename]=useState('paste');
  const [loading,setLoading]=useState(false);

  const submit = async ()=>{
    setLoading(true);
    try{
      // Add timeout to prevent hanging (increased for AI detection feature)
      const res = await axios.post('/api/review', 
        { code, language, filename },
        { timeout: 60000 } // 60 second timeout for comprehensive AI analysis
      );
      setAnalysis(res.data.analysis);
      setSuggestions(res.data.suggestions || []);
      setSyntaxErrors(res.data.syntax_errors || []);
      setLogicErrors(res.data.logic_errors || []);
      setExplanation(res.data.explanation || '');
      setAiAnalysis(res.data.ai_analysis || null);
      setAiDetection(res.data.ai_detection || null);
      // highlight
      setTimeout(()=>{ Prism.highlightAll(); }, 50);
    }catch(e){
      if (e.code === 'ECONNABORTED') {
        alert('⏱️ Analysis timed out.\n\nThe AI is taking longer than expected. This can happen with:\n• Very long or complex code\n• Network connection issues\n• High API load\n\nTry:\n✓ Submitting shorter code (under 200 lines)\n✓ Checking your internet connection\n✓ Trying again in a moment');
      } else if (e.response?.status === 504) {
        alert('⏱️ AI Analysis Timeout\n\n' + (e.response?.data?.error || 'The analysis took too long. Try with shorter code.'));
      } else if (e.response?.status === 429) {
        alert('🚫 API Quota Exceeded\n\n' + (e.response?.data?.error || 'Please wait a moment and try again.'));
      } else {
        alert('❌ Error\n\n'+(e.response?.data?.error||e.message));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  Prism.highlightAll();
}, [code]);


  const onFile = (evt)=>{
    const f = evt.target.files[0];
    if(!f) return;
    setFilename(f.name);
    const reader = new FileReader();
    reader.onload = e => setCode(e.target.result);
    reader.readAsText(f);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 mb-4">
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="p-2 border rounded">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
          <input type="file" onChange={onFile} />
          <input className="border p-2 rounded" value={filename} onChange={e=>setFilename(e.target.value)} />
        </div>
        <textarea value={code} onChange={e=>setCode(e.target.value)} rows={18} className="w-full p-3 border rounded" placeholder="Paste code here"></textarea>
        <div className="mt-3">
          <button 
            onClick={submit} 
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Analyzing...' : 'Run Review'}
          </button>
        </div>
      </div>

      <div>
        <div className="p-6 bg-white rounded-lg shadow mb-4">
          <h3 className="font-semibold">Analysis</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-sm text-gray-600 font-medium">Analyzing your code with AI...</div>
                <div className="text-xs text-gray-500 mt-2">
                  <div>✓ Checking code quality</div>
                  <div>✓ Detecting logic issues</div>
                  <div>✓ Analyzing AI vs Human patterns</div>
                  <div>✓ Generating suggestions</div>
                </div>
                <div className="text-xs text-gray-400 mt-3">This may take 10-30 seconds</div>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  analysis.score >= 90 ? 'bg-green-100 text-green-800' :
                  analysis.score >= 80 ? 'bg-blue-100 text-blue-800' :
                  analysis.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {analysis.score}
                </div>
                <div className="text-sm text-gray-600">
                  Lines: {analysis.lines} • Functions: {analysis.functions} • Branches: {analysis.branches}
                </div>
              </div>

              {/* AI vs Human Detection */}
              {aiDetection && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                    <span className="text-xl mr-2">🤖</span>
                    AI vs Human Code Analysis
                  </h4>
                  
                  {/* Percentage Bars */}
                  <div className="space-y-3 mb-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-purple-700">AI-Generated</span>
                        <span className="text-sm font-bold text-purple-800">{aiDetection.ai_generated_percentage}%</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{width: `${aiDetection.ai_generated_percentage}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-blue-700">Human-Written</span>
                        <span className="text-sm font-bold text-blue-800">{aiDetection.human_written_percentage}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{width: `${aiDetection.human_written_percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Level */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-600">Confidence Level: </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      aiDetection.confidence === 'High' ? 'bg-green-200 text-green-800' :
                      aiDetection.confidence === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {aiDetection.confidence}
                    </span>
                  </div>

                  {/* Verdict */}
                  {aiDetection.verdict && (
                    <div className="bg-white bg-opacity-60 rounded p-2 mb-3">
                      <p className="text-sm text-purple-800">
                        <strong>Verdict:</strong> {aiDetection.verdict}
                      </p>
                    </div>
                  )}

                  {/* Indicators */}
                  {aiDetection.indicators && aiDetection.indicators.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Key Indicators:</p>
                      <div className="flex flex-wrap gap-1">
                        {aiDetection.indicators.map((indicator, i) => (
                          <span key={i} className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Syntax Errors */}
              {syntaxErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-800 mb-2">🚨 Syntax Errors</h4>
                  {syntaxErrors.map((error, i) => (
                    <div key={i} className="text-sm text-red-700 mb-1">
                      <strong>Line {error.line}:</strong> {error.message}
                    </div>
                  ))}
                </div>
              )}

              {/* Logic Errors */}
              {logicErrors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Logic Issues</h4>
                  {logicErrors.map((error, i) => (
                    <div key={i} className="text-sm text-yellow-700 mb-1">
                      <strong>{error.type}:</strong> {error.message}
                    </div>
                  ))}
                </div>
              )}

              {/* Enhanced AI Analysis */}
              {aiAnalysis && aiAnalysis.explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-800 mb-2">🧩 AI Code Explanation</h4>
                  <div className="text-sm text-blue-700 whitespace-pre-wrap max-h-96 overflow-y-auto">{aiAnalysis.explanation}</div>
                </div>
              )}

              {/* Fallback Code Explanation */}
              {!aiAnalysis && explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Code Explanation</h4>
                  <div className="text-sm text-blue-700 whitespace-pre-wrap">{explanation}</div>
                </div>
              )}

              {/* AI Logic Issues */}
              {aiAnalysis && aiAnalysis.logic_issues && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <h4 className="font-medium text-orange-800 mb-2">⚠️ AI Logic Analysis</h4>
                  <div className="text-sm text-orange-700 whitespace-pre-wrap">{aiAnalysis.logic_issues}</div>
                </div>
              )}

              {/* AI Quality Score */}
              {aiAnalysis && aiAnalysis.quality_score && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-medium text-purple-800 mb-2">🧮 AI Quality Assessment</h4>
                  <div className="text-sm text-purple-700 whitespace-pre-wrap">{aiAnalysis.quality_score}</div>
                </div>
              )}

              {/* AI Language Insight */}
              {aiAnalysis && aiAnalysis.language_insight && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <h4 className="font-medium text-indigo-800 mb-2">💡 Language-Specific Tips</h4>
                  <div className="text-sm text-indigo-700 whitespace-pre-wrap">{aiAnalysis.language_insight}</div>
                </div>
              )}

              {/* AI Issue Summary */}
              {aiAnalysis && aiAnalysis.issue_summary && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">📈 AI Issue Summary</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">{aiAnalysis.issue_summary}</div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-800 mb-2">💡 Suggestions</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ): <div className="text-sm text-gray-500">No analysis yet — run a review.</div>}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Preview</h3>
          <pre className="language-python rounded p-3 bg-gray-800 text-white overflow-auto"><code className="language-python">{code}</code></pre>
        </div>

        {/* AI-Corrected Code Preview */}
        {aiAnalysis && aiAnalysis.corrected_code && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">💻 AI-Corrected Code Preview</h3>
            <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{aiAnalysis.corrected_code}</pre>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              This is the AI-improved version with suggested fixes and optimizations
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
