package co.za.dubby.server.inventory.payload;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

public class UserSummary {

    private final Long id;
    private final String username;
    private final String email;
    private final String photo;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserSummary(Long id, String username, String email, String photo, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.photo = photo;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoto() {
        return photo;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
