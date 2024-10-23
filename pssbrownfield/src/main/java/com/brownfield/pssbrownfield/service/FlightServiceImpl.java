package com.brownfield.pssbrownfield.service;

import java.time.LocalDate;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.brownfield.pssbrownfield.Entity.Flight;
import com.brownfield.pssbrownfield.repository.FlightRepository;

@Component
public class FlightServiceImpl implements FlightService {

    @Autowired
    FlightRepository flightRepository;

    @Override
    public List<Flight> getSearchDetails(LocalDate flightTravelDate, String origin, String destination) {

        return flightRepository.findByFlightTravelDateAndOriginAndDestination(flightTravelDate,origin,destination);
    }

    @Override
    public Flight getFlightById(int flightId) {
        try{
            return flightRepository.findById(flightId).get();

        }catch(RuntimeException e){
            return null;
        }
    }

    
     @Override
    public double getFare(int flightId, String classType) {

         Flight flight = flightRepository.findByFlightId(flightId);
        if(classType.equalsIgnoreCase("economy")){
            return flight.getFare().getEconomyClass();
        }
        else if(classType.equalsIgnoreCase("premium")){
            return flight.getFare().getPremiumClass();
        }
        else {
            return flight.getFare().getBusinessClass();
        }
    
    }

    @Override
    public List<Flight> getAllFlights() {
        
        return (List<Flight>) flightRepository.findAll();
    }

    @Override
    public boolean addFlights(Flight flight) {
        try{
             flightRepository.save(flight);
             return true;

    }catch(RuntimeException e){
        return false;
    }
        
        
    }

    @Override
    public boolean deleteFlight(int id) {
        try
		{
            Flight flight  = flightRepository.findById(id).get();
            if(flight!=null){
                flightRepository.deleteById(id);
                return true;
		}
        }
		catch(RuntimeException e)
		{
			return false;
		} 
        return false;

    }

    @Override
    public boolean updateFlight(Flight flight, int id) {
        try{
            Flight f = flightRepository.findById(id).get();
            f.setArrivalTime(flight.getArrivalTime());
            f.setDepartureTime(flight.getDepartureTime());
            f.setFlightTravelDate(flight.getFlightTravelDate());
            f.setRemainingBusinessSeats(flight.getRemainingBusinessSeats());
            f.setRemainingEconomySeats(flight.getRemainingEconomySeats());
            f.setRemainingPremiumSeats(flight.getRemainingPremiumSeats());
            flightRepository.save(f);
            return true;
        }catch(RuntimeException e){
            return false;
        }
        
    }

   
    
}

