import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import navbar_logo from "../../Images/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

import '../templates/Navbar.css'


function Navbar() {
  const [click, setClick] = useState(false);
   const [button, setButton] = useState(true);
   const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          
		  <div className="navbar-logo" onClick={closeMobileMenu}>
        <Link to='/home'>
          <img src={navbar_logo} alt="logo"/>	
        </Link>
 		  </div>

		   {/*Toggle between mobile menu (bars) icon to close icon*/}
          <div className='menu-icon' onClick={handleClick}>
			  {click ? <CloseIcon /> : <MenuIcon /> }
          </div>

		  {/*Mobile menu disappears when clicked*/}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/orders'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/logout'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>

            
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


