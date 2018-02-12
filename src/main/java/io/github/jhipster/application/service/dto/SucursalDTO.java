package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Sucursal entity.
 */
public class SucursalDTO implements Serializable {

    private Long id;

    private Integer idSucursal;

    private String nombreSucursal;

    private Integer idComercio;

    private Integer idMercado;

    private Long stockId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public String getNombreSucursal() {
        return nombreSucursal;
    }

    public void setNombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
    }

    public Integer getIdComercio() {
        return idComercio;
    }

    public void setIdComercio(Integer idComercio) {
        this.idComercio = idComercio;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public Long getStockId() {
        return stockId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SucursalDTO sucursalDTO = (SucursalDTO) o;
        if(sucursalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sucursalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SucursalDTO{" +
            "id=" + getId() +
            ", idSucursal=" + getIdSucursal() +
            ", nombreSucursal='" + getNombreSucursal() + "'" +
            ", idComercio=" + getIdComercio() +
            ", idMercado=" + getIdMercado() +
            "}";
    }
}
