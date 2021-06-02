package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.repository.CompanyTypeRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CompanyTypeService {

    @Autowired
    CompanyTypeRepository companyTypeRepository;

    public ResponseEntity<?> retrieveCompanyTypes() {
        List<Object> companyTypes = new ArrayList<>();
        
        companyTypeRepository.findAll().forEach((ct) -> {
            companyTypes.add(ct.getDescription().getType());
        });
        return ResponseEntity.ok(companyTypes);
    }

    public ResponseEntity<?> retrieveCompanyTypeDescription() {
        List<Object> companyTypeDescription = new ArrayList<>();

        companyTypeRepository.findAll().forEach((companyTypeDesc) -> {
            companyTypeDescription.add(companyTypeDesc.getDescription().getTypeDescription());
        });
        return ResponseEntity.ok(companyTypeDescription);
    }
}
