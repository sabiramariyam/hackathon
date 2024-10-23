package com.brownfield.pssbrownfield.service;


import java.util.List;

import com.brownfield.pssbrownfield.Entity.Passenger;
import com.brownfield.pssbrownfield.Entity.Ticket;


public interface BookingService {

    public boolean checkSeatAvailability(int flightId, int seatsRequired, String classType);
	public boolean bookTicket(Ticket ticket,String username,List<Passenger> passengers);
	public boolean cancelTicket(int TicketId);
	public boolean updateSeat(int flightMasterId,int seat,String classType);
	public Ticket getBooking(int TicketId);
	List<Ticket> getAllTicketsOfUser(String username);
	
    
}
