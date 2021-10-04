/**
 * this is where all routes to the events are going to.
 * we going to use axios. (npm install axios)
 * 1. call all evenst - limit the number of events per page 
 */
// import axios
import axios from "axios";
// create a client-api(connect to the api)
const apiClient = axios.create({
    baseURL:"https://my-json-server.typicode.com/tuckerserwadda/real-world-vue-db",
    withCredentials: false,
    headers:{
        Accept:"application/json",
        'Content-Type':'application/json'
    }
})
// add the api calls(methods). these should be exported to the vuex store
export default{
    // get all events(get method)
    getEvents(){
        return apiClient.get("/events")
    }

}
