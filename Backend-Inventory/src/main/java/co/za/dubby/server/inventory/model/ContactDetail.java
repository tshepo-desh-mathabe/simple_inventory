package co.za.dubby.server.inventory.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class ContactDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Email
    @Size(max = 40)
    private String email;
    @Size(max = 15)
    private String fax;
    @NotNull
    @Size(max = 15)
    private String landLine;
    @Size(max = 15)
    private String mobile;
    @ManyToMany
    Collection<Address> residentialAddress = new ArrayList<>();
    @ManyToMany
    Collection<Address> postalAddress = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getLandLine() {
        return landLine;
    }

    public void setLandLine(String landLine) {
        this.landLine = landLine;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Collection<Address> getResidentialAddress() {
        return residentialAddress;
    }

    public void setResidentialAddress(List<Address> residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public Collection<Address> getPostalAddress() {
        return postalAddress;
    }

    public void setPostalAddress(List<Address> postalAddress) {
        this.postalAddress = postalAddress;
    }
}
