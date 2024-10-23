package com.brownfield.pssbrownfield.repository;

import org.springframework.data.repository.CrudRepository;

import com.brownfield.pssbrownfield.Entity.Fare;

public interface FareRepository extends CrudRepository<Fare,Integer>{

    public Fare  findByFlightFlightId(int flightId);
    
}
