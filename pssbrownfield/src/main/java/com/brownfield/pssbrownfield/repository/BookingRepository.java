package com.brownfield.pssbrownfield.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.brownfield.pssbrownfield.Entity.Ticket;

public interface BookingRepository extends CrudRepository<Ticket,Integer>{

    List<Ticket> findByUserId(int i);
    
}
