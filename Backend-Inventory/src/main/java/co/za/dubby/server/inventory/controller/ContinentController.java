package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.Continent;
import co.za.dubby.server.inventory.service.ContinentService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/continent")
public class ContinentController {
    
    @Autowired
    ContinentService continentService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveContinent(@Valid @RequestBody Continent continent) {
        return continentService.createContinent(continent);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editContinent(@Valid @RequestBody Continent continent) {
        return continentService.updateContinent(continent);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllContinent() {
        return continentService.retrieveContinents();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getContinentById(@Valid @PathVariable("id") Long id) {
        return continentService.getOneContinent(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContinentById(@Valid @PathVariable("id") Long id) {
        return continentService.deleteContinent(id);
    }
}
