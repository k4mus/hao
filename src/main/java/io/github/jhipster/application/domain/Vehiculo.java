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
 * A Vehiculo.
 */
@Entity
@Table(name = "vehiculo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vehiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_vehiculo")
    private Integer idVehiculo;

    @Column(name = "id_repartidor")
    private Integer idRepartidor;

    @Column(name = "nombre_vehiculo")
    private String nombreVehiculo;

    @Column(name = "patente")
    private String patente;

    @Column(name = "consumo")
    private String consumo;

    @OneToMany(mappedBy = "vehiculo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Repartidor> idRepartidors = new HashSet<>();

    @ManyToOne
    private Entrega entrega;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdVehiculo() {
        return idVehiculo;
    }

    public Vehiculo idVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
        return this;
    }

    public void setIdVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public Integer getIdRepartidor() {
        return idRepartidor;
    }

    public Vehiculo idRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
        return this;
    }

    public void setIdRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
    }

    public String getNombreVehiculo() {
        return nombreVehiculo;
    }

    public Vehiculo nombreVehiculo(String nombreVehiculo) {
        this.nombreVehiculo = nombreVehiculo;
        return this;
    }

    public void setNombreVehiculo(String nombreVehiculo) {
        this.nombreVehiculo = nombreVehiculo;
    }

    public String getPatente() {
        return patente;
    }

    public Vehiculo patente(String patente) {
        this.patente = patente;
        return this;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getConsumo() {
        return consumo;
    }

    public Vehiculo consumo(String consumo) {
        this.consumo = consumo;
        return this;
    }

    public void setConsumo(String consumo) {
        this.consumo = consumo;
    }

    public Set<Repartidor> getIdRepartidors() {
        return idRepartidors;
    }

    public Vehiculo idRepartidors(Set<Repartidor> repartidors) {
        this.idRepartidors = repartidors;
        return this;
    }

    public Vehiculo addIdRepartidor(Repartidor repartidor) {
        this.idRepartidors.add(repartidor);
        repartidor.setVehiculo(this);
        return this;
    }

    public Vehiculo removeIdRepartidor(Repartidor repartidor) {
        this.idRepartidors.remove(repartidor);
        repartidor.setVehiculo(null);
        return this;
    }

    public void setIdRepartidors(Set<Repartidor> repartidors) {
        this.idRepartidors = repartidors;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public Vehiculo entrega(Entrega entrega) {
        this.entrega = entrega;
        return this;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
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
        Vehiculo vehiculo = (Vehiculo) o;
        if (vehiculo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehiculo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
            "id=" + getId() +
            ", idVehiculo=" + getIdVehiculo() +
            ", idRepartidor=" + getIdRepartidor() +
            ", nombreVehiculo='" + getNombreVehiculo() + "'" +
            ", patente='" + getPatente() + "'" +
            ", consumo='" + getConsumo() + "'" +
            "}";
    }
}
