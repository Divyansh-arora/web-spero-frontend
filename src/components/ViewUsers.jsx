import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ViewUsers = () => {
  const [userData, setUserData] = useState([]);
  const [editableUserId, setEditableUserId] = useState(null);
  const navegate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://web-spero-backend.onrender.com/getAllUserData/userData');
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    setEditableUserId(userId);
  };

  const handleSave = async (updatedFields, userId) => {
    try {
      const response = await fetch(`https://web-spero-backend.onrender.com/updateUser/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (response.ok) {
        console.log('User details updated successfully!');
        setEditableUserId(null);
      } else {
        console.error('Failed to update user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleInputChange = (e, field, userId) => {
    const updatedUserData = userData.map(user => {
      if (user._id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setUserData(updatedUserData);
  };

  return (
    <div className="container mx-auto">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold my-4">User Details</h1>
      <button onClick={()=>navegate("/viewnearby")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded mb-4">View NearBy Users</button>
      </div>
     
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border border-gray-200">Name</th>
            <th className="py-2 px-4 border border-gray-200">Email</th>
            <th className="py-2 px-4 border border-gray-200">Address</th>
            <th className="py-2 px-4 border border-gray-200">Mobile</th>
            <th className="py-2 px-4 border border-gray-200">Zipcode</th>
            <th className="py-2 px-4 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, 'name', user._id)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, 'email', user._id)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => handleInputChange(e, 'address', user._id)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.address
                )}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={user.mobile}
                    onChange={(e) => handleInputChange(e, 'mobile', user._id)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.mobile
                )}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={user.zipCode}
                    onChange={(e) => handleInputChange(e, 'zipCode', user._id)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.zipCode
                )}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {editableUserId === user._id ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleSave({
                      name: user.name,
                      email: user.email,
                      address: user.address,
                      mobile: user.mobile,
                      zipCode: user.zipCode
                    }, user._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
