import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfileComponent() {
  const { userId } = useParams(); // Get the userId from the URL
  const [error, setError] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false); // Track token validity

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('token:', token);
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        // Verify token validity
        const verifyResponse = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            query: `
              query VerifyToken {
                verifyToken {
                  valid
                }
              }
            `
          })
        });

        const verifyResult = await verifyResponse.json();
        console.log('Token verification result:', verifyResult);
        
        if (verifyResult.data && verifyResult.data.verifyToken.valid) {
          setIsTokenValid(true); // Token is valid
        } else {
          setError('Invalid token. Please log in again.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to verify token');
      }
    };

    fetchUserData();
  }, []); // Add userId to the dependency array

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {isTokenValid ? (
        <p>Welcome to your profile! You are logged in.</p>
      ) : (
        <p>Please log in to access your profile.</p>
      )}
    </div>
  );
}

export default ProfileComponent;
