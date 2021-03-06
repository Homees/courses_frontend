import axios from 'axios'

const ENDPOINT_URL = "http://localhost:8080/courses";

class CourseDataService {

    static retrieveAllCourses() {
        return axios.get(`${ENDPOINT_URL}/`);
    }

    static retrieveCourse(id) {
        return axios.get(`${ENDPOINT_URL}/${id}`);
    }

    static deleteCourse(id) {
        return axios.delete(`${ENDPOINT_URL}/${id}`);
    }

    static updateCourse(id, course) {
        return axios.put(`${ENDPOINT_URL}/${id}`, course);
    }

    static createCourse(course) {
        return axios.post(`${ENDPOINT_URL}/`, course);
    }
}

export default CourseDataService