import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../types';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [totalWarga, setTotalWarga] = useState(0);
  const [currentCash, setCurrentCash] = useState(0);

  // Dummy data for demonstration
  useEffect(() => {
    setTotalWarga(3);
    setCurrentCash(1500000);
    setRecentActivities([
      {
        id: '1',
        description: 'Monthly Dues - John',
        type: 'income',
        payment_type: 'cash',
        amount: 100000,
        date: '2024-01-20',
        warga_id: '1',
        created_at: '2024-01-20',
        updated_at: '2024-01-20'
      },
      // Add more dummy activities here
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Warga</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{totalWarga}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Current Cash</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            Rp {currentCash.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          <Link
            to="/activity"
            className="text-indigo-600 hover:text-indigo-800"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
              <div className={`font-bold ${
                activity.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.type === 'income' ? '+' : '-'} Rp {activity.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}