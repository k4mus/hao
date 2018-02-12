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
 * A Entrega.
 */
@Entity
@Table(name = "entrega")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entrega implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_entrega")
    private Integer idEntrega;

    @Column(name = "id_vehiculo")
    private Integer idVehiculo;

    @Column(name = "id_ruta")
    private Integer idRuta;

    @OneToMany(mappedBy = "entrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vehiculo> idVehiculos = new HashSet<>();

    @OneToMany(mappedBy = "entrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ruta> idRutas = new HashSet<>();

    @ManyToOne
    private ListaEntrega listaEntrega;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdEntrega() {
        return idEntrega;
    }

    public Entrega idEntrega(Integer idEntrega) {
        this.idEntrega = idEntrega;
        return this;
    }

    public void setIdEntrega(Integer idEntrega) {
        this.idEntrega = idEntrega;
    }

    public Integer getIdVehiculo() {
        return idVehiculo;
    }

    public Entrega idVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
        return this;
    }

    public void setIdVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public Integer getIdRuta() {
        return idRuta;
    }

    public Entrega idRuta(Integer idRuta) {
        this.idRuta = idRuta;
        return this;
    }

    public void setIdRuta(Integer idRuta) {
        this.idRuta = idRuta;
    }

    public Set<Vehiculo> getIdVehiculos() {
        return idVehiculos;
    }

    public Entrega idVehiculos(Set<Vehiculo> vehiculos) {
        this.idVehiculos = vehiculos;
        return this;
    }

    public Entrega addIdVehiculo(Vehiculo vehiculo) {
        this.idVehiculos.add(vehiculo);
        vehiculo.setEntrega(this);
        return this;
    }

    public Entrega removeIdVehiculo(Vehiculo vehiculo) {
        this.idVehiculos.remove(vehiculo);
        vehiculo.setEntrega(null);
        return this;
    }

    public void setIdVehiculos(Set<Vehiculo> vehiculos) {
        this.idVehiculos = vehiculos;
    }

    public Set<Ruta> getIdRutas() {
        return idRutas;
    }

    public Entrega idRutas(Set<Ruta> rutas) {
        this.idRutas = rutas;
        return this;
    }

    public Entrega addIdRuta(Ruta ruta) {
        this.idRutas.add(ruta);
        ruta.setEntrega(this);
        return this;
    }

    public Entrega removeIdRuta(Ruta ruta) {
        this.idRutas.remove(ruta);
        ruta.setEntrega(null);
        return this;
    }

    public void setIdRutas(Set<Ruta> rutas) {
        this.idRutas = rutas;
    }

    public ListaEntrega getListaEntrega() {
        return listaEntrega;
    }

    public Entrega listaEntrega(ListaEntrega listaEntrega) {
        this.listaEntrega = listaEntrega;
        return this;
    }

    public void setListaEntrega(ListaEntrega listaEntrega) {
        this.listaEntrega = listaEntrega;
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
        Entrega entrega = (Entrega) o;
        if (entrega.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entrega.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Entrega{" +
            "id=" + getId() +
            ", idEntrega=" + getIdEntrega() +
            ", idVehiculo=" + getIdVehiculo() +
            ", idRuta=" + getIdRuta() +
            "}";
    }
}
