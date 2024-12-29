import express from "express";
import Document from "../models/document.models.js";
import verifyToken from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const { query } = req.query; // Extract the search query from the query parameters

  // if (!query) {
  //   return res.status(400).json({ message: "Search query is required" });
  // }

  try {
    const documents = await Document.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Search by title (case-insensitive)
        { content: { $regex: query, $options: "i" } }, // Search by content (case-insensitive)
      ],
      owner: req.user.id, // Ensure the documents belong to the logged-in user
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
