import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespaceName !== 'localhost'
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setActivities(items);
        console.log('Activities API:', apiUrl);
        console.log('Fetched activities:', items);
      });
  }, [apiUrl]);

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-secondary text-center">Activities</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Activity</th>
                  <th scope="col">User</th>
                  <th scope="col">Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{activity.activity}</td>
                    <td>{activity.user}</td>
                    <td>{activity.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary">Add Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
