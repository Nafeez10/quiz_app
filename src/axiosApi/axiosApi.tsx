import axios from "axios";

// This is the base url of the api, in our case this is an api which runs on our 
// local machine by using json-server which is a node package currently it is 
// running on port 4500.

export default axios.create({
    baseURL:'https://quizapp.free.beeceptor.com'
})