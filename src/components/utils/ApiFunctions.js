import axios from "axios";

export const api = axios.create({
        baseURL: "http://localhost:8080"
    })

export async function addCourse(photo,courseType,coursePrice){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("courseType", courseType)
    formData.append("coursePrice", coursePrice)

    const response = await api.post("/courses/add/new-course", formData)
    if(response.status === 201 ){
        return true
    }else {
        return false
    }
}

export async function getCourseTypes(){
    try{
        const response = await api.get("/courses/course/types")
        return response.data;
    }catch (error){
        throw new Error("Error fetching course types")
    }
}


export async function getAllCourses(){
    try {
        const result = await api.get("/courses/all-courses")
        return result.data;
    }catch (error){
        throw new Error("Error fetching courses");
    }
}


export async function deleteCourse(courseId){
    try {
        const result = await api.delete(`/courses/delete/course/${courseId}`)
        return result.data
    }catch (error){
        throw new Error(`Error deleting course ${error.message}`)
    }
}


export async function updateCourse(courseId,courseData){
    const formData = new FormData()
    formData.append("courseType", courseData.courseType)
    formData.append("coursePrice", courseData.coursePrice)
    formData.append("photo", courseData.photo)

    const response = await api.put(`/courses/update/${courseId}`, formData)
    return response
}


export async function getCourseById(courseId){
    try {
        const result = await api.get(`/courses/course/${courseId}`)
        return result.data
    }catch (error){
        throw new Error(`Error fetching course ${error.message}`)
    }
}

export async function bookCourse(courseId, booking){
    try {
        const response = await api.post(`/bookings/course/${courseId}/booking`, booking)
        return response.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data);
        }else {
            throw new Error(`Error booking course : ${error.message}`)
        }
    }
}

export async function getAllBookings(){
    try {
        const result = await api.get(`/bookings/all-bookings`)
        return result.data
    }catch (error){
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error find booking: ${error.message}`)
        }
    }
}

export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data;
    }catch (error){
        throw new Error(`Error deleting booking: ${error.message}`)
    }
}