package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Direccion entity.
 */
public class DireccionDTO implements Serializable {

    private Long id;

    private Integer idDireccion;

    private String ubicacion;

    private String calle;

    private Integer numero;

    private String dpto;

    private String poblacion;

    private Integer idComuna;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdDireccion() {
        return idDireccion;
    }

    public void setIdDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getDpto() {
        return dpto;
    }

    public void setDpto(String dpto) {
        this.dpto = dpto;
    }

    public String getPoblacion() {
        return poblacion;
    }

    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }

    public Integer getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Integer idComuna) {
        this.idComuna = idComuna;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DireccionDTO direccionDTO = (DireccionDTO) o;
        if(direccionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), direccionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DireccionDTO{" +
            "id=" + getId() +
            ", idDireccion=" + getIdDireccion() +
            ", ubicacion='" + getUbicacion() + "'" +
            ", calle='" + getCalle() + "'" +
            ", numero=" + getNumero() +
            ", dpto='" + getDpto() + "'" +
            ", poblacion='" + getPoblacion() + "'" +
            ", idComuna=" + getIdComuna() +
            "}";
    }
}
