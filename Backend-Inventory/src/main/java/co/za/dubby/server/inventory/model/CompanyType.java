package co.za.dubby.server.inventory.model;

import co.za.dubby.server.inventory.model.util.CompanyTypeDescription;
import java.io.Serializable;
import javax.persistence.*;

@Entity
public class CompanyType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private CompanyTypeDescription description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CompanyTypeDescription getDescription() {
        return description;
    }

    public void setDescription(CompanyTypeDescription description) {
        this.description = description;
    }
}
