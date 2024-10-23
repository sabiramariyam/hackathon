package com.brownfield.pssbrownfield.controller;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.jayway.restassured.RestAssured.given;

public class CheckinTestController {

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost/checkin/";
        RestAssured.port = 8082;
    }

    @Test
    public void successTest_addFare() throws IOException {

        byte[] input = Files.readAllBytes(Paths.get(".\\jsonfiles\\test3_fareData.json"));
        String inputVal = new String(input);

        given()
                .contentType(ContentType.JSON)
                .body(inputVal)
                .when()
                .post("/addfare")
                .then().statusCode(201).log().all();

    }
    @Test
    public void successTest_checkIn() throws IOException {

        given()
                .contentType(ContentType.JSON)
                .when()
                .pathParam("ticketId",3)
                .post("/{ticketId}")
                .then().statusCode(202).log().all();

    }

}
