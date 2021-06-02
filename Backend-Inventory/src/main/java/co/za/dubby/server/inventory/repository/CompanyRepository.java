package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Company;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused CompanyRepository")
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Boolean existsByName(String name);
//    Optional<Company> findByCompanyType(String type);
//    Boolean existsByCompanyType(String type);
    
}

