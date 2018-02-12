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
 * A CarroProductos.
 */
@Entity
@Table(name = "carro_productos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CarroProductos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_carro")
    private Integer idCarro;

    @Column(name = "id_stock_producto")
    private Integer idStockProducto;

    @Column(name = "precio")
    private Integer precio;

    @Column(name = "descuento")
    private Integer descuento;

    @Column(name = "id_direccion_cliente")
    private Integer idDireccionCliente;

    @OneToMany(mappedBy = "carroProductos")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Carro> idCarros = new HashSet<>();

    @OneToMany(mappedBy = "carroProductos")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StockProducto> idStockProductos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCarro() {
        return idCarro;
    }

    public CarroProductos idCarro(Integer idCarro) {
        this.idCarro = idCarro;
        return this;
    }

    public void setIdCarro(Integer idCarro) {
        this.idCarro = idCarro;
    }

    public Integer getIdStockProducto() {
        return idStockProducto;
    }

    public CarroProductos idStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
        return this;
    }

    public void setIdStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
    }

    public Integer getPrecio() {
        return precio;
    }

    public CarroProductos precio(Integer precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getDescuento() {
        return descuento;
    }

    public CarroProductos descuento(Integer descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }

    public Integer getIdDireccionCliente() {
        return idDireccionCliente;
    }

    public CarroProductos idDireccionCliente(Integer idDireccionCliente) {
        this.idDireccionCliente = idDireccionCliente;
        return this;
    }

    public void setIdDireccionCliente(Integer idDireccionCliente) {
        this.idDireccionCliente = idDireccionCliente;
    }

    public Set<Carro> getIdCarros() {
        return idCarros;
    }

    public CarroProductos idCarros(Set<Carro> carros) {
        this.idCarros = carros;
        return this;
    }

    public CarroProductos addIdCarro(Carro carro) {
        this.idCarros.add(carro);
        carro.setCarroProductos(this);
        return this;
    }

    public CarroProductos removeIdCarro(Carro carro) {
        this.idCarros.remove(carro);
        carro.setCarroProductos(null);
        return this;
    }

    public void setIdCarros(Set<Carro> carros) {
        this.idCarros = carros;
    }

    public Set<StockProducto> getIdStockProductos() {
        return idStockProductos;
    }

    public CarroProductos idStockProductos(Set<StockProducto> stockProductos) {
        this.idStockProductos = stockProductos;
        return this;
    }

    public CarroProductos addIdStockProducto(StockProducto stockProducto) {
        this.idStockProductos.add(stockProducto);
        stockProducto.setCarroProductos(this);
        return this;
    }

    public CarroProductos removeIdStockProducto(StockProducto stockProducto) {
        this.idStockProductos.remove(stockProducto);
        stockProducto.setCarroProductos(null);
        return this;
    }

    public void setIdStockProductos(Set<StockProducto> stockProductos) {
        this.idStockProductos = stockProductos;
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
        CarroProductos carroProductos = (CarroProductos) o;
        if (carroProductos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carroProductos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarroProductos{" +
            "id=" + getId() +
            ", idCarro=" + getIdCarro() +
            ", idStockProducto=" + getIdStockProducto() +
            ", precio=" + getPrecio() +
            ", descuento=" + getDescuento() +
            ", idDireccionCliente=" + getIdDireccionCliente() +
            "}";
    }
}
