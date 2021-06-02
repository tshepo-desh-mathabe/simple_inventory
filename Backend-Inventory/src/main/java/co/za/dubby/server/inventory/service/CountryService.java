package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.Country;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.CountryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CountryService {

    @Autowired
    CountryRepository countryRepository;

    public ResponseEntity<?> createCountry(Country country) {

        if (countryRepository.existsByName(country.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Country "
                    + country.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        } else if (country.getName().equals("")) {
            return new ResponseEntity(new ApiResponse(false, "Country name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        } else if (country.getContinent() == null) {
            return new ResponseEntity(new ApiResponse(false, "Continent required!"),
                    HttpStatus.BAD_REQUEST);
        }
        countryRepository.save(country);
        return ResponseEntity.ok(new ApiResponse(true, "Country saved successfully"));

    }

    public ResponseEntity<?> retrieveCountries() {
        return ResponseEntity.ok(countryRepository.findAll());
    }
    
    public ResponseEntity<?> getOneCountry(Long id) {
        return ResponseEntity.ok(countryRepository.findById(id));
    }
    
    public ResponseEntity<?> retrieveCountriesByContinentId(Long id) {
        
        List<Country> countries = countryRepository.findByContinentId(id);
        if (countries.isEmpty()) {
            return new ResponseEntity(new ApiResponse(false, "No countries available for this continent!\n"
                    + "Create countries for this continent..."), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(countries);
    }

    public ResponseEntity<?> updateCountry(Country country) {

        if (countryRepository.existsByName(country.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Country "
                    + country.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        } else if (country.getName().equals("")) {
            return new ResponseEntity(new ApiResponse(false, "Country name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        } else if (country.getContinent() == null) {
            return new ResponseEntity(new ApiResponse(false, "Continent required!"),
                    HttpStatus.BAD_REQUEST);
        }
        countryRepository.save(country);
        return ResponseEntity.ok(new ApiResponse(true, "Country updated successfully"));
    }

    public ResponseEntity<?> deleteCountry(Long id) {

        if (!countryRepository.existsById(id)) {
            return new ResponseEntity(new ApiResponse(false, "Country does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        countryRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Country deleted successfully"));
    }
}
