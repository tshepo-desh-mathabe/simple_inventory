package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Continent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused ContinentRepository")
@Repository
public interface ContinentRepository extends JpaRepository<Continent, Long> {
    
    Boolean existsByName(String name);
    
}
