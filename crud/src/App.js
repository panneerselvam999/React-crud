import './App.css';
import { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';

const appToster = Toaster.create({
  position: "top"
})

function App() {
  const [User, setUser] = useState([]);
  const [newName, setnewName] = useState("")
  const [newMail, setnewMail] = useState("")
  const [newWebsite, setnewWebsite] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUser(json))
  }, []);

  function addUser() {
    const name = newName.trim()
    const email = newMail.trim()
    const website = newWebsite.trim()

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            website
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8" // Fix the header syntax

          }
        })
        .then((res) => res.json())
        .then((data) => {
          setUser([...User, data]);
          appToster.show({
            message: "User add successfully",
            intent: "success",
            timeout: 3000
          })
          setnewName("")
          setnewMail("")
          setnewWebsite("")
        })

    }
  }

  function onChangeHandle(gid, key, value) {
    setUser((users) => {
      return users.map((user) => {
        return user.id === gid ? { ...user, [key]: value } : user;
      })
    })
  }

  function updateUser(gid) {
    const changeUser = User.find((gUser) => gUser.id === gid)
    fetch(`https://jsonplaceholder.typicode.com/users/${gid}`,
      {
        method: "POST",
        body: JSON.stringify(changeUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8" // Fix the header syntax
        }
      })
      .then((res) => res.json())
      .then((data) => {
        appToster.show({
          message: "User Update successfully",
          intent: "success",
          timeout: 3000
        })

      })

  }

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
              <td><EditableText onChange={(value) => { onChangeHandle(getUser.id, "email", value) }} value={getUser.email} /></td>
              <td><EditableText onChange={(value) => { onChangeHandle(getUser.id, "website", value) }} value={getUser.website} /></td>
              <td>
                <Button onClick={() => updateUser(getUser.id)} intent='primary'>Update</Button>
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
            <td><Button intent='success' onClick={addUser}>add</Button></td>
          </tr>

        </tfoot>
      </table>
    </div>
  );
}

export default App;
