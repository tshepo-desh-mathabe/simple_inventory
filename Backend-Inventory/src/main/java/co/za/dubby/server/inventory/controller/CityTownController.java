package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.CityTown;
import co.za.dubby.server.inventory.service.CityTownService;
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
@RequestMapping("/city-town")
public class CityTownController {
    
    @Autowired
    CityTownService cityTownService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveCityTown(@Valid @RequestBody CityTown cityTown) {
        return cityTownService.createCityTown(cityTown);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editCityTown(@Valid @RequestBody CityTown cityTown) {
        return cityTownService.updateCityTown(cityTown);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllCityTown() {
        return cityTownService.retrieveCityTowns();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCityTownById(@Valid @PathVariable("id") Long id) {
        return cityTownService.getOneCityTown(id);
    }
    
    @GetMapping("/get/city-towns-by-province/{id}")
    public ResponseEntity<?> getCityTownsByProvinceId(@Valid @PathVariable("id") Long id) {
        return cityTownService.retrieveCityTownsByProvinceId(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCityTownById(@Valid @PathVariable("id") Long id) {
        return cityTownService.deleteCityTown(id);
    }
}
