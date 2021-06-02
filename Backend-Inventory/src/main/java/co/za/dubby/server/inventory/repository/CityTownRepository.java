package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.CityTown;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@SuppressWarnings("unused CityTownRepository")
@Repository
public interface CityTownRepository extends JpaRepository<CityTown, Long> {
    
    Boolean existsByName(String name);
    List<CityTown> findByProvinceId(Long id);
}
