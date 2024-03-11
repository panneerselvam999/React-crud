import './App.css';
import { useEffect, useState } from 'react';
import { Button, EditableText } from '@blueprintjs/core';

function App() {
  const [User, setUser] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUser(json))
  }, [])


  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>WebSite</th>
          <th>Action</th>
        </thead>
        <tbody>
          {User.map((getUser) =>
            <tr key={getUser.id}>
              <td>{getUser.id}</td>
              <td>{getUser.name}</td>
              <td><EditableText value={getUser.email} /></td>
              <td><EditableText value={getUser.website} /></td>
              <td>
                <Button intent='primary'>Edit</Button>
                <Button intent='danger'>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
