package co.za.dubby.server.inventory.model;

import co.za.dubby.server.inventory.model.util.AddressTypeDescription;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.hibernate.annotations.NaturalId;

@Entity
public class AddressType implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 50)
    private AddressTypeDescription description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AddressTypeDescription getDescription() {
        return description;
    }

    public void setDescription(AddressTypeDescription description) {
        this.description = description;
    }
}