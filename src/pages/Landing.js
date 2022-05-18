import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.main``;

function Landing() {
  return (
    <Wrapper>
      <h1>Landing Page</h1>
      <Link to="/register" className="button ">
        Login/Register
      </Link>
    </Wrapper>
  );
}

export default Landing;
