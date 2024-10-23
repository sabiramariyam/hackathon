package com.brownfield.pssbrownfield.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.brownfield.pssbrownfield.Entity.Passenger;
import com.brownfield.pssbrownfield.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.brownfield.pssbrownfield.Entity.Flight;
import com.brownfield.pssbrownfield.Entity.Ticket;
import com.brownfield.pssbrownfield.Entity.User;
import com.brownfield.pssbrownfield.repository.BookingRepository;
import com.brownfield.pssbrownfield.repository.FlightRepository;
import com.brownfield.pssbrownfield.repository.UserRepository;

@Component
public class BookingServiceImpl implements BookingService{

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    FlightRepository flightRepository;

    @Autowired
    FlightService flightService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PassengerRepository passengerRepo;

    @Override
    public boolean checkSeatAvailability(int flightId, int seatsRequired, String classType) {
        Flight flight = flightRepository.findById(flightId).get();
       
        if(flight != null) {
            //economy class
            if(classType.equalsIgnoreCase("Economy")){
                if(flight.getRemainingEconomySeats() < seatsRequired)
                    return false;
                else
                    return true;
            }
            //business class
            if(classType.equalsIgnoreCase("Business")){
                if(flight.getRemainingBusinessSeats() < seatsRequired)
                    return false;
                else
                    return true;
            }
            //premium class
            if(classType.equalsIgnoreCase("Premium")){
                if(flight.getRemainingPremiumSeats() < seatsRequired)
                    return false;
                else
                    return true;
            }
        }
        return false;
    }

    @Override
    public boolean bookTicket(Ticket ticket, String username,List<Passenger> passenger) {
        if(updateSeat(ticket.getFlight().getFlightId(), ticket.getCount(), ticket.getSeatClass()))
        {
           User user = userRepository.findById(ticket.getUser().getId()).get();
            if (user == null) {
            throw new RuntimeException("User does not exist!");
        }
            try
		{
            double cost = flightService
            .getFare(ticket.getFlight().getFlightId(),ticket.getSeatClass()) * ticket.getCount();
            ticket.setReservationDate(new Date());
            ticket.setTicketNumber(UUID.randomUUID().toString());
            ticket.setPrice(cost);
           passengerRepo.saveAll(passenger);

            //passengerRepo.saveAll(ticket.getPassenger());
            ticket.setPassenger(ticket.getPassenger());

            ticket.setUser(user);

            //passengerRepo.saveAll(passenger);

			bookingRepository.save(ticket);


			return true;
		}
		catch(RuntimeException e)
		{
            System.out.print(e);
			return false;
            
		}
        }
        else
            return false;
    }


    @Override
    public boolean cancelTicket(int ticketId) {
        try{
        Ticket ticket = bookingRepository.findById(ticketId).get();
        
        Flight flight = flightRepository.findById(ticket.getFlight().getFlightId()).get();
        //update seats
        if(bookingRepository.findById(ticketId) != null){
            if(flight != null) {
                String classType = ticket.getSeatClass();
                int seats = ticket.getCount();
                if(classType.equalsIgnoreCase("Economy"))
                    flight.setRemainingEconomySeats(flight.getRemainingEconomySeats() + seats);
                //business class
                if(classType.equalsIgnoreCase("Business"))
                    flight.setRemainingBusinessSeats(flight.getRemainingBusinessSeats() + seats);
                //premium class
                if(classType.equalsIgnoreCase("Premium"))
                    flight.setRemainingPremiumSeats(flight.getRemainingPremiumSeats() + seats);
                //update seats in flight
                flightRepository.save(flight);
            }
            bookingRepository.deleteById(ticketId);
            return true;
        }
    }
        catch(RuntimeException e){
        return false;
        }
        return false;
    }
       

    @Override
    public boolean updateSeat(int flightMasterId, int seat, String classType) {
         Flight flight = flightRepository.findById(flightMasterId).get();
        int availableSeats = 0;
        if (classType.equalsIgnoreCase("Economy")) {
            availableSeats = flight.getRemainingEconomySeats();
        } else if (classType.equalsIgnoreCase("Business")) {
            availableSeats = flight.getRemainingBusinessSeats();
        }
        else if (classType.equalsIgnoreCase("Premium")) {
            availableSeats = flight.getRemainingPremiumSeats();
        }

        if (availableSeats < seat) {
            throw new IllegalArgumentException("Not enough seats available");
        }

        if (classType.equalsIgnoreCase("Economy")) {
            flight.setRemainingEconomySeats(availableSeats - seat);
        } else if (classType.equalsIgnoreCase("Business")) {
            flight.setRemainingBusinessSeats(availableSeats - seat);
        }
        else if (classType.equalsIgnoreCase("Premium")) {
            flight.setRemainingPremiumSeats(availableSeats - seat);
        }

        flightRepository.save(flight);
    return true;
    }

    @Override
    public Ticket getBooking(int ticketId){
        try{
        return   bookingRepository.findById(ticketId).get();
        }catch(RuntimeException e){
            return null;
        }
    
        
    }

    @Override
    public List<Ticket> getAllTicketsOfUser(String username) {
        User user = userRepository.findByUsername(username).get();
        if (user == null) {
            throw new RuntimeException("User does not exist!");
        }

        return (List<Ticket>) bookingRepository.findByUserId(user.getId());
    }
    
}
