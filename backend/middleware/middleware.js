import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from the header

  // console.log("Token received:", token); // Log the token for debugging
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // No token error
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret key
    // console.log("Decoded Token:", decoded); // Log the decoded token for debugging
    req.user = { id: decoded.userId }; // Attach user ID to request object
    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" }); // Invalid token error
  }
};

export default verifyToken;