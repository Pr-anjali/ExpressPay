import React, { createContext, useReducer } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errorpage from './components/Errorpage'
import Logout from "./components/Logout";
import { initialState,reducer } from '../src/reducer/UseReducer'

// 1: contextAPI
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/contact' element={<Contact/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='/logout' element={<Logout/>}></Route>
      <Route exact path='*' element={<Errorpage/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  )
}

export default App