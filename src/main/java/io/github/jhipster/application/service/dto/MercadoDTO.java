package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Mercado entity.
 */
public class MercadoDTO implements Serializable {

    private Long id;

    private Integer idMercado;

    private String nombreMercado;

    private String ubicacion;

    private Long sucursalId;

    private Long carroId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public String getNombreMercado() {
        return nombreMercado;
    }

    public void setNombreMercado(String nombreMercado) {
        this.nombreMercado = nombreMercado;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Long getSucursalId() {
        return sucursalId;
    }

    public void setSucursalId(Long sucursalId) {
        this.sucursalId = sucursalId;
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

        MercadoDTO mercadoDTO = (MercadoDTO) o;
        if(mercadoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mercadoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MercadoDTO{" +
            "id=" + getId() +
            ", idMercado=" + getIdMercado() +
            ", nombreMercado='" + getNombreMercado() + "'" +
            ", ubicacion='" + getUbicacion() + "'" +
            "}";
    }
}
