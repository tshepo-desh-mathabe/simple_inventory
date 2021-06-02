package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.Continent;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.ContinentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContinentService {

    @Autowired
    ContinentRepository continentRepository;

    public ResponseEntity<?> createContinent(Continent continent) {

        if (continentRepository.existsByName(continent.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Continent " 
                    + continent.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        } 
        else if ( continent.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Continent name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        continentRepository.save(continent);
        return ResponseEntity.ok(new ApiResponse(true, "Continent saved successfully"));
    }

    public ResponseEntity<?> retrieveContinents() {
        return ResponseEntity.ok(continentRepository.findAll());
    }
    
    
    public ResponseEntity<?> getOneContinent(Long id) {
        return ResponseEntity.ok(continentRepository.findById(id));
    }

    public ResponseEntity<?> updateContinent(Continent continent) {

        if (continentRepository.existsByName(continent.getName()) ) {
            return new ResponseEntity(new ApiResponse(false, "Continent " 
                    + continent.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( continent.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Continent name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        continentRepository.save(continent);
        return ResponseEntity.ok(new ApiResponse(true, "Continent updated successfully"));
    }

    public ResponseEntity<?> deleteContinent(Long id) {

        if ( !continentRepository.existsById(id) ) {
            return new ResponseEntity(new ApiResponse(false, "Continent does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        continentRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Continent deleted successfully"));
    }

}
