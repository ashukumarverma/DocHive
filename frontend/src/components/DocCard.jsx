import PropTypes from "prop-types";

const DocCard = ({ title, content, createdAt }) => {
  return (
    <div className="card" style={{ width: "18rem", height: "13rem" }}>
      <div className="card-body overflow-hidden" style={{ maxHeight: "10rem" }}>
        <h5 className="card-title">{title}</h5>
        {/* Render HTML content */}
        <p
          className="card-subtitle mb-2 text-body-secondary"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="position-absolute bottom-0 px-3 pb-2">
        <p className="card-text text-muted" style={{ fontSize: "15px" }}>
          created on : {new Date(createdAt).toLocaleDateString()} at{" "}
          {new Date(createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
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
