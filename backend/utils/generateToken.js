import jwt from "jsonwebtoken";

const genereateToken= async(res,userId)=>{
  console.log(userId);
  const token = jwt.sign({ userId }, 'ss', {
    expiresIn: '30d'
  });
  
  // Set JWT as HTTP-only cookie with appropriate options
 await res.cookie('jwt', token, {
    httpOnly: true, // Set to true to prevent client-side access to the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies (HTTPS)
    sameSite: 'lax', // Set to 'lax' for better compatibility, but you might need to adjust based on your requirements
    maxAge: 30 * 24 * 60 * 60 * 1000 // Set cookie expiration time (30 days in milliseconds)
  });
}

export default genereateToken;