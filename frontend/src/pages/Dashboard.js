import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import ReviewCard from '../components/ReviewCard';
import ReviewDetailModal from '../components/ReviewDetailModal';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function Dashboard(){
  const [history,setHistory]=useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{ fetchHistory(); },[]);
  const fetchHistory = async ()=>{
    try{
      const res = await axios.get('/api/history');
      setHistory(res.data);
    }catch(e){ 
      console.error('Error fetching history:', e);
      // Fallback to demo data if API is not available
      setHistory([
        {
          id: 1,
          filename: 'demo.py',
          language: 'python',
          score: 85,
          created_at: '2024-01-15T10:30:00Z',
          issues: 'Code style; Documentation',
          code: `def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

def main():
    num = int(input("Enter a number: "))
    result = calculate_fibonacci(num)
    print(f"Fibonacci({num}) = {result}")

if __name__ == "__main__":
    main()`,
          analysis: {
            lines: 12,
            functions: 2,
            branches: 2
          },
          suggestions: [
            'Consider using memoization to optimize recursive calls',
            'Add input validation for negative numbers',
            'Use iterative approach for better performance'
          ]
        },
        {
          id: 2,
          filename: 'demo.js',
          language: 'javascript',
          score: 78,
          created_at: '2024-01-14T15:45:00Z',
          issues: 'Error handling; Performance',
          code: `function fetchUserData(userId) {
    const url = \`/api/users/\${userId}\`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayUser(data);
        });
}

function displayUser(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
}`,
          analysis: {
            lines: 10,
            functions: 2,
            branches: 0
          },
          suggestions: [
            'Add error handling for network requests',
            'Use async/await for better readability',
            'Add loading states and error messages'
          ]
        },
        {
          id: 3,
          filename: 'demo.py',
          language: 'python',
          score: 92,
          created_at: '2024-01-13T09:15:00Z',
          issues: 'Minor style issues',
          code: `class UserManager:
    def __init__(self):
        self.users = []
    
    def add_user(self, name, email):
        """Add a new user to the manager"""
        if not name or not email:
            raise ValueError("Name and email are required")
        
        user = {
            'id': len(self.users) + 1,
            'name': name,
            'email': email,
            'created_at': datetime.now()
        }
        self.users.append(user)
        return user
    
    def get_user(self, user_id):
        """Get user by ID"""
        for user in self.users:
            if user['id'] == user_id:
                return user
        return None`,
          analysis: {
            lines: 18,
            functions: 3,
            branches: 2
          },
          suggestions: [
            'Consider using a database instead of in-memory storage',
            'Add type hints for better code documentation',
            'Implement user validation methods'
          ]
        }
      ]);
    }
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome</h2>
          <p className="text-gray-600 mb-6">Paste or upload code to get instant AI-powered reviews. Get comprehensive analysis including security, quality, and performance insights.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Start New Review</span>
            </button>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-3">Recent Scores</h3>
          <div className="h-40">
            <Bar data={{
              labels: history.slice(0,8).map(h=>h.filename+'#'+h.id),
              datasets:[{label:'Score', data: history.slice(0,8).map(h=>h.score)}]
            }} />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.slice(0,6).map(review => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              onClick={handleReviewClick}
            />
          ))}
        </div>
        {history.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Start by creating your first review!</p>
          </div>
        )}
      </div>
      
      {/* Review Detail Modal */}
      <ReviewDetailModal 
        review={selectedReview}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
