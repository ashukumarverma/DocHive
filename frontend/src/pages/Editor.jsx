import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../api/document";
import io from "socket.io-client";

const Editor = () => {
  const socket = io("http://localhost:5000");

  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const message = location.state?.message;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocumentById(documentId);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
      } catch (error) {
        setError("Failed to fetch document");
        console.log(error);
      }
    };
    fetchDocument();
  }, [documentId]);

  useEffect(() => {
    socket.emit("join-document", documentId);
    socket.on("reieveUpdate", (updatedData) => {
      if (updatedData.title) {
        setTitle(updatedData.title);
      }
      if (updatedData.content) {
        setContent(updatedData.content);
      }
    });
    socket.on("recieveUpdatedContent", (updatedContent) => {
      setContent(updatedContent);
    });
    return () => {
      socket.disconnect();
    };
  }, [documentId, socket]);

  const handleUpdate = async () => {
    try {
      await updateDocument(documentId, { title, content });
      socket.emit("update-document", { documentId, title, content });
      setSuccessMessage("Document updated successfully");
      navigate("/document/${documentId}");
    } catch (error) {
      setError("Failed to update document");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(documentId);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to delete document");
      console.log(error);
    }
  };

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  if (!document) {
    return <div className="container mt-4 alert alert-info">Loading... </div>;
  }

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="form-group">
        <label className="" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            socket.emit("documentUpdate", {
              documentId: documentId,
              title: e.target.value,
              content,
            });
          }}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="form-control"
          rows="5"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            socket.emit("documentUpdate", {
              documentId: documentId,
              title,
              content: e.target.value,
            });
          }}
        />

        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}

        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Document
          </button>
          <button className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
