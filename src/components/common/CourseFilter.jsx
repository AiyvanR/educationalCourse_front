import React, {useState} from "react";


const CourseFilter = ({data, setFilteredData}) => {
    const[filter, setFilter] = useState("")

    const handleSelectChange = (e) =>{
        const selectedCourseType = e.target.value
        setFilter(selectedCourseType)
        const filteredCourses = data.filter((course) =>
            course.courseType.toLowerCase()
                .includes(selectedCourseType.toLowerCase()))
        setFilteredData(filteredCourses)
    }
    const clearFilter = () =>{
        setFilter("")
        setFilteredData(data)
    }

    const courseTypes = ["", ...new Set(data.map((course) => course.courseType))]

    return(
        <div className="input-group mb-3">
            <span className="input-group-text" id="course-type-filter">
                Filter courses by type
            </span>

            <select
            className="form-select"
            value={filter}
            onChange={handleSelectChange}>
                <option value={""}>
                    select a course type to filter...
                </option>

                {courseTypes.map((type,index)=> (
                    <option key={index} value={String(type)}>{String(type)}</option>
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
        </div>
    )
}

export default CourseFilter;