package com.brownfield.pssbrownfield.service;


import com.brownfield.pssbrownfield.Entity.Passenger;
import com.brownfield.pssbrownfield.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {

    @Autowired
    PassengerRepository passengerRepo;

    public boolean addPassengers(List<Passenger> passenger) {
        try {
            passengerRepo.saveAll(passenger);
            return true;

        } catch (RuntimeException e) {
            return false;
        }
    }
}
