const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <div className="jumbotron bg-light p-5">
        <h1 className="display-4">Welcome to DocHive</h1>
        <p className="lead">
          DocHive is your go-to platform for seamless real-time collaboration.
          Work together on documents, share ideas, and communicate effortlessly
          with your team.
        </p>
        <hr className="my-4" />
        <p>
          Whether you&apos;re working on a team project or just need to organize
          your thoughts, CollabTool offers all the features you need to stay
          productive.
        </p>
        <div className="mt-4">
          <a href="/register" className="btn btn-outline-dark btn-lg me-3">
            Register
          </a>
          <a href="/login" className="btn btn-outline-primary btn-lg">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
