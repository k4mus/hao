package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Vehiculo entity.
 */
public class VehiculoDTO implements Serializable {

    private Long id;

    private Integer idVehiculo;

    private Integer idRepartidor;

    private String nombreVehiculo;

    private String patente;

    private String consumo;

    private Long entregaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdVehiculo() {
        return idVehiculo;
    }

    public void setIdVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public Integer getIdRepartidor() {
        return idRepartidor;
    }

    public void setIdRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
    }

    public String getNombreVehiculo() {
        return nombreVehiculo;
    }

    public void setNombreVehiculo(String nombreVehiculo) {
        this.nombreVehiculo = nombreVehiculo;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getConsumo() {
        return consumo;
    }

    public void setConsumo(String consumo) {
        this.consumo = consumo;
    }

    public Long getEntregaId() {
        return entregaId;
    }

    public void setEntregaId(Long entregaId) {
        this.entregaId = entregaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VehiculoDTO vehiculoDTO = (VehiculoDTO) o;
        if(vehiculoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehiculoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehiculoDTO{" +
            "id=" + getId() +
            ", idVehiculo=" + getIdVehiculo() +
            ", idRepartidor=" + getIdRepartidor() +
            ", nombreVehiculo='" + getNombreVehiculo() + "'" +
            ", patente='" + getPatente() + "'" +
            ", consumo='" + getConsumo() + "'" +
            "}";
    }
}
