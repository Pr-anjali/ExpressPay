import React, { createContext, useReducer } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Chatbot from "./components/Chatbot"
import About from "./components/About"
import Rewards from "./components/Rewards"
import Converter from "./components/Converter"
import Contact from "./components/Contact"
import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import NewsItems from './components/NewsItems'
import News from './components/News'
import Stock from './components/Stock'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errorpage from './components/Errorpage'
import Logout from "./components/Authentication/Logout";
import Points from "./components/Points";
import Cashback from "./components/Cashback";
import Offer from "./components/Offer";
import Referral from './components/Referral'
import Payments from './components/Payment';
import Erupi from './components/Erupi'
import ScratchCard from './components/Scratch';
import GiftCard from './components/GiftCards';
import Transactionhistory from './components/Transactionhistory';


const App = () => {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/erupi' element={<Erupi/>}></Route>
      <Route exact path='/rewards' element={<Rewards/>}></Route>
      <Route exact path='/converter' element={<Converter/>}></Route>
      <Route exact path='/news' element={<News/>}></Route>
      <Route exact path='/stock' element={<Stock/>}></Route>
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
      <Route exact path='/payment' element={<Payments/>}></Route>
      <Route exact path='/points/Scratch' element={<ScratchCard/>}></Route>
      <Route exact path='/points/GiftCards' element={<GiftCard/>}></Route>
      <Route exact path='/transactionhistory' element={<Transactionhistory/>}></Route>
      
      </Routes>
    </BrowserRouter>
    <Chatbot/>
    </>
  )
}

export default App