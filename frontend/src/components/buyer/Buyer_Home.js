import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buyer_image from "../../Images/buyer_landing_page.svg"

import 'bootstrap/dist/css/bootstrap.css';

// import '../common/Home.css';
import './Buyer_Home.css';


const Buyer_Home = (props) => {

  const navigate = useNavigate();
  
  let userID = ""
  const [user, setUser] = useState("")
  useEffect(() => {
    userID = localStorage.getItem("USER_ID")

    axios.get('http://localhost:4000/user/' + userID)
      .then(response => {
        // console.log(response.data)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  return (

    <div>
      <div className="home-page-container">

        <div className="blob-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0474F4" d="M43.8,-51.6C57.4,-40.8,69.4,-27.6,71.7,-12.9C74,1.8,66.6,18,58.6,35.8C50.7,53.6,42.2,73,27.2,81.1C12.3,89.3,-8.9,86.2,-27.9,78.5C-46.8,70.8,-63.4,58.5,-69.5,42.7C-75.6,26.9,-71.2,7.6,-68.4,-12.7C-65.5,-32.9,-64.3,-54,-53.2,-65.3C-42,-76.5,-21,-77.9,-3,-74.3C15.1,-70.8,30.2,-62.4,43.8,-51.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="home-page-element">
          <h1>Welcome, <strong className="text-primary">{user.name} !</strong> </h1>
          <p>Explore our wide variety of Products</p>

          <a href="/products" className="btn btn-outline-primary">Shop Now</a>

        </div>

        <div className="home-page-element">

          <img src={buyer_image} className="home-img1" alt="home image" />

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

export default Buyer_Home;








// import { useState, useEffect } from "react";

// const Home = (props) => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     setName("Buyer");
//   }, []);

//   return <div style={{ textAlign: "center" }}>Welcome - {name}</div>;
// };

// export default Home;