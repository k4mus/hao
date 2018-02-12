package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Stock entity.
 */
public class StockDTO implements Serializable {

    private Long id;

    private Integer idStock;

    private String nombreStock;

    private Integer idSucursal;

    private Long stockProductoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdStock() {
        return idStock;
    }

    public void setIdStock(Integer idStock) {
        this.idStock = idStock;
    }

    public String getNombreStock() {
        return nombreStock;
    }

    public void setNombreStock(String nombreStock) {
        this.nombreStock = nombreStock;
    }

    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public Long getStockProductoId() {
        return stockProductoId;
    }

    public void setStockProductoId(Long stockProductoId) {
        this.stockProductoId = stockProductoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockDTO stockDTO = (StockDTO) o;
        if(stockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockDTO{" +
            "id=" + getId() +
            ", idStock=" + getIdStock() +
            ", nombreStock='" + getNombreStock() + "'" +
            ", idSucursal=" + getIdSucursal() +
            "}";
    }
}
