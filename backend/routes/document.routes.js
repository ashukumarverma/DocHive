import { Router } from "express";
import Document from "../models/document.models.js"; // Import Document model
import verifyToken from "../middleware/middleware.js"; // Import the token verification middleware

const router = Router();

// Get all documents for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  console.log("User in request:", req.user); // Check if user is attached to the request

  try {
    // Fetch documents where owner matches the logged-in user
    const documents = await Document.find({ owner: req.user.id });
    res.json(documents); // Respond with the documents found
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single document by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" }); // Document not found error
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" }); // Check if document belongs to user
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new document
router.post("/", verifyToken, async (req, res) => {
  const { title, content } = req.body; // Get title and content from the request body

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" }); // Check if title and content are provided
  }
  try {
    const newDocument = new Document({
      title,
      content,
      owner: req.user.id, // Assign the logged-in user as the owner
    });
    const savedDocument = await newDocument.save();
    res.json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a document
router.put("/:id", verifyToken, async (req, res) => {
  const { title, content } = req.body; // Get updated title and content

  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // Return the updated document
    );
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a document
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
