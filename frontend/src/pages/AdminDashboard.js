import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [serviceStatus, setServiceStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch service status
      const statusResponse = await axios.get('http://localhost:5000/api/gateway/services', { headers });
      setServiceStatus(statusResponse.data.services);

      // Fetch audit logs
      const logsResponse = await axios.get('http://localhost:5000/api/users/audit-logs', { headers });
      setAuditLogs(logsResponse.data.logs || []);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, 
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Refresh data
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-6">
          System administration and monitoring dashboard for managing users, 
          services, and system health.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Service Status */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(serviceStatus).map(([serviceName, status]) => (
              <div key={serviceName} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800 capitalize">
                    {serviceName.replace('-', ' ')}
                  </h4>
                  <div className={`w-3 h-3 rounded-full ${
                    status.healthy ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <p className="text-sm text-gray-600">URL: {status.url}</p>
                <p className="text-sm text-gray-600">Rate Limit: {status.rate_limit}/min</p>
                <p className="text-sm text-gray-600">Timeout: {status.timeout}s</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Audit Logs</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {auditLogs.slice(0, 10).map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {log.user_id || 'System'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        log.action === 'USER_LOGIN' ? 'bg-green-100 text-green-800' :
                        log.action === 'USER_CREATED' ? 'bg-blue-100 text-blue-800' :
                        log.action === 'ROLE_UPDATED' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {log.resource}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Metrics */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">System Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(serviceStatus).length}
              </div>
              <div className="text-sm text-blue-800">Total Services</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(serviceStatus).filter(s => s.healthy).length}
              </div>
              <div className="text-sm text-green-800">Healthy Services</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {auditLogs.length}
              </div>
              <div className="text-sm text-purple-800">Total Audit Logs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









