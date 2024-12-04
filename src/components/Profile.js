import React from 'react';

const Profile = ({ student, profileData, onClose }) => {
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

        {/* Student Basic Info */}
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

        {/* Additional Profile Info */}
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

        {profileData?.ra && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">RA Information:</h3>
            <p>
              {profileData.ra.rafirstname} {profileData.ra.ralastname} (
              {profileData.ra.ranetid})
            </p>
          </div>
        )}

        {profileData?.rc && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">RC Information:</h3>
            <p>
              {profileData.rc.rcfirstname} {profileData.rc.rclastname} (
              {profileData.rc.rcnetid})
            </p>
          </div>
        )}

        {profileData?.students?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Assigned Students:</h3>
            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 text-black">
              {profileData.students.map((student) => (
                <p
                  key={student.studentnetid}
                  className="text-gray-700 text-sm border-b border-gray-200 last:border-b-0 py-1"
                >
                  {student.studentfirstname} {student.studentlastname} (
                  {student.studentnetid})
                </p>
              ))}
            </div>
          </div>
        )}

        {profileData?.ras?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Assigned RAs:</h3>
            <ul className="list-disc ml-5">
              {profileData.ras.map((ra) => (
                <li key={ra.ranetid}>
                  {ra.rafirstname} {ra.ralastname} ({ra.ranetid})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;