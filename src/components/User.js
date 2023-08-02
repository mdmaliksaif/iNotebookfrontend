import React, { useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

function User(props) {
  const context = useContext(noteContext);
  let { user, getUser, editUser } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [getUser]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const modalRef = useRef(null);

  const handleEditUser = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateUser = async () => {
    // Call the editUser function here to update user data
    try {
      await editUser(user._id, name, email);
      // The API call is successful, update the local user state
      getUser(); // Fetch updated user data from the backend and update the context
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle the error if needed (e.g., show an error message)
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {user && (
        <div
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '10%',
            display: 'flex',
            flexDirection: 'column', // Arrange the elements in a column
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the boxShadow as needed
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Move the "User Profile" to the top */}
          <h1 className='text-light text-center'>User Profile</h1>
          <div className='container text-light'>
            <h2>Name: {name}</h2>
            <p>Email: {email}</p>
            <h3>Id: {user._id}</h3>
            {/* Add other user information here */}
          </div>
          <i className='fa-regular fa-pen-to-square text-light' onClick={handleEditUser}></i>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div
            style={{
              width: '300px',
              height: '200px',
              borderRadius: '10px',
              backgroundColor: 'white',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>Edit User Profile</h2>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleUpdateUser}>Update User</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
