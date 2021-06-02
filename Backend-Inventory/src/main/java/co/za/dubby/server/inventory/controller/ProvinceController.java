package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.Province;
import co.za.dubby.server.inventory.service.ProvinceService;
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
@RequestMapping("/province")
public class ProvinceController {
    
    @Autowired
    ProvinceService provinceService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveProvince(@Valid @RequestBody Province province) {
        return provinceService.createProvince(province);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editProvince(@Valid @RequestBody Province province) {
        return provinceService.updateProvince(province);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllProvince() {
        return provinceService.retrieveProvinces();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProvinceById(@Valid @PathVariable("id") Long id) {
        return provinceService.getOneProvince(id);
    }
    
    @GetMapping("/get/provinces-by-country/{id}")
    public ResponseEntity<?> getProvincesByCountryId(@Valid @PathVariable("id") Long id) {
        return provinceService.retrieveProvincesByCountryId(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProvinceById(@Valid @PathVariable("id") Long id) {
        return provinceService.deleteProvince(id);
    }
}
