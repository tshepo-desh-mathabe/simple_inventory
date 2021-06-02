package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.exception.AppException;
import co.za.dubby.server.inventory.model.Company;
import co.za.dubby.server.inventory.model.util.CompanyTypeDescription;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.CompanyRepository;
import co.za.dubby.server.inventory.repository.CompanyTypeRepository;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    CompanyTypeRepository companyTypeRepository;

    public ResponseEntity<?> createCompany(Company company) {

        if (companyTypeRepository.findAll() == null) {
            throw new AppException("Company types are not set...");
        }
        companyTypeRepository.findAll()
                .stream()
                .filter((type) -> (companyTypeRepository.existsById(type.getId()) == false))
                .forEachOrdered((e) -> {
                    throw new AppException("Enable to find company type: "
                            + e.getDescription().getTypeDescription());
                });

        if (companyRepository.existsByName(company.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Company "
                    + company.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        }

        for (CompanyTypeDescription jj : CompanyTypeDescription.values()) {
            if (Objects.equals(jj, company.getCompanyTypeData())) {
                company.setCompanyType(companyTypeRepository.findByDescription(jj.getType()));
            } else if (Objects.equals(jj, company.getCompanyTypeData())) {
                company.setCompanyType(companyTypeRepository.findByDescription(jj.getTypeDescription()));
            }
        }

        companyRepository.save(company);
        return ResponseEntity.ok(new ApiResponse(true, "Company saved successfully"));
    }

    public ResponseEntity<?> retrieveCompanies() {
        return ResponseEntity.ok(companyRepository.findAll());
    }

    public ResponseEntity<?> getOneCompany(Long id) {
        return ResponseEntity.ok(companyRepository.findById(id));
    }

    public ResponseEntity<?> updateCompany(Company company) {

        if (companyRepository.existsByName(company.getName())) {
            return new ResponseEntity(new ApiResponse(false, "Company "
                    + company.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        } else if (company.getName().equals("")) {
            return new ResponseEntity(new ApiResponse(false, "Company name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        companyRepository.save(company);
        return ResponseEntity.ok(new ApiResponse(true, "Company updated successfully"));
    }

    public ResponseEntity<?> deleteCompany(Long id) {

        if (!companyRepository.existsById(id)) {
            return new ResponseEntity(new ApiResponse(false, "Company does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        companyRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Company deleted successfully"));
    }
}
