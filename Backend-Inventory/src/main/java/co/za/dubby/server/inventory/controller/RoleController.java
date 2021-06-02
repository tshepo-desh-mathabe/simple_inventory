package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.service.RoleService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {
    
    @Autowired
    RoleService roleService;
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllRole() {
        return roleService.retrieveRoles();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRoleById(@Valid @PathVariable("id") Long id) {
        return roleService.getOneRole(id);
    }
    
}
