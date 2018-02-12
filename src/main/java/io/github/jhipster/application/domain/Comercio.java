package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Comercio.
 */
@Entity
@Table(name = "comercio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comercio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_comercio")
    private Integer idComercio;

    @Column(name = "nombre_comercio")
    private String nombreComercio;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "id_direccion")
    private Integer idDireccion;

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Usuario> idUsuarios = new HashSet<>();

    @ManyToOne
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdComercio() {
        return idComercio;
    }

    public Comercio idComercio(Integer idComercio) {
        this.idComercio = idComercio;
        return this;
    }

    public void setIdComercio(Integer idComercio) {
        this.idComercio = idComercio;
    }

    public String getNombreComercio() {
        return nombreComercio;
    }

    public Comercio nombreComercio(String nombreComercio) {
        this.nombreComercio = nombreComercio;
        return this;
    }

    public void setNombreComercio(String nombreComercio) {
        this.nombreComercio = nombreComercio;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public Comercio idUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
        return this;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdDireccion() {
        return idDireccion;
    }

    public Comercio idDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
        return this;
    }

    public void setIdDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
    }

    public Set<Usuario> getIdUsuarios() {
        return idUsuarios;
    }

    public Comercio idUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
        return this;
    }

    public Comercio addIdUsuario(Usuario usuario) {
        this.idUsuarios.add(usuario);
        usuario.setComercio(this);
        return this;
    }

    public Comercio removeIdUsuario(Usuario usuario) {
        this.idUsuarios.remove(usuario);
        usuario.setComercio(null);
        return this;
    }

    public void setIdUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public Comercio sucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Comercio comercio = (Comercio) o;
        if (comercio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comercio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comercio{" +
            "id=" + getId() +
            ", idComercio=" + getIdComercio() +
            ", nombreComercio='" + getNombreComercio() + "'" +
            ", idUsuario=" + getIdUsuario() +
            ", idDireccion=" + getIdDireccion() +
            "}";
    }
}
