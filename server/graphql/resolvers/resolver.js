import {User} from "../../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
    Query: {
        async users() {
          // Logic to fetch users from the database
          return await User.find(); // Assuming you're using mongoose
        },
        verifyToken: async (_, __, { headers }) => {
            const token = headers.authorization?.split(' ')[1];
            console.log('token.11.!!',token);
            if (!token) {
                throw new Error('No token provided');
            }
           console.log('headetiken..!!',token)
           console.log('JWT Secret for verification:', process.env.JWT_SECRET); // Log secret

            try {
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                return { valid: true }; // Optionally return user ID
            } catch (err) {
                console.error('Token verification failed:', err.message);
                return { valid: false };
            }
        },
      },
    Mutation: {
        async signup(_, { firstname, lastname, username, email, password, usertype }) {    
          // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            usertype,
          });
          try {
            await newUser.save(); // Save the user to the database
            return true; // Registration successful
          } catch (error) {
            console.error('Registration failed:', error);
            return false; // Registration failed
          }
        },
        async login(_, { email, password }) {
            try {
                // Find user by email
                const user = await User.findOne({ email });
                if (!user) {
                  throw new Error('User not found');
                }
        
                // Compare password with hashed password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                  throw new Error('Invalid credentials');
                }
                 
                // Generate JWT token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('Generated Token:', token); // Log the generated token
                return {
                    token: token
                }; // Return JWT token
              } catch (error) {
                console.error('Login failed:', error);
                throw new Error('Login failed');
              }
          }
      }
     

}