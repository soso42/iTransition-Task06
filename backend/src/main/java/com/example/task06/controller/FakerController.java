package com.example.task06.controller;

import com.example.task06.model.FakeData;
import com.example.task06.service.FakerServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class FakerController {

    private final FakerServiceImpl fakerService;

    public FakerController(FakerServiceImpl fakerService) {
        this.fakerService = fakerService;
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String, FakeData>> getDataUsa() {
        return new ResponseEntity<>(fakerService.getAllData(), HttpStatus.OK);
    }

}
