package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.Suburb;
import co.za.dubby.server.inventory.service.SuburbService;
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
@RequestMapping("/suburb")
public class SuburbController {

    @Autowired
    SuburbService suburbService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveSuburb(@Valid @RequestBody Suburb suburb) {
        return suburbService.createSuburb(suburb);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editSuburb(@Valid @RequestBody Suburb suburb) {
        return suburbService.updateSuburb(suburb);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllSuburb() {
        return suburbService.retrieveSuburbs();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSuburbById(@Valid @PathVariable("id") Long id) {
        return suburbService.getOneSuburb(id);
    }
    
    @GetMapping("/get/suburbs-by-city-town/{id}")
    public ResponseEntity<?> getSuburbsByCityTownId(@Valid @PathVariable("id") Long id) {
        return suburbService.retrieveSuburbsByCityTownId(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSuburbById(@Valid @PathVariable("id") Long id) {
        return suburbService.deleteSuburb(id);
    }
}
