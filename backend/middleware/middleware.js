import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", ""); // Get token from header
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Set user to decoded token
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" }); 
  }
};

export default verifyToken;