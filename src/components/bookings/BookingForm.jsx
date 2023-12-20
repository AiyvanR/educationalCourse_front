import React, { useEffect } from "react"
import moment from "moment"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookCourse, getCourseById } from "../utils/ApiFunctions"
import { useNavigate, useParams } from "react-router-dom"
import course from "../course/Course.jsx";

const BookingForm = () => {
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [coursePrice, setCoursePrice] = useState(0)


    const [booking, setBooking] = useState({
        studentFullName: "",
        studentEmail: "",
        courseStart: "",
        courseFinish: "",
        numOfStud: ""
    })


    const[courseInfo,setCourseInfo] = useState({
        photo: "",
        courseType: "",
        coursePrice: "",
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }


    const getCoursePriceById = async (courseId) => {
        try {
            const response = await getCourseById(courseId)
            setCoursePrice(response.coursePrice)
        } catch (error) {
            throw new Error(error)
        }
    }
    const {courseId} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getCoursePriceById(courseId)
    }, [courseId])


    const calculatePayment = () => {
        const courseStart = moment(booking.courseStart)
        const courseFinish = moment(booking.courseFinish)
        const diffInDays = courseFinish.diff(courseStart, "days")
        const paymentPerDay = coursePrice ? coursePrice : 0
        return paymentPerDay
    }


    const isCheckOutDateValid = () => {
        if (!moment(booking.courseFinish).isSameOrAfter(moment(booking.courseStart))) {
            setErrorMessage("Course Start must come before Course Finish Date ")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setValidated(true)
    }

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await bookCourse(courseId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Book Course</h4>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="studentFullName" className="hotel-color">
                                        Fullname
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="studentFullName"
                                        name="studentFullName"
                                        value={booking.studentFullName}
                                        placeholder="Enter your fullname"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your fullname.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail" className="hotel-color">
                                        Email
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="studentEmail"
                                        name="studentEmail"
                                        value={booking.studentEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="courseStart" className="hotel-color">
                                                Course Start Date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="courseStart"
                                                name="courseStart"
                                                value={booking.courseStart}
                                                placeholder="course-start-date"
                                                min={moment().format("DD-MM-YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a course start date.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="courseFinish" className="hotel-color">
                                                Course Finish Date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="courseFinish"
                                                name="courseFinish"
                                                value={booking.courseFinish}
                                                placeholder="Course finish date"
                                                min={moment().format("DD MM, YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a course finish date.
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Number of Students</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color">
                                                Number of Students
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfStud"
                                                name="numOfStud"
                                                value={booking.numOfStud}
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select number of student.
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="fom-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleFormSubmit}
                                isFormValid={validated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default BookingForm