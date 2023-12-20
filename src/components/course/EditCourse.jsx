import React, {useEffect, useState} from "react";
import {getCourseById, updateCourse} from "../utils/ApiFunctions.js";
import {Link, useParams} from "react-router-dom";
import CourseTypeSelector from "../common/CourseTypeSelector.jsx";


    const EditCourse = () => {
        const[course, setCourse] = useState({
            photo: null,
            courseType: "",
            coursePrice: ""
        })

        const[imagePreview, setImagePreview] = useState("")
        const[successMessage,setSuccessMessage] = useState("")
        const[errorMessage,setErrorMessage] = useState("")
        const {courseId} = useParams()

        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0]
            setCourse({...course, photo: selectedImage})
            setImagePreview(URL.createObjectURL(selectedImage))
        }

        const handleInputChange = (event) => {
            const {name, value} = event.target
            setCourse({...course, [name]: value})
        }

        useEffect(()=>{
            const fetchCourse = async () =>{
                try {
                    const courseData = await getCourseById(courseId)
                    setCourse(courseData)
                    setImagePreview(courseData.photo)
                }catch (error){
                    console.error(error)
                }
            }
            fetchCourse()
        }, [courseId])
        const handleSubmit = async (event) => {
            event.preventDefault()

            try {
                const response = await updateCourse(courseId, course)
                if(response.status === 200){
                    setSuccessMessage("Course updated successfully")
                    const updatedCourseData = await getCourseById(courseId)
                    setCourse(updatedCourseData)
                    setImagePreview(updatedCourseData.photo)
                    setErrorMessage("")
                }else{
                    setErrorMessage("Error updating course")
                }
            }catch (error){
                console.error(error)
                setErrorMessage(error.message)
            }
        }



        return (
                <div className="container, mt-5 mb-5">
                    <h2 className="mt-5 mb-2">Edit Course</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            {successMessage && (
                                <div className="alert alert-success fade show">
                                    {successMessage}
                                </div>
                            )}

                            {errorMessage && (
                                <div className="alert alert-danger fade show">
                                    {errorMessage}
                                </div>
                            )}


                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="courseType" className="form-label">Course Type</label>
                                    <input className="form-control"
                                           required
                                           id="courseType"
                                           name="courseType"
                                           type="text"
                                           value={course.courseType}
                                           onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="coursePrice" className="form-label">Course Price</label>
                                    <input className="form-control"
                                           required
                                           id="coursePrice"
                                           name="coursePrice"
                                           type="number"
                                           value={course.coursePrice}
                                           onChange={handleInputChange}/>
                                    <div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label hotel-color"> Course Photo</label>
                                    <input
                                        required
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        className="form-control"
                                        onChange={handleImageChange}
                                    />
                                    {imagePreview && (
                                        <img src={`data:image/jpeg;base64, ${imagePreview}`}
                                             alt="Preview Room Photo"
                                             style={{maxWidth: "400px", maxHeight: "400px"}}
                                             className="mt-3"/>
                                    )}
                                </div>

                                <div className="d-grid d-md-flex mt-2">
                                    <Link to={"/existing-courses"} className="btn btn-outline-info ml-5">
                                        Back
                                    </Link>
                                    <button type="submit" className="btn btn-outline-warning">Edit Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }

    export default EditCourse