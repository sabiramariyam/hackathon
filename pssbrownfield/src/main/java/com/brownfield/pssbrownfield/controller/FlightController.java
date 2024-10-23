package com.brownfield.pssbrownfield.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brownfield.pssbrownfield.Entity.Flight;
import com.brownfield.pssbrownfield.service.FlightService;



@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/flight")
public class FlightController {

    @Autowired
    FlightService flightService;

    @GetMapping("/{flightId}")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ResponseEntity<Flight> getFlightById(@PathVariable int flightId){
        if(flightService.getFlightById(flightId)!=null)
            return new ResponseEntity<> (flightService.getFlightById(flightId),HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
   
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER') ")
    public ResponseEntity<List<Flight>> getFlightsDetails() {
        if(flightService.getAllFlights().isEmpty()==false)
            return new ResponseEntity<>(flightService.getAllFlights(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{flightTravelDate}/{origin}/{destination}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<List<Flight>> getSearch(@PathVariable String flightTravelDate,@PathVariable String origin,@PathVariable String destination){
         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
          LocalDate localDate = LocalDate.parse(flightTravelDate, formatter);

        if(flightService.getSearchDetails(localDate, origin, destination).isEmpty()==false)
            return new ResponseEntity<>(flightService.getSearchDetails(localDate, origin, destination),HttpStatus.OK);
        else 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(path="/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> addNewFlight(@RequestBody Flight flight){
        boolean result = flightService.addFlights(flight);
        if(result)
           return new ResponseEntity<>(HttpStatus.CREATED);
        else
           return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
    }
    
    @DeleteMapping("/{id}")
   // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteFlight(@PathVariable int id) {
         boolean result = flightService.deleteFlight(id);
         if(result)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
         else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{flightId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> editFlight(@RequestBody Flight flight,@PathVariable int flightId){
        boolean result = flightService.updateFlight(flight,flightId);
        if(result)
        return new ResponseEntity<>(HttpStatus.OK);
        else
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
   
    
}
