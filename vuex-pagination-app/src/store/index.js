/**
 * this is our global store
 * import the events services 
 * set actions and mutations  
 */
import { createStore } from "vuex";
// import events services from the services
import Eventservices from "../services/Eventservices";
export default createStore({
  state: {
    events:[],
  },
  mutations: {
    SET_EVENTS(state, events){
      state.events= events
    }
  },
  // fetch the events
  actions: {
    fetchEvents({commit}){
      Eventservices.getEvents()
      .then(Response=>{
        commit("SET_EVENTS",Response.data)
      })
      .catch(()=>{
        return "nothing is feteched"
      })
    }
  },
  modules: {},
});
