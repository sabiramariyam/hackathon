package com.brownfield.pssbrownfield.controller;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.jayway.restassured.RestAssured.given;
import static com.jayway.restassured.RestAssured.port;


public class BookingTestController {

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost/api/booking/";
        port = 8082;
    }

    @Test
    public void verifyBooking() throws IOException {

        byte[] input = Files.readAllBytes(Paths.get(".\\jsonfiles\\test1_booking.json"));
        String inputVal = new String(input);

        given()
                .contentType(ContentType.JSON)
                .body(inputVal)
                .when()
                .post("/completebooking")
                .then().statusCode(201).log().all();
    }

    @Test
    public void successTest_GetTickets() {

        RestAssured.given().when().get("/tickets").then().statusCode(200);
    }


    @Test
    public void successTest_cancelBooking(){

        given()
                .contentType(ContentType.JSON)
                .when()
                .pathParam("bookingId",2)
                .delete("/cancelBooking/{bookingId}")
                .then().statusCode(204).log().all();
    }

    @Test
    public void failureTest_cancelBooking(){

        given()
                .contentType(ContentType.JSON)
                .when()
                .pathParam("bookingId",2)
                .delete("/cancelBooking/{bookingId}")
                .then().statusCode(417).log().all();
    }
}
