package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Direccion.
 */
@Entity
@Table(name = "direccion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Direccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_direccion")
    private Integer idDireccion;

    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "calle")
    private String calle;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "dpto")
    private String dpto;

    @Column(name = "poblacion")
    private String poblacion;

    @Column(name = "id_comuna")
    private Integer idComuna;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdDireccion() {
        return idDireccion;
    }

    public Direccion idDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
        return this;
    }

    public void setIdDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Direccion ubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getCalle() {
        return calle;
    }

    public Direccion calle(String calle) {
        this.calle = calle;
        return this;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public Integer getNumero() {
        return numero;
    }

    public Direccion numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getDpto() {
        return dpto;
    }

    public Direccion dpto(String dpto) {
        this.dpto = dpto;
        return this;
    }

    public void setDpto(String dpto) {
        this.dpto = dpto;
    }

    public String getPoblacion() {
        return poblacion;
    }

    public Direccion poblacion(String poblacion) {
        this.poblacion = poblacion;
        return this;
    }

    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }

    public Integer getIdComuna() {
        return idComuna;
    }

    public Direccion idComuna(Integer idComuna) {
        this.idComuna = idComuna;
        return this;
    }

    public void setIdComuna(Integer idComuna) {
        this.idComuna = idComuna;
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
        Direccion direccion = (Direccion) o;
        if (direccion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), direccion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Direccion{" +
            "id=" + getId() +
            ", idDireccion=" + getIdDireccion() +
            ", ubicacion='" + getUbicacion() + "'" +
            ", calle='" + getCalle() + "'" +
            ", numero=" + getNumero() +
            ", dpto='" + getDpto() + "'" +
            ", poblacion='" + getPoblacion() + "'" +
            ", idComuna=" + getIdComuna() +
            "}";
    }
}
