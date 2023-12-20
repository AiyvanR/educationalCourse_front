import React, {useEffect, useState} from "react";
import {getAllCourses} from "../utils/ApiFunctions.js";
import {Link} from "react-router-dom";
import {Card, Carousel, Col, Container, Row} from "react-bootstrap";

const CourseSlider = () => {
    const[courses,setCourses] = useState([{id:"", courseType: "", coursePrice: "",photo: ""}])
    const[errorMessage,setErrorMessage] = useState("")
    const[isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        getAllCourses().then((data)=>{
            setCourses(data);
            setIsLoading(false)
        }).catch((error)=>{
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <div className="mt-5">Loading Courses</div>
    }

    if(errorMessage){
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>
    }
    return(
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-courses"} className='hotel-color text-center'>
                Browse All Courses
            </Link>

            <Container>
                <Carousel indicators={false}>

                    {[...Array(Math.ceil(courses.length/4))].map((_,index)=>(
                        <Carousel.Item key={index}>
                            <Row>
                                {courses.slice(index*4,index*4+4).map((course)=>(
                                    <Col key={course.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-course/${course.id}`}>
                                                <Card.Img
                                                variant={"top"}
                                                src={`data:image/png;base64, ${course.photo}`}
                                                alt="Course Photo"
                                                className="w-100"
                                                style={{height: "200px"}}
                                                />
                                            </Link>

                                            <Card.Body>
                                                <Card.Title className="hotel-color" >{course.courseType}</Card.Title>
                                                <Card.Title className="course-price" >{course.coursePrice} $</Card.Title>
                                            <div className="flex-shrink-0 mt-3 ">
                                                <Link to={`book-course/${course.id}`} className='btn btn-hotel btn-sm'>
                                                    Book Now
                                                </Link>
                                            </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                        ))}
                </Carousel>
            </Container>
        </section>
    )
}

export  default  CourseSlider