import './App.css';
import { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup } from '@blueprintjs/core';

function App() {
  const [User, setUser] = useState([]);
  const [newName, setnewName] = useState("")
  const [newMail, setnewMail] = useState("")
  const [newWebsite, setnewWebsite] = useState("")

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
              <td><EditableText value={getUser.name} /></td>
              <td><EditableText value={getUser.email} /></td>
              <td><EditableText value={getUser.website} /></td>
              <td>
                <Button intent='primary'>Edit</Button>
                <Button intent='danger'>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>

          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setnewName(e.target.value)}
                placeholder='Enter name'
              />
            </td>
            <td>
              <InputGroup
                value={newMail}
                onChange={(e) => setnewMail(e.target.value)}
                placeholder='Enter mail'
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setnewWebsite(e.target.value)}
                placeholder='Enter website'
              />
            </td>
          </tr>

        </tfoot>
      </table>
    </div>
  );
}

export default App;
