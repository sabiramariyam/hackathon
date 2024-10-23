package com.brownfield.pssbrownfield.Entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
@Table(name="fare")
public class Fare {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="fareId")
	private int fareId;
 
    @NotNull
	private double businessClass;
    @NotNull
	private double economyClass;
    @NotNull
	private double premiumClass;


	@OneToOne
	@JoinColumn(name="flightId")
	private Flight flight;


	public int getFareId() {
		return fareId;
	}


	public void setFareId(int fareId) {
		this.fareId = fareId;
	}


	public double getBusinessClass() {
		return businessClass;
	}


	public void setBusinessClass(double businessClass) {
		this.businessClass = businessClass;
	}


	public double getEconomyClass() {
		return economyClass;
	}


	public void setEconomyClass(double economyClass) {
		this.economyClass = economyClass;
	}


	public double getPremiumClass() {
		return premiumClass;
	}


	public void setPremiumClass(double premiumClass) {
		this.premiumClass = premiumClass;
	}


	public Flight getFlight() {
		return flight;
	}


	public void setFlight(Flight flight) {
		this.flight = flight;
	}



}