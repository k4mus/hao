package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StockProducto entity.
 */
public class StockProductoDTO implements Serializable {

    private Long id;

    private Integer idStockProducto;

    private Integer idStock;

    private String idProducto;

    private Integer cantidad;

    private Long carroProductosId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdStockProducto() {
        return idStockProducto;
    }

    public void setIdStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
    }

    public Integer getIdStock() {
        return idStock;
    }

    public void setIdStock(Integer idStock) {
        this.idStock = idStock;
    }

    public String getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Long getCarroProductosId() {
        return carroProductosId;
    }

    public void setCarroProductosId(Long carroProductosId) {
        this.carroProductosId = carroProductosId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockProductoDTO stockProductoDTO = (StockProductoDTO) o;
        if(stockProductoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockProductoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockProductoDTO{" +
            "id=" + getId() +
            ", idStockProducto=" + getIdStockProducto() +
            ", idStock=" + getIdStock() +
            ", idProducto='" + getIdProducto() + "'" +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
