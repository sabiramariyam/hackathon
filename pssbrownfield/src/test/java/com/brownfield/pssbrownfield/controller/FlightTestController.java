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

public class FlightTestController {

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost/api/flight/" ;
        port = 8082;
    }

    @Test
    public void test_addNewFlight() throws IOException {

        byte[] input = Files.readAllBytes(Paths.get(".\\jsonfiles\\test2_flightData.json"));
        String inputVal = new String(input);
        given()
                .contentType(ContentType.JSON)
                .body(inputVal).when() .post("/add")
                .then().statusCode(201).log().all();
    }

    @Test
    public void successTest_getFlightById() {

        given().when()
               .pathParam("flightId",5)
                .get("/{flightId}")
               .then()
               .statusCode(200);
    }

    @Test
    public void failureTest_getFlightById() {
        given()
                .when().pathParam("flightId",2)
                .get("/{flightId}")
                .then()
                .statusCode(404);
    }

    @Test
    public void successTest_getFlightBySearchDetails() {

         given()
                .when().pathParam("flightTravelDate","2023-01-06")
                .pathParam("origin","delhi").pathParam("destination","mumbai")
                .get("/{flightTravelDate}/{origin}/{destination}")
                .then()
                .log().all()
                .statusCode(200);

    }


    @Test
    public void failureTest_getFlightBySearchDetails() {

       given()
                .when().pathParam("flightTravelDate","2023-01-06")
                .pathParam("origin","delhi")
                .pathParam("destination","mumbai")
                .get("/{flightTravelDate}/{origin}/{destination}")
                .then()
                .log().all()
                .statusCode(404);

    }

    @Test
    public void successTest_verifyGetFlightDetails() {

        given()
                .when()
                .get("/all")
                .then()
                .log().all()
                .statusCode(200);

    }

    @Test
    public void failureTest_verifyGetFlightDetails() {

         given()
                .when()
                .get("/all")
                .then()
                .log().all()
                .statusCode(404);

    }

    @Test
    public void successTest_deleteFlight(){

        given()
                .contentType(ContentType.JSON)
                .when()
                .pathParam("id",8)
                .delete("/{id}")
                .then().statusCode(204).log().all();
    }

    @Test
    public void failureTest_deleteFlight(){


        given()
                .when()
                .delete("/{id}")
                .then().statusCode(404).log().all();
    }
}
