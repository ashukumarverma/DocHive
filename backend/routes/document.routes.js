import { Router } from "express";
import Document from "../models/document.models.js";
import verifyToken from "../middleware/middleware.js";

const router = Router();
// all documents for logged in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id }); // find all documents by owner id
    const allDocuments = await Document.find(); // find all documents
    res.json(documents, allDocuments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single document by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id); // find document by id
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (document.owner.toString() !== req.user.id) {
      // check if the document belongs to the logged in user
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(document);
  } catch (error) {
    console.log("error in fetching document", error);
    res.status(500).json({ message: error.message });
  }
});

// create a new document
router.post("/", verifyToken, async (req, res) => {
  const { title, content } = req.body; // get title and content from request body
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const newDocument = new Document({
      title,
      content,
      owner: req.user.id,
    });
    const savedDocument = await newDocument.save(); // save document
    res.json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a document
router.put("/:id", verifyToken, async (req, res) => {
  const { title, content } = req.body; // get title and content from request body
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a document
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id); // find document by id and delete
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
