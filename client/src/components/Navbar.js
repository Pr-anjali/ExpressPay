import React ,{useContext}from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import logo from "../images/logo4.png";
import {Link} from 'react-router-dom';
import {UserContext} from "../App";

const Navbar = () => {
  const {state,dispatch} = useContext(UserContext);
  const RenderMenu=()=>{
      if(state){
        return(
          <>
          <div class="navbar navbar-light bg-light">
            <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        </div>
          </>
        )
      }
   else{
    return (
      <>
      <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item" nav class="navbar navbar-light bg-light">
          <Link className="nav-link" to="/signup">Registration</Link>
        </li>

      </>
    )
   }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={logo} alt="logo"/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <RenderMenu/>


      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar