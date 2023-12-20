import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import AddCourse from "./components/course/AddCourse.jsx";
import CoursePaginator from "./components/common/CoursePaginator.jsx";
import ExistingCourses from "./components/course/ExistingCourses.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EditCourse from "./components/course/EditCourse.jsx";
import Home from "./components/home/Home.jsx";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import CourseListing from "./components/course/CourseListing.jsx";
import Admin from "./components/admin/Admin.jsx";
import Checkout from "./components/bookings/Checkout.jsx";
import BookingSuccess from "./components/bookings/BookingSuccess.jsx";

function App() {
  return (
    <>
      <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/edit-course/:courseId" element={<EditCourse/>}/>
            <Route path="/existing-courses" element={<ExistingCourses/>}/>
            <Route path="/add-course" element={<AddCourse/>}/>
            <Route path="/browse-all-courses" element={<CourseListing/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/book-course/:courseId" element={<Checkout/>}/>
            <Route path="/booking-success" element={<BookingSuccess/>}/>
          </Routes>
        </Router>
      <Footer/>
      </main>
    </>
  )
}

export default App
