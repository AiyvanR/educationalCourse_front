import React from "react";
import {Card, CardHeader, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const CourseCard = ({course}) => {
    return(
        <Col key={course.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/book-course/${course.id}`} className='btn btn-hotel btn-sm'>
                        <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${course.photo}`}
                        alt="Course Photo"
                        style={{width:"100%", maxWidth: "200px", maxHeight: "auto"}}/>
                        </Link>
                    </div>

                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color" >{course.courseType}</Card.Title>
                        <Card.Title className="course-price" >{course.coursePrice} $</Card.Title>
                        <Card.Text>Some course information goes here for guest to read</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3 ">
                        <Link to={`/book-course/${course.id}`} className='btn btn-hotel btn-sm'>
                            Book Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CourseCard