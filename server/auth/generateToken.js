import jwt from 'jsonwebtoken';

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    // Include other user details as needed
  };
  const secret = process.env.JWT_SECRET; // Ensure this environment variable is set
  const options = { expiresIn: '1h' }; // Token expiration time
  return jwt.sign(payload, secret, options);
}
