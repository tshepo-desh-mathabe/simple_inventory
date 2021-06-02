package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.Province;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.ProvinceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProvinceService {
    
    @Autowired
    ProvinceRepository provinceRepository;

    public ResponseEntity<?> createProvince(Province province) {

        if (provinceRepository.existsByName(province.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Province " 
                    + province.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( province.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Province name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( province.getCountry() == null ) {
            return new ResponseEntity(new ApiResponse(false, "Country required!"),
                    HttpStatus.BAD_REQUEST);
        }
        provinceRepository.save(province);
        return ResponseEntity.ok(new ApiResponse(true, "Province saved successfully"));
    }

    public ResponseEntity<?> retrieveProvinces() {
        return ResponseEntity.ok(provinceRepository.findAll());
    }
    
    public ResponseEntity<?> getOneProvince(Long id) {
        return ResponseEntity.ok(provinceRepository.findById(id));
    }
    
    public ResponseEntity<?> retrieveProvincesByCountryId(Long id) {
        
        List<Province> provinces = provinceRepository.findByCountryId(id);
        if (provinces.isEmpty()) {
            return new ResponseEntity(new ApiResponse(false, "No provinces available for this country!\n"
                    + "Create provinces for this country..."), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(provinces);
    }

    public ResponseEntity<?> updateProvince(Province province) {

        if (provinceRepository.existsByName(province.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Province " 
                    + province.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( province.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Province name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( province.getCountry() == null ) {
            return new ResponseEntity(new ApiResponse(false, "Country required!"),
                    HttpStatus.BAD_REQUEST);
        }
        provinceRepository.save(province);
        return ResponseEntity.ok(new ApiResponse(true, "Province updated successfully"));
    }

    public ResponseEntity<?> deleteProvince(Long id) {

        if ( !provinceRepository.existsById(id) ) {
            return new ResponseEntity(new ApiResponse(false, "Province does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        provinceRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Province deleted successfully"));
    }
}
