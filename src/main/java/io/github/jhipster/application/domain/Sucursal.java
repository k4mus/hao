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
 * A Sucursal.
 */
@Entity
@Table(name = "sucursal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sucursal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_sucursal")
    private Integer idSucursal;

    @Column(name = "nombre_sucursal")
    private String nombreSucursal;

    @Column(name = "id_comercio")
    private Integer idComercio;

    @Column(name = "id_mercado")
    private Integer idMercado;

    @OneToMany(mappedBy = "sucursal")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comercio> idComercios = new HashSet<>();

    @OneToMany(mappedBy = "sucursal")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mercado> idMecados = new HashSet<>();

    @ManyToOne
    private Stock stock;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdSucursal() {
        return idSucursal;
    }

    public Sucursal idSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
        return this;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public String getNombreSucursal() {
        return nombreSucursal;
    }

    public Sucursal nombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
        return this;
    }

    public void setNombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
    }

    public Integer getIdComercio() {
        return idComercio;
    }

    public Sucursal idComercio(Integer idComercio) {
        this.idComercio = idComercio;
        return this;
    }

    public void setIdComercio(Integer idComercio) {
        this.idComercio = idComercio;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public Sucursal idMercado(Integer idMercado) {
        this.idMercado = idMercado;
        return this;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public Set<Comercio> getIdComercios() {
        return idComercios;
    }

    public Sucursal idComercios(Set<Comercio> comercios) {
        this.idComercios = comercios;
        return this;
    }

    public Sucursal addIdComercio(Comercio comercio) {
        this.idComercios.add(comercio);
        comercio.setSucursal(this);
        return this;
    }

    public Sucursal removeIdComercio(Comercio comercio) {
        this.idComercios.remove(comercio);
        comercio.setSucursal(null);
        return this;
    }

    public void setIdComercios(Set<Comercio> comercios) {
        this.idComercios = comercios;
    }

    public Set<Mercado> getIdMecados() {
        return idMecados;
    }

    public Sucursal idMecados(Set<Mercado> mercados) {
        this.idMecados = mercados;
        return this;
    }

    public Sucursal addIdMecado(Mercado mercado) {
        this.idMecados.add(mercado);
        mercado.setSucursal(this);
        return this;
    }

    public Sucursal removeIdMecado(Mercado mercado) {
        this.idMecados.remove(mercado);
        mercado.setSucursal(null);
        return this;
    }

    public void setIdMecados(Set<Mercado> mercados) {
        this.idMecados = mercados;
    }

    public Stock getStock() {
        return stock;
    }

    public Sucursal stock(Stock stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
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
        Sucursal sucursal = (Sucursal) o;
        if (sucursal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sucursal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sucursal{" +
            "id=" + getId() +
            ", idSucursal=" + getIdSucursal() +
            ", nombreSucursal='" + getNombreSucursal() + "'" +
            ", idComercio=" + getIdComercio() +
            ", idMercado=" + getIdMercado() +
            "}";
    }
}
