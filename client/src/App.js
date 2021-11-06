import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getUsers').then((resp) => {
      const sortedList = resp?.data?.sort((first, next) => {
        if (first.name.firstName.length < next.name.firstName.length) 
          return first < next;
        else
          return first > next;
      });
      setUsersList(sortedList);

    }).catch((err) => {
      console.log('Some error occurred', err);
      setUsersList([]);
    });
  }, [])

  return (
    <div className="App">
      <table className="tblUsers" border="1">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>City</th>
            <th>Profile Image</th>
          </tr>
        </thead>
        <tbody>
        {usersList.length === 0 ? (
          <tr>
            <td colSpan={6}>---No users found---</td>
          </tr>
        ) : usersList.map(({name, email, phoneNo, city, picture}, index) => (
          <tr key={email}>
            <td>{index + 1}</td>
            <td>{`${name.title}. ${name.firstName} ${name.lastName}`}</td>
            <td>{email}</td>
            <td>{phoneNo}</td>
            <td>{city}</td>
            <td><img src={picture} alt="Profile Pic" /></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
