import React, {useEffect, useState} from "react";
import {getAllCourses} from "../utils/ApiFunctions.js";
import CourseCard from "./CourseCard.jsx";
import {Col, Container, Row} from "react-bootstrap";
import CourseFilter from "../common/CourseFilter.jsx";
import CoursePaginator from "../common/CoursePaginator.jsx";

    const Course = () => {
        const[data,setData] = useState([])
        const[error,setError] = useState(null)
        const [isLoading,setIsLoading] = useState(false)
        const [currentPage,setCurrentPage] = useState(1)
        const [coursesPerPage] = useState(6)
        const[filteredData,setFilteredData] = useState([{id:""}])

        useEffect(()=>{
            setIsLoading(true)
            getAllCourses().then((data) =>{
                setData(data)
                setFilteredData(data)
                setIsLoading(false)
            }).catch((error)=>{
                setError(error.message)
                setIsLoading(false)
            })
        }, [])

        if(isLoading){
            return <div>Loading Courses.....</div>
        }
        if(error){
            return <div className="text-danger">Error : {error}</div>
        }

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber)
        }

        const totalPages = Math.ceil(filteredData.length/ coursesPerPage)

        const renderCourses = () => {
            const startIndex = (currentPage-1)*coursesPerPage
            const endIndex = startIndex+coursesPerPage
            return filteredData.slice(startIndex, endIndex).map((course) =>
                <CourseCard key={course.id} course={course}/>)
        }
        return (
            <Container>
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <CourseFilter data={data} setFilteredData={setFilteredData}/>
                    </Col>

                    <Col md={6} className="d-flex align-items-center justify-content-end">
                        <CoursePaginator currentPage={currentPage} totalPages={totalPages}
                                         onPageChange={handlePageChange}/>
                    </Col>
                </Row>
                <Row>
                    {renderCourses()}
                </Row>

                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-end">
                        <CoursePaginator currentPage={currentPage} totalPages={totalPages}
                                         onPageChange={handlePageChange}/>
                    </Col>
                </Row>
            </Container>
        )
    }

    export default Course