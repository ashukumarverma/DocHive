import PropTypes from "prop-types";

const DocCard = ({ title, content, createdAt }) => {
  return (
    <div className="card" style={{ width: "18rem", height: "16rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{content}</h6>
      </div>
      <div className="position-absolute bottom-0 p-3">
        <p className="card-text">created at : {createdAt}</p>
        <button className="card-link btn btn-outline-dark">Edit</button>
        <button className="card-link btn btn-outline-danger">Delete</button>
      </div>
    </div>
  );
};

DocCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};

export default DocCard;
