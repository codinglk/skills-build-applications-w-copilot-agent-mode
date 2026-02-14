import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespaceName !== 'localhost' 
    ? `https://${codespaceName}-8000.app.github.dev/api/users/` 
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setUsers(items);
        console.log('Users API:', apiUrl);
        console.log('Fetched users:', items);
      });
  }, [apiUrl]);

  return ( 
    <div className="container my-4"> 
      <div className="card shadow-sm"> 
        <div className="card-body"> 
          <h2 className="card-title mb-4 text-primary text-center">Users</h2> 
          <div className="table-responsive"> 
            <table className="table table-striped table-hover align-middle"> 
              <thead className="table-dark"> 
                <tr> 
                  <th scope="col">ID</th> 
                  <th scope="col">Name</th> 
                  <th scope="col">Email</th> 
                </tr> 
              </thead> 
              <tbody> 
                {users.map((user, idx) => ( 
                  <tr key={idx}> 
                    <td>{user.id}</td> 
                    <td>{user.name}</td> 
                    <td> 
                      <a href={`mailto:${user.email}`} className="link-primary"> 
                        {user.email} 
                      </a> 
                    </td> 
                  </tr> 
                ))} 
              </tbody> 
            </table> 
          </div> 
          <div className="d-flex justify-content-end mt-3"> 
            <button className="btn btn-primary">Add User</button> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
};

export default Users;
