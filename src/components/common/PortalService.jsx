import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "./Header.jsx";
import {FaCalendar, FaCar, FaClock, FaRegCalendar, FaWifi} from "react-icons/fa";
import CourseCard from "../course/CourseCard.jsx";


const PortalService= () => {

    return(
        <>
            <Container className="mb-2">
                <Header title={"Our Specialists"}/>

                <Row>
                    <h4 className="text-center">
                        The Best IT Specialists of <span className='hotel-color'>Educational Portal</span>
                        <br/>
                        <span className="gap-2">
                            <FaClock/> - 24-Hour Help with your issues
                        </span>
                    </h4>
                </Row>
                <hr/>

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi/> Wi-Fi
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCar/> Mobility
                                </Card.Title>

                                <Card.Text>
                                    Study Online or Offline
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCalendar/> Comfortable study time
                                </Card.Title>

                                <Card.Text>
                                    Book the days you`re comfortable to study
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </Container>
        </>
    )
}

export default PortalService