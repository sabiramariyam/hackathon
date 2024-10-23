package com.brownfield.pssbrownfield.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="passenger")
public class Passenger {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="passengerId")
        private int passengerId;
        private String firstName;
        private String lastName;
        private int age;
        private String gender;
        private String email;
        private String phoneNumber;
        @JsonIgnore
        @ManyToOne
        //@JoinColumn(name="id")
        private Ticket tickets;
       
	
    }