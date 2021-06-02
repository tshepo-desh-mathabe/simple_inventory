package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Province;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused ProvinceRepository")
@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {

    Boolean existsByName(String name);
    List<Province> findByCountryId(Long id);
    
}
