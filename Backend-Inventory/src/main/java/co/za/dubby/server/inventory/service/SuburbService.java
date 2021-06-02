package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.Suburb;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.SuburbRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SuburbService {
    
    @Autowired
    SuburbRepository suburbRepository;

    public ResponseEntity<?> createSuburb(Suburb suburb) {

        if (suburbRepository.existsByName(suburb.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Suburb " 
                    + suburb.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( suburb.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Suburb name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( suburb.getCityTown() == null ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town required!"),
                    HttpStatus.BAD_REQUEST);
        }
        suburbRepository.save(suburb);
        return ResponseEntity.ok(new ApiResponse(true, "Suburb saved successfully"));
    }

    public ResponseEntity<?> retrieveSuburbs() {
        return ResponseEntity.ok(suburbRepository.findAll());
    }
    
    public ResponseEntity<?> getOneSuburb(Long id) {
        return ResponseEntity.ok(suburbRepository.findById(id));
    }
    
    public ResponseEntity<?> retrieveSuburbsByCityTownId(Long id) {
        
        List<Suburb> suburbs = suburbRepository.findByCityTownId(id);
        if (suburbs.isEmpty()) {
            return new ResponseEntity(new ApiResponse(false, "No suburbs available for this city/town!\n"
                    + "Create suburbs for this city/town..."), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(suburbs);
    }

    public ResponseEntity<?> updateSuburb(Suburb suburb) {

        if (suburbRepository.existsByName(suburb.getName()) ) {
            return new ResponseEntity(new ApiResponse(false, "Suburb " 
                    + suburb.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( suburb.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Suburb name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( suburb.getCityTown() == null ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town required!"),
                    HttpStatus.BAD_REQUEST);
        }
        suburbRepository.save(suburb);
        return ResponseEntity.ok(new ApiResponse(true, "Suburb updated successfully"));
    }

    public ResponseEntity<?> deleteSuburb(Long id) {

        if ( !suburbRepository.existsById(id) ) {
            return new ResponseEntity(new ApiResponse(false, "Suburb does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        suburbRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Suburb deleted successfully"));
    }
}