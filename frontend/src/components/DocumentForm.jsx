import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import PropTypes from "prop-types";

const DocumentForm = ({ onClose, document }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setContent(document.content);
    }
  }, [document]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (document) {
        // Update document
        await axiosInstance.put(`/documents/${document._id}`, {
          title,
          content,
        });
      } else {
        // Create new document
        await axiosInstance.post("/documents", { title, content });
      }
      onClose();
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100">
      <div className="container-fluid h-custom w-50 p-5 bg-light shadow-lg">
        <h2>{document ? "Edit Document" : "Create Document"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-outline mb-4">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-control form-control-lg"
            />
          </div>
          <div className="mt-2 d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {document ? "Save Changes" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-dark"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DocumentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  document: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default DocumentForm;
