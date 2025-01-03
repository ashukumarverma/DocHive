import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getDocumentById,
  updateDocument,
  deleteDocument,
  getSharedDocument,
  shareDocument,
} from "../api/document";

const Editor = () => {
  const { documentId, sharedId } = useParams();
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [shareableLink, setShareableLink] = useState(null);

  const location = useLocation();
  const message = location.state?.message;

  const navigate = useNavigate();

  useEffect(() => {
    if (!documentId) {
      return;
    }
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
    if (!sharedId) {
      return;
    }
    const fetchSharedDocument = async () => {
      try {
        const doc = await getSharedDocument(sharedId);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
      } catch (error) {
        setError("Failed to fetch shared document");
        console.log(error);
      }
    };
    fetchSharedDocument();
  }, [sharedId]);

  const handleUpdate = async () => {
    try {
      await updateDocument(documentId || sharedId, { title, content });
      setSuccessMessage("Document updated successfully");
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

  const handleShare = async () => {
    try {
      const response = await shareDocument(documentId);
      setShareableLink(response.shareUrl);
      console.log(response.shareUrl + "from share button");
    } catch (error) {
      setError("Failed to share document");
      console.log(error);
    }
  };
  useEffect(() => {
    if (successMessage !== "") {
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    }
  }, [successMessage]);

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  if (!document) {
    return <div className="container mt-4 alert alert-info">Loading... </div>;
  }

  return (
    <div className="container mt-4 d-fle">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="form-group d-flex gap-2 item-align-center">
        <label className="my-auto" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          className="btn btn-danger"
          onClick={() => {
            handleUpdate;
            navigate(`/dashboard`);
          }}
        >
          Close
        </button>
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
          }}
        />

        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}

        <div className="mt-3 d-flex">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Document
          </button>
          {!sharedId && (
            <div className="d-flex gap-2">
              <button className="btn btn-danger ms-2" onClick={handleDelete}>
                Delete Document
              </button>
              <button className="btn btn-primary ms-2" onClick={handleShare}>
                Share Document
              </button>
            </div>
          )}
          {shareableLink && (
            <button
              className="btn btn-dark ms-2"
              onClick={() => {
                setSuccessMessage("Link copied to clipboard");
                navigator.clipboard.writeText(shareableLink);
              }}
            >
              Copy Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
