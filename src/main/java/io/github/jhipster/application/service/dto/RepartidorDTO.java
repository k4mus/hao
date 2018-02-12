package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Repartidor entity.
 */
public class RepartidorDTO implements Serializable {

    private Long id;

    private Integer idRepartidor;

    private String nombreRepartidor;

    private Integer idUsuario;

    private Long vehiculoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdRepartidor() {
        return idRepartidor;
    }

    public void setIdRepartidor(Integer idRepartidor) {
        this.idRepartidor = idRepartidor;
    }

    public String getNombreRepartidor() {
        return nombreRepartidor;
    }

    public void setNombreRepartidor(String nombreRepartidor) {
        this.nombreRepartidor = nombreRepartidor;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getVehiculoId() {
        return vehiculoId;
    }

    public void setVehiculoId(Long vehiculoId) {
        this.vehiculoId = vehiculoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RepartidorDTO repartidorDTO = (RepartidorDTO) o;
        if(repartidorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repartidorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepartidorDTO{" +
            "id=" + getId() +
            ", idRepartidor=" + getIdRepartidor() +
            ", nombreRepartidor='" + getNombreRepartidor() + "'" +
            ", idUsuario=" + getIdUsuario() +
            "}";
    }
}
