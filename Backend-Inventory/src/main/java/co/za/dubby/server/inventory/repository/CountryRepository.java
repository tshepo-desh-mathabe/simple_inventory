package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Country;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused CountryRepository")
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    
    Boolean existsByName(String name);
    List<Country> findByContinentId(Long id);
    
}
