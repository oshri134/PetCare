import React from "react";
import "./About.css";
import pic1 from '../../image/itay.png'
import pic2 from '../../image/asher.png'
import Navbar from "../Navbar/Navbar";
function About() {
  return (
    <div className="photos">
      <Navbar />
      <img src={pic1} className="itay" alt="" />
      <img src={pic2} className="asher" alt="" />
      <div className="about_u">
        <div className="about_box">
          <header>About us</header>
          <p>Hello everyone!!<br />
            We want to share with you and tell you<br />
            about us The developers of the PetCare website,We are software engineering students at Ariel University.<br />
            The languages ​​we used are React, CSS & HTML,JS and Node.js.<br />
            For any problem and question<br />
            We will be happy to help you!<br />
            Yours <br />
            Asher Shkori & Itay Harel
          </p>
        </div>
      </div>
    </div>

  );
}

export default About;
