package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.service.CompanyTypeService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("company-type")
public class CompanyTypeController {

    @Autowired
    CompanyTypeService companyTypeService;
          
    @GetMapping("/get-all/types")
    public ResponseEntity<?> getAllCompanyType() {
        return companyTypeService.retrieveCompanyTypes();
    }
    
    @GetMapping("/get-all/type-descriptions")
    public ResponseEntity<?> getAllCompanyTypeDescriptions() {
        return companyTypeService.retrieveCompanyTypeDescription();
    }
    
//    @GetMapping("/get/{id}")
//    public ResponseEntity<?> getCompanyTypeById(@Valid @PathVariable("id") Long id) {
//        return companyTypeService.getOneCompanyType(id);
//    }
}
