package com.brownfield.pssbrownfield.controller;

import com.brownfield.pssbrownfield.Entity.Passenger;
import com.brownfield.pssbrownfield.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PassengerController {

    @Autowired
    PassengerService passengerService;
    @PostMapping("/passengers")
    public ResponseEntity<HttpStatus> addPassenger(@RequestBody List<Passenger> passenger) {
        // Save the passenger to the database or perform some other operation
        boolean result = passengerService.addPassengers(passenger);
        if(result)
            return new ResponseEntity<>(HttpStatus.CREATED);
        else
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);

    }
}
