package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Mercado.
 */
@Entity
@Table(name = "mercado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mercado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_mercado")
    private Integer idMercado;

    @Column(name = "nombre_mercado")
    private String nombreMercado;

    @Column(name = "ubicacion")
    private String ubicacion;

    @ManyToOne
    private Sucursal sucursal;

    @ManyToOne
    private Carro carro;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public Mercado idMercado(Integer idMercado) {
        this.idMercado = idMercado;
        return this;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public String getNombreMercado() {
        return nombreMercado;
    }

    public Mercado nombreMercado(String nombreMercado) {
        this.nombreMercado = nombreMercado;
        return this;
    }

    public void setNombreMercado(String nombreMercado) {
        this.nombreMercado = nombreMercado;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Mercado ubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public Mercado sucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public Carro getCarro() {
        return carro;
    }

    public Mercado carro(Carro carro) {
        this.carro = carro;
        return this;
    }

    public void setCarro(Carro carro) {
        this.carro = carro;
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
        Mercado mercado = (Mercado) o;
        if (mercado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mercado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mercado{" +
            "id=" + getId() +
            ", idMercado=" + getIdMercado() +
            ", nombreMercado='" + getNombreMercado() + "'" +
            ", ubicacion='" + getUbicacion() + "'" +
            "}";
    }
}
