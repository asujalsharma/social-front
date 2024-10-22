import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NavBar.css';  // Assuming you have a separate CSS file for styling

const Navbar = () => {
  const [loggedin,setLoggedin] = useState(false);

useEffect(()=>{
  const token =localStorage.getItem("token");
  if(token){
    setLoggedin(true);
  }
},[])

  return (
    <nav className="navbar">
      <Link to="/" className="logo">BrandName</Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        {loggedin?( <li><Link to="/adminlogin" onClick={()=>{setLoggedin(false);
        localStorage.removeItem("token");
        
        }}>logOut</Link></li>):( <li><Link to="/adminlogin">login</Link></li>)}
       
       
      </ul>
    </nav>
  );
};

export default Navbar;
