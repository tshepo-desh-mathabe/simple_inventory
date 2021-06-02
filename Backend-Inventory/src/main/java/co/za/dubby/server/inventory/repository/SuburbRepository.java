package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Suburb;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused SuburbRepository")
@Repository
public interface SuburbRepository extends JpaRepository<Suburb, Long> {

    Boolean existsByName(String name);
    List<Suburb> findByCityTownId(Long id);
}
