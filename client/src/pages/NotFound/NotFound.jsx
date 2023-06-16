import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>404! NotFound</div>
      <div>
        Go to <Link to={"/"}>Home</Link>
      </div>
    </>
  );
}

export default NotFound;
