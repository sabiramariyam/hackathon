package com.brownfield.pssbrownfield.controller;


import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.brownfield.pssbrownfield.Entity.Fare;
import com.brownfield.pssbrownfield.Entity.Ticket;
import com.brownfield.pssbrownfield.repository.FareRepository;
import com.brownfield.pssbrownfield.service.BookingService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/checkin")
public class CheckInController {

    @Autowired
    BookingService bookingService;

    @Autowired
    FareRepository fareRepository;



    @PostMapping("/checkin/{ticketId}")
    //@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<HttpStatus> checkIn(@PathVariable int ticketId){
        Ticket ticket = bookingService.getBooking(ticketId);
        Date oldDate = java.sql.Date.valueOf(ticket.getFlight().getFlightTravelDate());
        boolean date = before24Hours(oldDate);
        
        if(date)
            return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED );
        else {
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
        
        
    }

    

    @PostMapping("/addfare")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Fare> addFare(@RequestBody Fare fare){
        return new ResponseEntity<>(fareRepository.save(fare),HttpStatus.CREATED);
    }



    public boolean before24Hours(Date oldDate) {
        Date newDate = new Date();
        long diff = Math.abs(newDate.getTime() - oldDate.getTime());
        return (int) (TimeUnit.MILLISECONDS.toDays(diff)) <= 1;
    }
    



    
}
