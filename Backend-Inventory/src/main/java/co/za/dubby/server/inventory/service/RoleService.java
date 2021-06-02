package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    
    @Autowired
    RoleRepository roleRepository;
    
    public ResponseEntity<?> retrieveRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }
    
    public ResponseEntity<?> getOneRole(Long id) {
        return ResponseEntity.ok(roleRepository.findById(id));
    }
}
