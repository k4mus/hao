package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Carro entity.
 */
public class CarroDTO implements Serializable {

    private Long id;

    private Integer idCarro;

    private Integer idCliente;

    private Integer idMercado;

    private Integer idMedioPago;

    private String fecha;

    private Long carroProductosId;

    private Long listaEntregaId;

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

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public Integer getIdMedioPago() {
        return idMedioPago;
    }

    public void setIdMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Long getCarroProductosId() {
        return carroProductosId;
    }

    public void setCarroProductosId(Long carroProductosId) {
        this.carroProductosId = carroProductosId;
    }

    public Long getListaEntregaId() {
        return listaEntregaId;
    }

    public void setListaEntregaId(Long listaEntregaId) {
        this.listaEntregaId = listaEntregaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarroDTO carroDTO = (CarroDTO) o;
        if(carroDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carroDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarroDTO{" +
            "id=" + getId() +
            ", idCarro=" + getIdCarro() +
            ", idCliente=" + getIdCliente() +
            ", idMercado=" + getIdMercado() +
            ", idMedioPago=" + getIdMedioPago() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
