package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CarroProductos entity.
 */
public class CarroProductosDTO implements Serializable {

    private Long id;

    private Integer idCarro;

    private Integer idStockProducto;

    private Integer precio;

    private Integer descuento;

    private Integer idDireccionCliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCarro() {
        return idCarro;
    }

    public void setIdCarro(Integer idCarro) {
        this.idCarro = idCarro;
    }

    public Integer getIdStockProducto() {
        return idStockProducto;
    }

    public void setIdStockProducto(Integer idStockProducto) {
        this.idStockProducto = idStockProducto;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getDescuento() {
        return descuento;
    }

    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }

    public Integer getIdDireccionCliente() {
        return idDireccionCliente;
    }

    public void setIdDireccionCliente(Integer idDireccionCliente) {
        this.idDireccionCliente = idDireccionCliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarroProductosDTO carroProductosDTO = (CarroProductosDTO) o;
        if(carroProductosDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carroProductosDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarroProductosDTO{" +
            "id=" + getId() +
            ", idCarro=" + getIdCarro() +
            ", idStockProducto=" + getIdStockProducto() +
            ", precio=" + getPrecio() +
            ", descuento=" + getDescuento() +
            ", idDireccionCliente=" + getIdDireccionCliente() +
            "}";
    }
}
