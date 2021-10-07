/**
 * this is our global store
 * import the events services 
 * set actions and mutations  
 */
import { createReturnStatement } from "@vue/compiler-core";
import { format } from "core-js/core/date";
import { check } from "prettier";
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
    }, 
    DELETE_EVENT(state, id){
      let events =  state.events.filter(event => event.id !=id )
      state.events = events
    },
    EDIT_EVENT(state,event){
      let eventIndex = state.events.findIndex((e,i) =>{
        if(e.id == event.id){
          return i
        }
      })
      state.events[eventIndex] = event

    },
    ADD_EVENT(state, event) {
      state.events.unshift(event)
    }
},

  // fetch the events
  actions: {
    // fectch events from the api
    fetchEvents({commit}){
      Eventservices.getEvents()
      .then(Response=>{
        commit("SET_EVENTS",Response.data)
      })
      .catch(()=>{
        return "nothing is feteched"
      })
    },
    // delete event from the api 
    deleteEvent({commit}, event){
      Eventservices.deleteEvent(event.id)
      commit("DELETE_EVENT", event.id)
    },
    // edit the event 
    editEvent({commit}, event){
      Eventservices.editEvent(event)
      .then(resp =>{
        commit("EDIT_EVENT", resp.data)
      })
      .catch(()=>{
        return "something went wrong item not saved"
      })
     
    },
    // add new event
    addEvent({commit}, event){
      Eventservices.addEvent(event)
      .then(resp =>{
        commit("ADD_EVENT", resp.data)
      })
      .catch(()=>{
        return "something went wrong new item not saved"
      })
    }


},
  modules: {},
});
