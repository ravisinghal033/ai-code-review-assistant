import React from 'react';

export default function About(){
  return (
    <div className="space-y-6 p-6">
      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Project</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The <strong>AI Code Review Assistant</strong> is an enterprise-grade web application built with 
          microservices architecture that demonstrates the integration of cutting-edge artificial intelligence 
          into the Software Development Life Cycle (SDLC). Powered by <strong>Google Gemini 2.0 Flash</strong>, 
          this platform provides intelligent code analysis and comprehensive quality metrics for multiple 
          programming languages.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-xs text-gray-600">Microservices</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-xs text-gray-600">Languages Supported</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">AI</div>
            <div className="text-xs text-gray-600">Powered Analysis</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-xs text-gray-600">Production Ready</div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-medium text-blue-600 mb-3">Frontend</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>React 18</strong> - Modern UI framework with Hooks</li>
              <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
              <li>• <strong>Chart.js</strong> - Interactive data visualization</li>
              <li>• <strong>React Router</strong> - Client-side routing</li>
              <li>• <strong>Axios</strong> - HTTP client for API calls</li>
              <li>• <strong>Prism.js</strong> - Code syntax highlighting</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-green-600 mb-3">Backend Services</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Flask 2.2.5</strong> - Python web framework</li>
              <li>• <strong>Flask-CORS</strong> - Cross-origin resource sharing</li>
              <li>• <strong>SQLAlchemy 2.0</strong> - Database ORM</li>
              <li>• <strong>SQLite</strong> - Embedded database</li>
              <li>• <strong>Python-dotenv</strong> - Environment management</li>
              <li>• <strong>Requests</strong> - HTTP library</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-purple-600 mb-3">AI & Security</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Google Gemini 2.0 Flash</strong> - AI engine</li>
              <li>• <strong>PyJWT 2.8</strong> - JWT authentication</li>
              <li>• <strong>Docker</strong> - Containerization</li>
              <li>• <strong>Docker Compose</strong> - Orchestration</li>
              <li>• <strong>RESTful API</strong> - Service communication</li>
              <li>• <strong>Microservices</strong> - Scalable architecture</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-800">AI-Powered Code Analysis</h4>
              <p className="text-xs text-gray-600">Google Gemini 2.0 Flash provides intelligent code review with advanced pattern recognition</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
              <h4 className="font-medium text-gray-800">Code Metrics Analysis</h4>
              <p className="text-xs text-gray-600">Automatic calculation of lines, functions, branches, and complexity metrics</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-800">Multi-Language Support</h4>
              <p className="text-xs text-gray-600">Python, JavaScript, C++, and TypeScript</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">Quality Score Prediction</h4>
              <p className="text-xs text-gray-600">0-100 scoring system with detailed breakdown and improvement suggestions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">Review History & Tracking</h4>
              <p className="text-xs text-gray-600">Complete history with code storage, timestamps, and progress tracking</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">Interactive Analytics Dashboard</h4>
              <p className="text-xs text-gray-600">Charts, trends, language distribution, and performance metrics</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
            <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">User Authentication</h4>
              <p className="text-xs text-gray-600">JWT-based auth with role-based access control (RBAC)</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-cyan-50 rounded-lg">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">Admin Dashboard</h4>
              <p className="text-xs text-gray-600">Service monitoring, user management, and audit logs</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-lime-50 rounded-lg">
            <div className="w-2 h-2 bg-lime-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-800">Real-time Processing</h4>
              <p className="text-xs text-gray-600">Instant feedback with streaming responses and live updates</p>
            </div>
              </div>
          <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-gray-800">Code Syntax Highlighting</h4>
              <p className="text-xs text-gray-600">Prism.js integration for beautiful code display across all languages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Microservices Architecture */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Microservices Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="font-semibold text-blue-800">Frontend Service</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Port:</strong> 3000</p>
            <p className="text-xs text-gray-600">React-based UI with responsive design, routing, and state management</p>
          </div>
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-semibold text-green-800">API Gateway</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Port:</strong> 5000</p>
            <p className="text-xs text-gray-600">Routes requests, coordinates services, handles review submissions and history</p>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h4 className="font-semibold text-purple-800">AI Service</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Port:</strong> 5001</p>
            <p className="text-xs text-gray-600">Google Gemini integration for code analysis, security checks, and test generation</p>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <h4 className="font-semibold text-orange-800">Analytics Service</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Port:</strong> 5002</p>
            <p className="text-xs text-gray-600">Metrics calculation, trend analysis, and dashboard data aggregation</p>
          </div>
          <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 className="font-semibold text-red-800">User Service</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Port:</strong> 5003</p>
            <p className="text-xs text-gray-600">JWT authentication, user management, RBAC, and audit logging</p>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <h4 className="font-semibold text-gray-800">Database</h4>
            </div>
            <p className="text-xs text-gray-700 mb-2"><strong>Type:</strong> SQLite</p>
            <p className="text-xs text-gray-600">Stores reviews, user data, analytics, and audit logs with full persistence</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="font-medium text-gray-800">Code Submission</h4>
              <p className="text-sm text-gray-600">User pastes code or uploads file through React frontend. Request sent to API Gateway.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="font-medium text-gray-800">Metrics Calculation</h4>
              <p className="text-sm text-gray-600">API Gateway calculates lines of code, functions, branches with language-specific detection.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="font-medium text-gray-800">AI Analysis</h4>
              <p className="text-sm text-gray-600">Google Gemini 2.0 Flash analyzes code quality, security, and provides intelligent suggestions.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
            <div>
              <h4 className="font-medium text-gray-800">Data Storage</h4>
              <p className="text-sm text-gray-600">Review data stored in SQLite database with full code, analysis, and metadata preservation.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">5</div>
            <div>
              <h4 className="font-medium text-gray-800">Analytics Processing</h4>
              <p className="text-sm text-gray-600">Analytics service calculates metrics, trends, and dashboard statistics from review history.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
            <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">6</div>
            <div>
              <h4 className="font-medium text-gray-800">Results Display</h4>
              <p className="text-sm text-gray-600">Frontend displays scores, suggestions, code metrics, and visualizations with syntax highlighting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Purpose */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Purpose & Learning Outcomes</h3>
        <div className="space-y-3 text-gray-700">
          <p className="text-sm">
            This enterprise-grade application demonstrates the practical implementation of AI-powered 
            microservices architecture in modern software development. It serves as a comprehensive 
            learning resource and portfolio project showcasing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li><strong>AI Integration:</strong> Google Gemini 2.0 Flash API implementation</li>
              <li><strong>Microservices:</strong> 5-service architecture with API Gateway pattern</li>
              <li><strong>Full-Stack Development:</strong> React + Flask with RESTful APIs</li>
              <li><strong>Authentication:</strong> JWT-based security with RBAC</li>
              <li><strong>Data Visualization:</strong> Chart.js analytics dashboard</li>
              <li><strong>Database Design:</strong> SQLite with ORM (SQLAlchemy)</li>
            </ul>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li><strong>Code Analysis:</strong> Multi-language metrics calculation</li>
              <li><strong>DevOps:</strong> Docker containerization and orchestration</li>
              <li><strong>UI/UX Design:</strong> Responsive Tailwind CSS components</li>
              <li><strong>State Management:</strong> React Hooks and Context API</li>
              <li><strong>Testing:</strong> Production-ready error handling</li>
      </ul>
          </div>
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Highlights & Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-xs text-gray-600">Microservices</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">RESTful</div>
            <div className="text-xs text-gray-600">API Design</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">AI</div>
            <div className="text-xs text-gray-600">Gemini 2.0</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">JWT</div>
            <div className="text-xs text-gray-600">Auth Security</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">Docker</div>
            <div className="text-xs text-gray-600">Containerized</div>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="text-2xl font-bold text-indigo-600">React</div>
            <div className="text-xs text-gray-600">Modern UI</div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Performance</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Real-time code analysis (2-5s)</li>
              <li>• Concurrent request handling</li>
              <li>• Optimized database queries</li>
              <li>• Efficient AI API integration</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Scalability</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Independent service scaling</li>
              <li>• Stateless API design</li>
              <li>• Database connection pooling</li>
              <li>• Cloud-deployment ready</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Security</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• JWT token authentication</li>
              <li>• CORS configuration</li>
              <li>• SQL injection protection</li>
              <li>• Audit logging system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Supported Languages */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Supported Programming Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-base font-semibold text-gray-800">Python</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
            <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
            <span className="text-base font-semibold text-gray-800">C++</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-base font-semibold text-gray-800">JavaScript</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-300 hover:border-blue-500 transition-colors">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-base font-semibold text-gray-800">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
