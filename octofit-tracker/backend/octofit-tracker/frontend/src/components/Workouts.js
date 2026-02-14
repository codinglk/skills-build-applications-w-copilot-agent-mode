import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespaceName !== 'localhost'
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setWorkouts(items);
        console.log('Workouts API:', apiUrl);
        console.log('Fetched workouts:', items);
      });
  }, [apiUrl]);

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-success text-center">Workouts</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout</th>
                  <th scope="col">User</th>
                  <th scope="col">Reps</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{workout.workout}</td>
                    <td>{workout.user}</td>
                    <td>{workout.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-success">Add Workout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
