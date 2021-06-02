package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.exception.AppException;
import co.za.dubby.server.inventory.model.User;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.payload.JwtAuthenticationResponse;
import co.za.dubby.server.inventory.payload.LoginRequest;
import co.za.dubby.server.inventory.repository.RoleRepository;
import co.za.dubby.server.inventory.repository.UserRepository;
import co.za.dubby.server.inventory.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    public ResponseEntity<?> LogIn(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwtToken));
    }

    public ResponseEntity<?> createUser(User userRequest) {

        if (roleRepository.findAll() == null) {
            throw new AppException("Roles are not set...");
        }
        roleRepository.findAll()
                .stream()
                .filter((role) -> (roleRepository.existsById(role.getId()) == false))
                .forEachOrdered((e) -> {
                    throw new AppException("Enable to find role: " + e.getName());
                });

        if (userRepository.existsByUsername(userRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        } else if (userRepository.existsByEmail(userRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRequest.setSecurityAnswer(passwordEncoder.encode(userRequest.getSecurityAnswer()));

        userRepository.save(userRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }

    public ResponseEntity<?> retrieveUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity<?> getOneUser(Long id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }

    public ResponseEntity<?> updateUser(User userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())
                & !userRepository.existsById(userRequest.getId())) {
            return new ResponseEntity(new ApiResponse(false, "Email "
                    + userRequest.getEmail() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        } else if (userRepository.existsByUsername(userRequest.getUsername())
                & !userRepository.existsById(userRequest.getId())) {
            return new ResponseEntity(new ApiResponse(false, "Username "
                    + userRequest.getUsername() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        } else {
            userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            userRequest.setSecurityAnswer(passwordEncoder.encode(userRequest.getSecurityAnswer()));
            try {
                userRepository.save(userRequest);
            } catch (Exception e) {
                return new ResponseEntity(new ApiResponse(false, "Update unsuccessful...\n" 
                        + "Username and/or Email exists..."), 
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return ResponseEntity.ok(new ApiResponse(true, "User update successfully"));
    }

    public ResponseEntity<?> deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return new ResponseEntity(new ApiResponse(false, "User does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
    }
}
