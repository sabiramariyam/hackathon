package com.brownfield.pssbrownfield.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import com.brownfield.pssbrownfield.Entity.Ticket;
import com.brownfield.pssbrownfield.security.services.UserDetailsImpl;
import com.brownfield.pssbrownfield.service.BookingService;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

   @PostMapping("/completebooking")
   @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
   public ResponseEntity<HttpStatus> completeBooking(@RequestBody Ticket  booking){
      // User user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       UserDetailsImpl username= (UserDetailsImpl) auth.getPrincipal();
       Boolean result = bookingService.bookTicket(booking,username.getUsername(),booking.getPassenger());
       if(result){
       // booking.getTicketNumber()
        return new ResponseEntity<>(HttpStatus.CREATED);
    }else{
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

    @GetMapping("/checkseat/{flightId}/{seatsRequired}/{classType}")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> checkSeatsAvailable(@PathVariable int flightId,@PathVariable int seatsRequired,@PathVariable String classType ){
        boolean result = bookingService.checkSeatAvailability(flightId, seatsRequired, classType);
        if(result){
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<HttpStatus>(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @DeleteMapping("/cancelBooking/{bookingId}")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public  ResponseEntity<HttpStatus> cancelBooking(@PathVariable int bookingId){
        Boolean result = bookingService.cancelTicket(bookingId);
        
        if(result){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
           
        }else{
            return new ResponseEntity<HttpStatus>(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @GetMapping("/tickets")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public List<Ticket> getAllCurrentUserTickets() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
        return bookingService.getAllTicketsOfUser(user.getUsername());
    }

    @GetMapping("/tickets/{id}")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public Ticket getTickets(@PathVariable int id){
         return bookingService.getBooking(id);

    }




    

    





    
}
