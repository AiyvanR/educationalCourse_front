import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    let today = new Date();

    return (
        <footer className="bg-dark text-light py-3 footer mt-lg-5">
            <Container>
                <Row>
                    <Col xs={12} md={12} className="text-center">
                        <p>&copy; {today.getFullYear()} Educational Courses Portal</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer