package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.User;
import co.za.dubby.server.inventory.payload.LoginRequest;
import co.za.dubby.server.inventory.payload.UserSummary;
import co.za.dubby.server.inventory.security.CurrentUser;
import co.za.dubby.server.inventory.security.UserPrincipal;
import co.za.dubby.server.inventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/user-account")
public class UserController {

    @Autowired
    UserService userService;
    
    @GetMapping("/get/current-user")
//    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(
                currentUser.getId(), currentUser.getUsername(), 
                currentUser.getEmail(), currentUser.getPhoto(), currentUser.getAuthorities());
        return userSummary;
    }
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return userService.LogIn(loginRequest);
    }

    @PostMapping("/save")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User userRequest) {
        return userService.createUser(userRequest);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editUser(@Valid @RequestBody User userRequest) {
        return userService.updateUser(userRequest);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllUser() {
        return userService.retrieveUsers();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getUserById(@Valid @PathVariable("id") Long id) {
        return userService.getOneUser(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@Valid @PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }
}
