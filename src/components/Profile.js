import React from 'react';

const Profile = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {/* Placeholder for profile picture */}
            <span className="text-lg font-semibold text-gray-500">
              {student.firstname?.charAt(0)}
              {student.lastname?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {student.firstname} {student.lastname}
            </h2>
            <p className="text-gray-500">NetID: {student.netid}</p>
            <p className="text-gray-500">Year: {student.year || 'N/A'}</p>
            <p className="text-gray-500">Class: {student.class || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-4">
          <p>
            <span className="font-semibold">Email:</span> {student.email || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {student.phone || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Dorm:</span> {student.dorm || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;