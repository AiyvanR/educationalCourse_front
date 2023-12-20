import React, {useEffect, useState} from "react";
import {deleteCourse, getAllCourses} from "../utils/ApiFunctions.js";
import {Col, Row} from "react-bootstrap";
import CourseFilter from "../common/CourseFilter.jsx";
import CoursePaginator from "../common/CoursePaginator.jsx";
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



const ExistingCourses =() => {
    const[courses,setCourses]= useState([])
    const[currentPage,setCurrentPage] = useState(1)
    const[coursePerPage] = useState(8);
    const[isLoading,setIsLoading] = useState(false);
    const[filteredCourses,setFilteredCourses] = useState([])
    const[selectedCourseType,setSelectedCourseType] = useState("")
    const[successMessage,setSuccessMessage] = useState("")
    const[errorMessage,setErrorMessage] = useState("")


    useEffect(()=>{
        fetchCourses()
    }, [])
    const fetchCourses = async () =>{
        setIsLoading(true)
        try {
            const result = await getAllCourses()
            setCourses(result)
            setIsLoading(false)
        }catch (error){
            setErrorMessage(error.message)
        }
    }


    useEffect(() =>{
        if (selectedCourseType === ""){
            setFilteredCourses(courses)
        }else {
            const filtered = courses.filter((course)=> course.courseType === selectedCourseType)
            setFilteredCourses(filtered)
        }
        setCurrentPage(1)
    }, [courses, selectedCourseType])


    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (courseId) =>{
        try{
            const result = await deleteCourse(courseId)
            if(result=== ""){
                setSuccessMessage(`Course Number ${courseId} was deleted`)
                fetchCourses()
            }else {
                console.error(`Error deleting course : ${result.message}`)
            }
        }catch (error){
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredCourses,coursePerPage, courses) => {
        const totalCourses = filteredCourses.length > 0 ? filteredCourses.length: courses.length
        return Math.ceil(totalCourses/coursePerPage)
    }

    const indexOfLastCourse = currentPage * coursePerPage
    const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse,indexOfLastCourse)

    return (
       <>
           <div className="container col-md-8 col-lg-6">
               {successMessage && <p className="alert alert-success mt-5">{successMessage}</p> }
               {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p> }
           </div>

           {isLoading ? (
               <p>Loading existing courses</p>
           ): (
               <>
               <section className="mt-5 mb-5 container">
                   <div className="d-flex justify-content-between mb-3 mt-5">
                    <h2>Existing Courses</h2>
                   </div>

                   <Row>
                   <Col md={6} className="mb-3 mb-md-0">
                       <CourseFilter data={courses} setFilteredData={setFilteredCourses}/>
                   </Col>

                   <Col md={6} className="d-flex justify-content-end">
                       <Link to={'/add-course'}>
                            <FaPlus/> Add New Course
                       </Link>
                   </Col>
                   </Row>

                   <table className="table table-bordered table-hover">
                       <thead>
                       <tr className="text-center">
                           <th>ID</th>
                           <th>Course Type</th>
                           <th>Course Price</th>
                           <th>Actions</th>
                       </tr>
                       </thead>

                       <tbody>
                       {currentCourses.map((course)=>(
                           <tr key={course.id} className="text-center">
                               <td>{course.id}</td>
                               <td>{course.courseType}</td>
                               <td>{course.coursePrice}</td>
                               <td className="gap-2">
                                    <Link to={`/edit-course/${course.id}`}>
                                        <span className="btn btn-info btn-sm">
                                            <FaEye/>
                                        </span>
                                        <span className="btn btn-warning btn-sm">
                                            <FaEdit/>
                                        </span>
                                    </Link>

                                    <button
                                    className="btn btn-danger btn-sm"
                                    onClick={()=> handleDelete(course.id)}>
                                        <FaTrashAlt/></button>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                   </table>

                   <CoursePaginator currentPage={currentPage}
                   totalPages={calculateTotalPages(filteredCourses, coursePerPage, courses)}
                                    onPageChange={handlePaginationClick}
                   />
               </section>
               </>
           )}
       </>
    )
}

export default ExistingCourses