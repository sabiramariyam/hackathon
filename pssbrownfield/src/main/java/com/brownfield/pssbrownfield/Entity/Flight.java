package com.brownfield.pssbrownfield.Entity;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
@Table(name="flight")
public class Flight {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="flightId")
    private int flightId;  

	@NotNull
	private LocalTime arrivalTime;
	@NotNull
	private LocalTime departureTime;
	
	@NotNull
	private String origin;
	@NotNull
	private LocalDate flightTravelDate;
	@NotNull
	private String destination;
	@NotNull
	private String flightName;

	@NotNull
	private int remainingBusinessSeats;
	@NotNull
	private int remainingEconomySeats;
	@NotNull
	private int remainingPremiumSeats;

	//bi-directional many-to-one association to Booking

	@JsonIgnore
	@OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<Ticket> tickets;


	@JsonIgnore
	@OneToOne(mappedBy="flight",cascade=CascadeType.ALL)
	private Fare fare;


	public int getFlightId() {
		return flightId;
	}


	public void setFlightId(int flightId) {
		this.flightId = flightId;
	}


	


	public LocalTime getArrivalTime() {
		return arrivalTime;
	}


	public void setArrivalTime(LocalTime arrivalTime) {
		this.arrivalTime = arrivalTime;
	}


	public LocalTime getDepartureTime() {
		return departureTime;
	}


	public void setDepartureTime(LocalTime departureTime) {
		this.departureTime = departureTime;
	}


	public String getOrigin() {
		return origin;
	}


	public void setOrigin(String origin) {
		this.origin = origin;
	}


	public LocalDate getFlightTravelDate() {
		return flightTravelDate;
	}


	public void setFlightTravelDate(LocalDate flightTravelDate) {
		this.flightTravelDate = flightTravelDate;
	}


	public String getDestination() {
		return destination;
	}


	public void setDestination(String destination) {
		this.destination = destination;
	}


	public int getRemainingBusinessSeats() {
		return remainingBusinessSeats;
	}


	public void setRemainingBusinessSeats(int remainingBusinessSeats) {
		this.remainingBusinessSeats = remainingBusinessSeats;
	}


	public int getRemainingEconomySeats() {
		return remainingEconomySeats;
	}


	public void setRemainingEconomySeats(int remainingEconomySeats) {
		this.remainingEconomySeats = remainingEconomySeats;
	}


	public int getRemainingPremiumSeats() {
		return remainingPremiumSeats;
	}


	public void setRemainingPremiumSeats(int remainingPremiumSeats) {
		this.remainingPremiumSeats = remainingPremiumSeats;
	}


	public String getFlightName() {
		return flightName;
	}


	public void setFlightName(String flightName) {
		this.flightName = flightName;
	}


	public List<Ticket> getTickets() {
		return tickets;
	}


	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}


	public Fare getFare() {
		return fare;
	}


	public void setFare(Fare fare) {
		this.fare = fare;
	}

	
	
 


}