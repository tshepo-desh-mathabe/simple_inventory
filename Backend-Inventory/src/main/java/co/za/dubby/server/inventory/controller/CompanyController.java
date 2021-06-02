package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.Company;
import co.za.dubby.server.inventory.service.CompanyService;
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
@RequestMapping("/company")
public class CompanyController {
    
    @Autowired
    CompanyService companyService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveCompany(@Valid @RequestBody Company company) {
        return companyService.createCompany(company);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editCompany(@Valid @RequestBody Company company) {
        return companyService.updateCompany(company);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllCompany() {
        return companyService.retrieveCompanies();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCompanyById(@Valid @PathVariable("id") Long id) {
        return companyService.getOneCompany(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCompanyById(@Valid @PathVariable("id") Long id) {
        return companyService.deleteCompany(id);
    }
}
