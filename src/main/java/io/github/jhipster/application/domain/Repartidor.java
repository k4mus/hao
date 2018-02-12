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
 * A Repartidor.
 */
@Entity
@Table(name = "repartidor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Repartidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_repartidor")
    private Integer idRepartidor;

    @Column(name = "nombre_repartidor")
    private String nombreRepartidor;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @OneToMany(mappedBy = "repartidor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Usuario> idUsuarios = new HashSet<>();

    @ManyToOne
    private Vehiculo vehiculo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdRepartidor() {
        return idRepartidor;
    }

    public Repartidor idRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
        return this;
    }

    public void setIdRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
    }

    public String getNombreRepartidor() {
        return nombreRepartidor;
    }

    public Repartidor nombreRepartidor(String nombreRepartidor) {
        this.nombreRepartidor = nombreRepartidor;
        return this;
    }

    public void setNombreRepartidor(String nombreRepartidor) {
        this.nombreRepartidor = nombreRepartidor;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public Repartidor idUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
        return this;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Set<Usuario> getIdUsuarios() {
        return idUsuarios;
    }

    public Repartidor idUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
        return this;
    }

    public Repartidor addIdUsuario(Usuario usuario) {
        this.idUsuarios.add(usuario);
        usuario.setRepartidor(this);
        return this;
    }

    public Repartidor removeIdUsuario(Usuario usuario) {
        this.idUsuarios.remove(usuario);
        usuario.setRepartidor(null);
        return this;
    }

    public void setIdUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public Repartidor vehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
        return this;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
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
        Repartidor repartidor = (Repartidor) o;
        if (repartidor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repartidor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Repartidor{" +
            "id=" + getId() +
            ", idRepartidor=" + getIdRepartidor() +
            ", nombreRepartidor='" + getNombreRepartidor() + "'" +
            ", idUsuario=" + getIdUsuario() +
            "}";
    }
}
