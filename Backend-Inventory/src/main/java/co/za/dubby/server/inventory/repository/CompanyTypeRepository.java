package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.CompanyType;
import co.za.dubby.server.inventory.model.util.CompanyTypeDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused CompanyTypeRepository")
@Repository
public interface CompanyTypeRepository extends JpaRepository<CompanyType, Long> {

    Boolean existsByDescription(CompanyTypeDescription companyTypeDescription);
    CompanyType findByDescription(String type);

//    public void findByDescription(CompanyTypeDescription jj);
    
}
