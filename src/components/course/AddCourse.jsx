import React, {useState} from "react";
import {addCourse} from "../utils/ApiFunctions.js";
import CourseTypeSelector from "../common/CourseTypeSelector.jsx";
import {Link} from "react-router-dom";


const AddCourse = () => {
    const[newCourse, setNewCourse] = useState({
        photo: null,
        courseType: "",
        coursePrice: ""
    })

    const[imagePreview, setImagePreview] = useState("")
    const[successMessage,setSuccessMessage] = useState("")
    const[errorMessage,setErrorMessage] = useState("")

    const handleCourseInputChange  = (e) =>{
        const name = e.target.name;
        let value  = e.target.value;
        if(name === "coursePrice"){
            if(!isNaN(value)) {
                value = parseInt(value)
            }else {
                value = ""
            }
        }
        setNewCourse({...newCourse, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewCourse({...newCourse, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const success = await addCourse(newCourse.photo, newCourse.courseType,newCourse.coursePrice)
            if(success !== undefined){
                setSuccessMessage("A New Course was added successfully")
                setNewCourse({photo: null, courseType: "", coursePrice: ""})
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error Adding Course")
            }
        }catch (error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }


    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Course</h2>

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
                                <div>
                                    <CourseTypeSelector handleCourseInputChange={handleCourseInputChange} newCourse={newCourse} />
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="coursePrice" className="form-label">Course Price</label>
                                <input className="form-control"
                                       required
                                       id="coursePrice"
                                       name="coursePrice"
                                       type="number"
                                       value={newCourse.coursePrice}
                                       onChange={handleCourseInputChange}/>
                                <div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label"> Course Photo</label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview}
                                         alt="Preview Room Photo"
                                         style={{maxWidth: "400px", maxHeight: "400px"}}
                                         className="mb-3"/>
                                )}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <Link to={'/existing-courses'} className='btn btn-outline-info'>Back</Link>
                                <button className="btn btn-outline-primary ml-5">
                                    Save Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddCourse