import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import home_image1 from "../../Images/home-image1.svg"
import home_image_steps from "../../Images/home-page-steps.svg"

import 'bootstrap/dist/css/bootstrap.css';

import './Home.css';


const Home = (props) => {

  const navigate = useNavigate();
  useEffect(() => {
  })
  useEffect(() => {
    console.log("hello")
  })
  return (

    <div>
      <div className="home-page-container">

        <div className="blob-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0474F4" d="M43.8,-51.6C57.4,-40.8,69.4,-27.6,71.7,-12.9C74,1.8,66.6,18,58.6,35.8C50.7,53.6,42.2,73,27.2,81.1C12.3,89.3,-8.9,86.2,-27.9,78.5C-46.8,70.8,-63.4,58.5,-69.5,42.7C-75.6,26.9,-71.2,7.6,-68.4,-12.7C-65.5,-32.9,-64.3,-54,-53.2,-65.3C-42,-76.5,-21,-77.9,-3,-74.3C15.1,-70.8,30.2,-62.4,43.8,-51.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="home-page-element">
          <h1>Welcome to <strong className="text-primary">E-Commerce!</strong></h1>
          <p>We offer a wide selection of products</p>


          <a href="/register" className="btn btn-outline-primary">Get Started</a>

          {/* <Button variant="outlined" color="primary">Get Started</Button> */}

        </div>

        <div className="home-page-element">

          <img src={home_image1} className="home-img1" alt="home image" />

        </div>


      </div>

      <div className="home-page-container container2">


        <div className="home-page-element">

          <img src={home_image_steps} className="home-img2" alt="home image" />

        </div>

        <div className="home-page-element">

          <div className="steps">

            <div className="home-heading">
              <h1>Easy To <strong className="text-primary">Get Started</strong></h1>

            </div>

            <div className="numbers">
              <div>
                <h1>01</h1>
              </div>

              <div>
                <h4>Register</h4>
                <h5>Create an account with us.</h5>
              </div>

            </div>

            <div className="numbers">
              <div>
                <h1>02</h1>
              </div>

              <div>
                <h4>Browse</h4>
                <h5>Shop our vast selection of products.</h5>
              </div>

            </div>

            <div className="numbers">
              <div>
                <h1>03</h1>
              </div>

              <div>
                <h4>Buy</h4>
                <h5>Purchase your chosen product and enjoy the benefits.</h5>
              </div>

            </div>

          </div>


        </div>

        <div className="blob-right">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0474F4" d="M43.8,-51.6C57.4,-40.8,69.4,-27.6,71.7,-12.9C74,1.8,66.6,18,58.6,35.8C50.7,53.6,42.2,73,27.2,81.1C12.3,89.3,-8.9,86.2,-27.9,78.5C-46.8,70.8,-63.4,58.5,-69.5,42.7C-75.6,26.9,-71.2,7.6,-68.4,-12.7C-65.5,-32.9,-64.3,-54,-53.2,-65.3C-42,-76.5,-21,-77.9,-3,-74.3C15.1,-70.8,30.2,-62.4,43.8,-51.6Z" transform="translate(100 100)" />
          </svg>
        </div>


      </div>

    </div>


  );
};

export default Home;


