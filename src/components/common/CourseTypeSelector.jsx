import React, {useEffect, useState} from "react";
import {getCourseTypes} from "../utils/ApiFunctions.js";



const CourseTypeSelector = ({handleCourseInputChange, newCourse}) => {
    const[courseTypes,setCourseTypes] = useState([""])
    const[showNewCourseTypeInput, setShowNewCourseTypeInput] = useState(false)
    const[newCourseType,setNewCourseType] = useState("")

    useEffect(()=>{
        getCourseTypes().then((data) => {
            console.log(data);
            setCourseTypes(data)
        })
    }, [])


    const handleNewCourseTypeInputChange = (e) => {
        setNewCourseType(e.target.value);
    }

    const handleAddNewCourseType = () => {
        if(newCourseType !== ""){
            setCourseTypes([...courseTypes, newCourseType])
            setNewCourseType("")
            setShowNewCourseTypeInput(false)
        }
    }

    return(
        <>
            {courseTypes.length > 0 && (
                <div>
                    <select
                        className="form-select mb-3"
                    id="courseType"
                    name="courseType"
                    value={newCourse.courseType}
                    onChange={(e) =>{
                        if(e.target.value === "Add New"){
                            setShowNewCourseTypeInput(true)
                        }else {
                            handleCourseInputChange(e)
                        }
                    }}>

                        <option value={""}>select a course type</option>
                        <option value={"Add New"}>Add New</option>

                        {courseTypes.map((type,index) =>(
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewCourseTypeInput && (
                        <div className="input-group">
                            <input
                            className="form-control"
                            type="text"
                            placeholder="Enter a new Course type"
                            onChange={handleNewCourseTypeInputChange}
                            />
                        <button className="btn btn-hotel" type='button' onClick={handleAddNewCourseType}>
                            Add
                        </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default CourseTypeSelector