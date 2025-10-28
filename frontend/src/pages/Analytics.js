import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title);

export default function Analytics(){
  const [history,setHistory]=useState([]);
  const [analytics,setAnalytics]=useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{ fetchData(); },[]);
  
  const fetchData = async ()=>{
    try{
      const [historyRes, analyticsRes] = await Promise.all([
        axios.get('/api/history'),
        axios.get('/api/analytics/data')
      ]);
      setHistory(historyRes.data);
      
      // Process analytics data for frontend
      if (analyticsRes.data) {
        const processedData = {
          total_reviews: historyRes.data.length,
          average_score: historyRes.data.length > 0 
            ? Math.round(historyRes.data.reduce((sum, h) => sum + (h.score || 0), 0) / historyRes.data.length)
            : 0,
          score_trend: analyticsRes.data.score_trend || [],
          language_distribution: analyticsRes.data.language_distribution || {},
          issue_distribution: analyticsRes.data.issue_distribution || {}
        };
        setAnalytics(processedData);
      }
    }catch(e){ 
      console.error('Analytics fetch error:', e); 
      try {
        const historyData = await axios.get('/api/history');
        setHistory(historyData.data);
        const total = historyData.data.length;
        const avg = total > 0 
          ? Math.round(historyData.data.reduce((sum, h) => sum + (h.score || 0), 0) / total)
          : 0;
        setAnalytics({
          total_reviews: total,
          average_score: avg
        });
      } catch (err) {
        setHistory([]);
        setAnalytics({
          total_reviews: 0,
          average_score: 0
        });
      }
    }finally{
      setLoading(false);
    }
  };
  
  // Process chart data with fallback
  const labels = history.length > 0 
    ? history.map(h => {
        const date = new Date(h.created_at);
        return date.toLocaleDateString();
      })
    : ['No data'];
  
  const scores = history.length > 0
    ? history.map(h => h.score || 85)
    : [0];
  
  // Enhanced issue analysis
  const issueTypes = {};
  const languageStats = {};
  const scoreRanges = { 'Excellent (90-100)': 0, 'Good (70-89)': 0, 'Fair (50-69)': 0, 'Poor (0-49)': 0 };
  
  history.forEach(h=>{
    // Count issues
    const issues = (h.issues||'').split(';').map(s=>s.trim()).filter(Boolean);
    issues.forEach(it=> issueTypes[it] = (issueTypes[it]||0)+1);
    
    // Count languages
    languageStats[h.language] = (languageStats[h.language]||0)+1;
    
    // Count score ranges
    if(h.score >= 90) scoreRanges['Excellent (90-100)']++;
    else if(h.score >= 70) scoreRanges['Good (70-89)']++;
    else if(h.score >= 50) scoreRanges['Fair (50-69)']++;
    else scoreRanges['Poor (0-49)']++;
  });

  // Chart configurations
  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Code Quality Score Over Time',
        font: { size: 16, weight: 'bold' }
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Issue Distribution',
        font: { size: 16, weight: 'bold' }
      },
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const languageChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Language Distribution',
        font: { size: 16, weight: 'bold' }
      },
      legend: {
        display: true,
        position: 'right'
      }
    }
  };

  const scoreChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Score Range Distribution',
        font: { size: 16, weight: 'bold' }
      },
      legend: {
        display: true,
        position: 'right'
      }
    }
  };

  // Color palettes
  const issueColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
  ];
  
  const languageColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
  const scoreColors = ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of code review statistics and trends</p>
      </div>

      {/* Score Trend Chart */}
        <div className="p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Score Trend</h3>
          {scores.length > 0 && scores[0] > 0 ? (
            <div className="h-80">
              <Line 
                data={{ 
                  labels, 
                  datasets:[{
                    label:'Code Quality Score', 
                    data: scores, 
                    fill: false,
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.4,
                    pointBackgroundColor: '#36A2EB',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                  }] 
                }} 
                options={lineChartOptions}
              />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No data available yet. Create your first code review to see analytics!
            </div>
          )}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Distribution */}
        <div className="p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Issue Distribution</h3>
          {Object.keys(issueTypes).length > 0 ? (
            <div className="h-80">
              <Pie 
                data={{ 
                  labels: Object.keys(issueTypes), 
                  datasets:[{
                    data: Object.values(issueTypes),
                    backgroundColor: issueColors.slice(0, Object.keys(issueTypes).length),
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverBorderWidth: 3
                  }] 
                }} 
                options={pieChartOptions}
              />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No issues found yet
            </div>
          )}
        </div>

        {/* Language Distribution */}
        <div className="p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Language Distribution</h3>
          {Object.keys(languageStats).length > 0 ? (
            <div className="h-80">
              <Pie 
                data={{ 
                  labels: Object.keys(languageStats), 
                  datasets:[{
                    data: Object.values(languageStats),
                    backgroundColor: languageColors.slice(0, Object.keys(languageStats).length),
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverBorderWidth: 3
                  }] 
                }} 
                options={languageChartOptions}
              />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No language data yet
            </div>
          )}
        </div>
      </div>

      {/* Score Range Distribution */}
      <div className="p-6 bg-white rounded-lg shadow-lg border">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Score Range Distribution</h3>
        <div className="h-80">
          <Pie 
            data={{ 
              labels: Object.keys(scoreRanges), 
              datasets:[{
                data: Object.values(scoreRanges),
                backgroundColor: scoreColors,
                borderColor: '#fff',
                borderWidth: 2,
                hoverBorderWidth: 3
              }] 
            }} 
            options={scoreChartOptions}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {analytics?.total_reviews || history.length}
          </div>
          <div className="text-sm text-blue-800">Total Reviews</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {analytics?.average_score || (history.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0)}
          </div>
          <div className="text-sm text-green-800">Average Score</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">
            {analytics?.language_distribution ? Object.keys(analytics.language_distribution).length : Object.keys(languageStats).length}
          </div>
          <div className="text-sm text-purple-800">Languages Used</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {analytics?.error_summary?.total_errors || Object.keys(issueTypes).length}
          </div>
          <div className="text-sm text-orange-800">Total Errors Found</div>
        </div>
      </div>

      {/* Error Summary */}
      {analytics?.error_summary && (
        <div className="p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Error Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{analytics.error_summary.syntax_errors}</div>
              <div className="text-sm text-red-800">Syntax Errors</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{analytics.error_summary.logic_errors}</div>
              <div className="text-sm text-yellow-800">Logic Errors</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">{analytics.error_summary.total_errors}</div>
              <div className="text-sm text-gray-800">Total Errors</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
