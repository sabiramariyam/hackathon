package com.brownfield.pssbrownfield.service;

import java.time.LocalDate;
import java.util.List;
import com.brownfield.pssbrownfield.Entity.Flight;

public interface FlightService {
    public List<Flight> getSearchDetails(LocalDate flightTravelDate,String origin,String destination);
    public Flight getFlightById(int flightId);
    public double getFare(int flightId,String classType);
    public List<Flight> getAllFlights();
    public boolean addFlights(Flight flight);
    public boolean deleteFlight(int id);
    public boolean updateFlight(Flight flight, int id);
    

    
}
