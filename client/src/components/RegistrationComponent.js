import { useState } from 'react';
import React from 'react';


 const RegistrationComponent =()=>{

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        usertype: 'user',
      });


      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };



      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                mutation Signup(
                  $firstname: String!
                  $lastname: String!
                  $username: String!
                  $email: String!
                  $password: String!
                  $usertype: String!
                ) {
                  signup(
                    firstname: $firstname
                    lastname: $lastname
                    username: $username
                    email: $email
                    password: $password
                    usertype: $usertype
                  )
                }
              `,
              variables: {
                firstname: formData.firstname,
                lastname: formData.lastname,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                usertype: formData.usertype,
              },
            }),
          });
    
          const result = await response.json();
    
          if (response.ok && result.data.signup) {
            alert('Signup successful!');
          } else {
            alert('Signup failed: ' + (result.errors ? result.errors[0].message : 'Unknown error'));
          }
        } catch (err) {
          console.error(err);
          alert('Error signing up');
        }
      };
    

    return(
        <form onSubmit={handleSubmit}>
      <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" required />
      <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
      <select name="usertype" value={formData.usertype} onChange={handleChange}>
        <option value="user">User</option>
        <option value="mover">Mover</option>
      </select>
      <button type="submit">Sign Up</button>
     
    </form>
    )
}

export default RegistrationComponent;