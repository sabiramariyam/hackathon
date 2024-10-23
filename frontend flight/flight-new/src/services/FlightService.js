

import axios from "axios";

const API_URL = "http://localhost:8082/api/flight/";

const addflight=(data) =>{
    return axios.post(API_URL + "add", {
        data
      });
}
 
const FlightService={
    addflight

};
export default FlightService;

/*
class FlightService{
    getAll(){
        return http.get("/flight/all");
    }
    
    get(id){
        return http.get(`/flight/${id}`);
    }

    create(data){
        return http.post("/flight/add",data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/flight/${id}`);
    }
    findByOrigin(flightTravelDate,origin,destination){
        return http.get(`/flight/${flightTravelDate}/${origin}/${destination}`);
    }
    
}
export default new FlightService();
*/

