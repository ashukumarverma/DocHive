import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DocumentForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create new document
      await axiosInstance.post("/documents", { title, content });
      setMessage("Document created successfully!");
      onClose();
    } catch (error) {
      console.error("Error in Creating the document:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="position-absolute top-50 start-50 translate-middle w-75">
        <div className="container-fluid w-100 p-5 bg-light shadow-lg rounded">
          <h2>Create New Document</h2>
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
            {message && <div className="alert alert-success">{message}</div>}
            <div className="mt-2 d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!title || !content}
                onClick={() => {
                  handleSubmit();
                  navigate("/dashboard");
                }}
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-dark"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

DocumentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DocumentForm;
