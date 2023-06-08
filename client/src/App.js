import React, { createContext, useReducer } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Rewards from "./components/Rewards"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import NewsItems from './components/NewsItems'
import News from './components/News'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errorpage from './components/Errorpage'
import Logout from "./components/Logout";
import Points from "./components/Points";
import Cashback from "./components/Cashback";
import Offer from "./components/Offer";
import { initialState,reducer } from '../src/reducer/UseReducer'
import Referral from './components/Referral'

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
      <Route exact path='/rewards' element={<Rewards/>}></Route>
      <Route exact path='/news' element={<News/>}></Route>
      <Route exact path='/newsitems' element={<NewsItems/>}></Route>
      <Route exact path='/offer' element={<Offer/>}></Route>
      <Route exact path='/cashback' element={<Cashback/>}></Route>
      <Route exact path='/points' element={<Points/>}></Route>
      <Route exact path='/referral' element={<Referral/>}></Route>
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