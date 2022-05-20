import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navbar_logo from "../../Images/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
   const [button, setButton] = useState(true);

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
          {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            E-Commerce
            <i class='fab fa-typo3' />
          </Link> */}
		  <div className="navbar-logo" onClick={closeMobileMenu}>
        <Link to='/'>
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
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            {/* <li className='nav-item'>
              <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                Users
              </Link>
            </li> */}

            <li className='nav-item'>
              <Link
                to='/register'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


