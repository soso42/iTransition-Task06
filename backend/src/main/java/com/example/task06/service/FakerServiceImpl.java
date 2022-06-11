package com.example.task06.service;

import com.example.task06.model.FakeData;
import com.github.javafaker.Faker;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FakerServiceImpl implements FakerService {


    @Override
    public Map<String, FakeData> getAllData() {
        Map<String, FakeData> dataByCountries = new HashMap<>();
        dataByCountries.put("us", getDataByCountry("en-US"));
        dataByCountries.put("es", getDataByCountry("es-ES"));
        dataByCountries.put("de", getDataByCountry("de-DE"));
        return dataByCountries;
    }

    private FakeData getDataByCountry(String locale) {
        Random random = new Random(1);
        Faker faker = new Faker(new Locale(locale), random);
        FakeData fakeData = new FakeData();
        fakeData.setFirstName(getListOfFirstNames(faker));
        fakeData.setLastName(getListOfLastNames(faker));
        fakeData.setIdNumber(getListOfIdNumbers(faker));
        fakeData.setAddress(getListOfAddresses(faker));
        fakeData.setPhone(getListOfPhones(faker));
        return fakeData;
    }

    private List<String> getListOfFirstNames(Faker faker) {
        List<String> firstNames = new ArrayList<>();
        for (int i = 0; i < 500; i++) {
            firstNames.add(faker.name().firstName());
        }
        return firstNames;
    }

    private List<String> getListOfLastNames(Faker faker) {
        List<String> lastNames = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            lastNames.add(faker.name().lastName());
        }
        return lastNames;
    }

    private List<String> getListOfIdNumbers(Faker faker) {
        List<String> idNumbers = new ArrayList<>();
        for (int i = 0; i < 700; i++) {
            idNumbers.add(faker.idNumber().valid());
        }
        return idNumbers;
    }

    private List<String> getListOfAddresses(Faker faker) {
        List<String> addresses = new ArrayList<>();
        for (int i = 0; i < 700; i++) {
            addresses.add(faker.address().fullAddress());
        }
        return addresses;
    }

    private List<String> getListOfPhones(Faker faker) {
        List<String> phones = new ArrayList<>();
        for (int i = 0; i < 700; i++) {
            phones.add(faker.phoneNumber().cellPhone());
        }
        return phones;
    }

}
