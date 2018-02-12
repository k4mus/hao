package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ruta.
 */
@Entity
@Table(name = "ruta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ruta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_ruta")
    private Integer idRuta;

    @Column(name = "nombre_ruta")
    private Integer nombreRuta;

    @Column(name = "ubicacion_origen")
    private String ubicacionOrigen;

    @Column(name = "ubicacion_destino")
    private String ubicacionDestino;

    @ManyToOne
    private Entrega entrega;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdRuta() {
        return idRuta;
    }

    public Ruta idRuta(Integer idRuta) {
        this.idRuta = idRuta;
        return this;
    }

    public void setIdRuta(Integer idRuta) {
        this.idRuta = idRuta;
    }

    public Integer getNombreRuta() {
        return nombreRuta;
    }

    public Ruta nombreRuta(Integer nombreRuta) {
        this.nombreRuta = nombreRuta;
        return this;
    }

    public void setNombreRuta(Integer nombreRuta) {
        this.nombreRuta = nombreRuta;
    }

    public String getUbicacionOrigen() {
        return ubicacionOrigen;
    }

    public Ruta ubicacionOrigen(String ubicacionOrigen) {
        this.ubicacionOrigen = ubicacionOrigen;
        return this;
    }

    public void setUbicacionOrigen(String ubicacionOrigen) {
        this.ubicacionOrigen = ubicacionOrigen;
    }

    public String getUbicacionDestino() {
        return ubicacionDestino;
    }

    public Ruta ubicacionDestino(String ubicacionDestino) {
        this.ubicacionDestino = ubicacionDestino;
        return this;
    }

    public void setUbicacionDestino(String ubicacionDestino) {
        this.ubicacionDestino = ubicacionDestino;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public Ruta entrega(Entrega entrega) {
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
        Ruta ruta = (Ruta) o;
        if (ruta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ruta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ruta{" +
            "id=" + getId() +
            ", idRuta=" + getIdRuta() +
            ", nombreRuta=" + getNombreRuta() +
            ", ubicacionOrigen='" + getUbicacionOrigen() + "'" +
            ", ubicacionDestino='" + getUbicacionDestino() + "'" +
            "}";
    }
}
