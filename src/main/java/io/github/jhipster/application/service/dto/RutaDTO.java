package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Ruta entity.
 */
public class RutaDTO implements Serializable {

    private Long id;

    private Integer idRuta;

    private Integer nombreRuta;

    private String ubicacionOrigen;

    private String ubicacionDestino;

    private Long entregaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdRuta() {
        return idRuta;
    }

    public void setIdRuta(Integer idRuta) {
        this.idRuta = idRuta;
    }

    public Integer getNombreRuta() {
        return nombreRuta;
    }

    public void setNombreRuta(Integer nombreRuta) {
        this.nombreRuta = nombreRuta;
    }

    public String getUbicacionOrigen() {
        return ubicacionOrigen;
    }

    public void setUbicacionOrigen(String ubicacionOrigen) {
        this.ubicacionOrigen = ubicacionOrigen;
    }

    public String getUbicacionDestino() {
        return ubicacionDestino;
    }

    public void setUbicacionDestino(String ubicacionDestino) {
        this.ubicacionDestino = ubicacionDestino;
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

        RutaDTO rutaDTO = (RutaDTO) o;
        if(rutaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rutaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RutaDTO{" +
            "id=" + getId() +
            ", idRuta=" + getIdRuta() +
            ", nombreRuta=" + getNombreRuta() +
            ", ubicacionOrigen='" + getUbicacionOrigen() + "'" +
            ", ubicacionDestino='" + getUbicacionDestino() + "'" +
            "}";
    }
}
