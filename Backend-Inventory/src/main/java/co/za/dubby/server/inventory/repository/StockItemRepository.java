package co.za.dubby.server.inventory.repository;

import co.za.dubby.server.inventory.model.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused StockItemRepository")
@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {

    Boolean existsByCode(String code);
}