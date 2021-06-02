package co.za.dubby.server.inventory.controller;

import co.za.dubby.server.inventory.model.StockItem;
import co.za.dubby.server.inventory.service.StockItemService;
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
@RequestMapping("/stock-item")
public class StockItemController {
   
    @Autowired
    StockItemService stockItemService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveStockItem(@Valid @RequestBody StockItem stockItem) {
        return stockItemService.createStockItem(stockItem);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<?> editStockItem(@Valid @RequestBody StockItem stockItem) {
        return stockItemService.updateStockItem(stockItem);
    }
    
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllStockItem() {
        return stockItemService.retrieveStockItems();
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getStockItemById(@Valid @PathVariable("id") Long id) {
        return stockItemService.getOneStockItem(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStockItemById(@Valid @PathVariable("id") Long id) {
        return stockItemService.deleteStockItem(id);
    }
}
