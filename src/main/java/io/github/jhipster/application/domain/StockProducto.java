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
 * A StockProducto.
 */
@Entity
@Table(name = "stock_producto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StockProducto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_stock_producto")
    private Integer idStockProducto;

    @Column(name = "id_stock")
    private Integer idStock;

    @Column(name = "id_producto")
    private String idProducto;

    @Column(name = "cantidad")
    private Integer cantidad;

    @OneToMany(mappedBy = "stockProducto")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Producto> idProductos = new HashSet<>();

    @OneToMany(mappedBy = "stockProducto")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stock> idStocks = new HashSet<>();

    @ManyToOne
    private CarroProductos carroProductos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdStockProducto() {
        return idStockProducto;
    }

    public StockProducto idStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
        return this;
    }

    public void setIdStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
    }

    public Integer getIdStock() {
        return idStock;
    }

    public StockProducto idStock(Integer idStock) {
        this.idStock = idStock;
        return this;
    }

    public void setIdStock(Integer idStock) {
        this.idStock = idStock;
    }

    public String getIdProducto() {
        return idProducto;
    }

    public StockProducto idProducto(String idProducto) {
        this.idProducto = idProducto;
        return this;
    }

    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public StockProducto cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Set<Producto> getIdProductos() {
        return idProductos;
    }

    public StockProducto idProductos(Set<Producto> productos) {
        this.idProductos = productos;
        return this;
    }

    public StockProducto addIdProducto(Producto producto) {
        this.idProductos.add(producto);
        producto.setStockProducto(this);
        return this;
    }

    public StockProducto removeIdProducto(Producto producto) {
        this.idProductos.remove(producto);
        producto.setStockProducto(null);
        return this;
    }

    public void setIdProductos(Set<Producto> productos) {
        this.idProductos = productos;
    }

    public Set<Stock> getIdStocks() {
        return idStocks;
    }

    public StockProducto idStocks(Set<Stock> stocks) {
        this.idStocks = stocks;
        return this;
    }

    public StockProducto addIdStock(Stock stock) {
        this.idStocks.add(stock);
        stock.setStockProducto(this);
        return this;
    }

    public StockProducto removeIdStock(Stock stock) {
        this.idStocks.remove(stock);
        stock.setStockProducto(null);
        return this;
    }

    public void setIdStocks(Set<Stock> stocks) {
        this.idStocks = stocks;
    }

    public CarroProductos getCarroProductos() {
        return carroProductos;
    }

    public StockProducto carroProductos(CarroProductos carroProductos) {
        this.carroProductos = carroProductos;
        return this;
    }

    public void setCarroProductos(CarroProductos carroProductos) {
        this.carroProductos = carroProductos;
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
        StockProducto stockProducto = (StockProducto) o;
        if (stockProducto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockProducto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockProducto{" +
            "id=" + getId() +
            ", idStockProducto=" + getIdStockProducto() +
            ", idStock=" + getIdStock() +
            ", idProducto='" + getIdProducto() + "'" +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
