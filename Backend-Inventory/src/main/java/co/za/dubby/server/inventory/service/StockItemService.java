package co.za.dubby.server.inventory.service;

import co.za.dubby.server.inventory.model.StockItem;
import co.za.dubby.server.inventory.payload.ApiResponse;
import co.za.dubby.server.inventory.repository.StockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StockItemService {
    
    @Autowired
    StockItemRepository stockItemRepository;

    public ResponseEntity<?> createStockItem(StockItem stockItem) {

        if (stockItemRepository.existsByCode(stockItem.getCode())) {
            return new ResponseEntity(new ApiResponse(false, "Stock Item " 
                    + stockItem.getName() + " already exists!"),
                    HttpStatus.BAD_REQUEST);
        } 
        else if ( stockItem.getName().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Stock Item name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        stockItemRepository.save(stockItem);
        return ResponseEntity.ok(new ApiResponse(true, "Stock Item saved successfully"));
    }

    public ResponseEntity<?> retrieveStockItems() {
        return ResponseEntity.ok(stockItemRepository.findAll());
    }
    
    
    public ResponseEntity<?> getOneStockItem(Long id) {
        return ResponseEntity.ok(stockItemRepository.findById(id));
    }

    public ResponseEntity<?> updateStockItem(StockItem stockItem) {

        if ( stockItemRepository.existsById(stockItem.getId()) ) {
            return new ResponseEntity(new ApiResponse(false, "Stock Item " 
                    + stockItem.getName() + " does exists\nUpdate unsuccessful..."),
                    HttpStatus.BAD_REQUEST);
        }
        else if ( stockItem.getDescription().equals("") ) {
            return new ResponseEntity(new ApiResponse(false, "Stock Item name should not be empty!"),
                    HttpStatus.BAD_REQUEST);
        }
        stockItemRepository.save(stockItem);
        return ResponseEntity.ok(new ApiResponse(true, "Stock Item updated successfully"));
    }

    public ResponseEntity<?> deleteStockItem(Long id) {

        if ( !stockItemRepository.existsById(id) ) {
            return new ResponseEntity(new ApiResponse(false, "Stock Item does not exists!"),
                    HttpStatus.BAD_REQUEST);
        }
        stockItemRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Stock Item deleted successfully"));
    }
}
