import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Registered Users</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Mobile Number</th>
                <th className="py-3 px-4 text-left">Verified</th>
                <th className="py-3 px-4 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.mobile}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        user.verified ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {user.verified ? 'Verified' : 'Not Verified'}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(user.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
