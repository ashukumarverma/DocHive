import { motion } from "framer-motion";

const LandingPage = () => {
  // Neon blink animation for the heading
  const neonVariants = {
    hidden: { opacity: 0.8 },
    visible: { opacity: 1 },
  };

  return (
    <div className="container text-center mt-5 position-relative">
      {/* Floating background elements */}
      <motion.div
        className="position-absolute top-0 start-0"
        style={{ zIndex: -1 }}
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
          alt="Pen Icon"
          style={{ width: "100px", opacity: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="position-absolute top-50 end-0"
        style={{ zIndex: -1 }}
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921160.png"
          alt="Notebook Icon"
          style={{ width: "120px", opacity: 0.2 }}
        />
      </motion.div>

      {/* Jumbotron Section */}
      <div className="jumbotron p-5">
        <motion.h1
          className="display-4 text-primary"
          variants={neonVariants}
          initial="hidden"
          animate="visible"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut",
          }}
        >
          Welcome to DocHive
        </motion.h1>
        <p className="lead">
          DocHive is your go-to platform for seamless real-time collaboration.
          Work together on documents, share ideas, and communicate effortlessly
          with your team.
        </p>
        <hr className="my-4" />
        <p>
          Whether you&apos;re working on a team project or just need to organize
          your thoughts, DocHive offers all the features you need to stay
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
