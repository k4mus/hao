package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the MedioPago entity.
 */
public class MedioPagoDTO implements Serializable {

    private Long id;

    private Integer idMedioPago;

    private String nombreMedioPago;

    private Long carroId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdMedioPago() {
        return idMedioPago;
    }

    public void setIdMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
    }

    public String getNombreMedioPago() {
        return nombreMedioPago;
    }

    public void setNombreMedioPago(String nombreMedioPago) {
        this.nombreMedioPago = nombreMedioPago;
    }

    public Long getCarroId() {
        return carroId;
    }

    public void setCarroId(Long carroId) {
        this.carroId = carroId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MedioPagoDTO medioPagoDTO = (MedioPagoDTO) o;
        if(medioPagoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medioPagoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedioPagoDTO{" +
            "id=" + getId() +
            ", idMedioPago=" + getIdMedioPago() +
            ", nombreMedioPago='" + getNombreMedioPago() + "'" +
            "}";
    }
}
