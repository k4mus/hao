package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Comercio entity.
 */
public class ComercioDTO implements Serializable {

    private Long id;

    private Integer idComercio;

    private String nombreComercio;

    private Integer idUsuario;

    private Integer idDireccion;

    private Long sucursalId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdComercio() {
        return idComercio;
    }

    public void setIdComercio(Integer idComercio) {
        this.idComercio = idComercio;
    }

    public String getNombreComercio() {
        return nombreComercio;
    }

    public void setNombreComercio(String nombreComercio) {
        this.nombreComercio = nombreComercio;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdDireccion() {
        return idDireccion;
    }

    public void setIdDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
    }

    public Long getSucursalId() {
        return sucursalId;
    }

    public void setSucursalId(Long sucursalId) {
        this.sucursalId = sucursalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ComercioDTO comercioDTO = (ComercioDTO) o;
        if(comercioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comercioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComercioDTO{" +
            "id=" + getId() +
            ", idComercio=" + getIdComercio() +
            ", nombreComercio='" + getNombreComercio() + "'" +
            ", idUsuario=" + getIdUsuario() +
            ", idDireccion=" + getIdDireccion() +
            "}";
    }
}
