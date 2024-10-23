package com.brownfield.pssbrownfield.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

import com.brownfield.pssbrownfield.Entity.Flight;

public interface FlightRepository extends CrudRepository<Flight,Integer>{

    public List<Flight> findByFlightTravelDateAndOriginAndDestination(LocalDate flightTravelDate,String origin,String destination);
    public Flight findByFlightId(int flightId);
}
