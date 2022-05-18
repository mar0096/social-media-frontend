import React from "react";
import { Link } from "react-router-dom";
function Error() {
  return (
    <>
      <h1>404</h1>
      <Link to="/" className="btn btn-hero">
        Back home
      </Link>
    </>
  );
}

export default Error;
