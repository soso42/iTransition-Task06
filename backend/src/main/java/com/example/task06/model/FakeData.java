package com.example.task06.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FakeData {

    private List<String> firstName;
    private List<String> lastName;
    private List<String> idNumber;
    private List<String> address;
    private List<String> phone;

}

