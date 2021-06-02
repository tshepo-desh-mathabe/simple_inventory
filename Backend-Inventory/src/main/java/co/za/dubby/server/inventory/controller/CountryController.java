package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.Country;
import co.za.dubby.server.inventory.service.CountryService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/country")
public class CountryController {
    
    @Autowired
    CountryService countryService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveCountry(@Valid @RequestBody Country country) {
        return countryService.createCountry(country);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editCountry(@Valid @RequestBody Country country) {
        return countryService.updateCountry(country);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllCountry() {
        return countryService.retrieveCountries();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCountryById(@Valid @PathVariable("id") Long id) {
        return countryService.getOneCountry(id);
    }
    
    @GetMapping("/get/countries-by-continent/{id}")
    public ResponseEntity<?> getCountriesByContinentId(@Valid @PathVariable("id") Long id) {
        return countryService.retrieveCountriesByContinentId(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCountryById(@Valid @PathVariable("id") Long id) {
        return countryService.deleteCountry(id);
    }    
}
