package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.Role;
import co.za.dubby.server.inventory.model.util.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@SuppressWarnings("unused RoleRepository")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findByName(RoleName roleName);

    public boolean existsByName(RoleName roleName);
}
