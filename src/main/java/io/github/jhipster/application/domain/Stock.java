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
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_stock")
    private Integer idStock;

    @Column(name = "nombre_stock")
    private String nombreStock;

    @Column(name = "id_sucursal")
    private Integer idSucursal;

    @OneToMany(mappedBy = "stock")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Sucursal> idSucursals = new HashSet<>();

    @ManyToOne
    private StockProducto stockProducto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdStock() {
        return idStock;
    }

    public Stock idStock(Integer idStock) {
        this.idStock = idStock;
        return this;
    }

    public void setIdStock(Integer idStock) {
        this.idStock = idStock;
    }

    public String getNombreStock() {
        return nombreStock;
    }

    public Stock nombreStock(String nombreStock) {
        this.nombreStock = nombreStock;
        return this;
    }

    public void setNombreStock(String nombreStock) {
        this.nombreStock = nombreStock;
    }

    public Integer getIdSucursal() {
        return idSucursal;
    }

    public Stock idSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
        return this;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public Set<Sucursal> getIdSucursals() {
        return idSucursals;
    }

    public Stock idSucursals(Set<Sucursal> sucursals) {
        this.idSucursals = sucursals;
        return this;
    }

    public Stock addIdSucursal(Sucursal sucursal) {
        this.idSucursals.add(sucursal);
        sucursal.setStock(this);
        return this;
    }

    public Stock removeIdSucursal(Sucursal sucursal) {
        this.idSucursals.remove(sucursal);
        sucursal.setStock(null);
        return this;
    }

    public void setIdSucursals(Set<Sucursal> sucursals) {
        this.idSucursals = sucursals;
    }

    public StockProducto getStockProducto() {
        return stockProducto;
    }

    public Stock stockProducto(StockProducto stockProducto) {
        this.stockProducto = stockProducto;
        return this;
    }

    public void setStockProducto(StockProducto stockProducto) {
        this.stockProducto = stockProducto;
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
        Stock stock = (Stock) o;
        if (stock.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stock.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", idStock=" + getIdStock() +
            ", nombreStock='" + getNombreStock() + "'" +
            ", idSucursal=" + getIdSucursal() +
            "}";
    }
}
