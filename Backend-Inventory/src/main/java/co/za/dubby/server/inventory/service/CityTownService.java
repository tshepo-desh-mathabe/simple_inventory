package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.CityTown;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.CityTownRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CityTownService {
    
    @Autowired
    CityTownRepository cityTownRepository;

    public ResponseEntity<?> createCityTown(CityTown cityTown) {

        if (cityTownRepository.existsByName(cityTown.getName())) {
            return new ResponseEntity(new ApiResponse(false, "City/Town " 
                    + cityTown.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( cityTown.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( cityTown.getProvince() == null ) {
            return new ResponseEntity(new ApiResponse(false, "Province required!"),
                    HttpStatus.BAD_REQUEST);
        }
        cityTownRepository.save(cityTown);
        return ResponseEntity.ok(new ApiResponse(true, "City/Town saved successfully"));
    }

    public ResponseEntity<?> retrieveCityTowns() {
        return ResponseEntity.ok(cityTownRepository.findAll());
    }
    
    public ResponseEntity<?> getOneCityTown(Long id) {
        return ResponseEntity.ok(cityTownRepository.findById(id));
    }

    public ResponseEntity<?> retrieveCityTownsByProvinceId(Long id) {
        
        List<CityTown> cityTowns = cityTownRepository.findByProvinceId(id);
        if (cityTowns.isEmpty()) {
            return new ResponseEntity(new ApiResponse(false, "No cities/towns available for this province!\n"
                    + "Create cities/towns for this province..."), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(cityTowns);
    }
    
    public ResponseEntity<?> updateCityTown(CityTown cityTown) {

        if (cityTownRepository.existsByName(cityTown.getName()) ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town " 
                    + cityTown.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( cityTown.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( cityTown.getProvince() == null ) {
            return new ResponseEntity(new ApiResponse(false, "Province required!"),
                    HttpStatus.BAD_REQUEST);
        }
        cityTownRepository.save(cityTown);
        return ResponseEntity.ok(new ApiResponse(true, "City/Town updated successfully"));
    }
    
    public ResponseEntity<?> deleteCityTown(Long id) {

        if ( !cityTownRepository.existsById(id) ) {
            return new ResponseEntity(new ApiResponse(false, "City/Town does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        cityTownRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "City/Town deleted successfully"));
    }
}