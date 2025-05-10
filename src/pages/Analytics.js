import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAnalytics(res.data);
      } catch (err) {
        setError('Failed to fetch analytics');
      }
    };
    fetchAnalytics();
  }, []);

  // Chart data
  const chartData = {
    labels: analytics?.postsByDepartment.map((dep) => dep._id[0] || 'Unknown'),
    datasets: [
      {
        label: 'Posts by Department',
        data: analytics?.postsByDepartment.map((dep) => dep.count),
        backgroundColor: '#2DD4BF',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Posts by Department' },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-navy-blue mb-4">Team Analytics</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-navy-blue">Total Posts</h3>
            <p className="text-2xl text-teal-500">{analytics.totalPosts}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-navy-blue">Total Likes</h3>
            <p className="text-2xl text-teal-500">{analytics.totalLikes}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-navy-blue">Total Comments</h3>
            <p className="text-2xl text-teal-500">{analytics.totalComments}</p>
          </div>
        </div>
      )}
      {analytics && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default Analytics;