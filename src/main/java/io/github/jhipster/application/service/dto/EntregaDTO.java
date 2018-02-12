package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Entrega entity.
 */
public class EntregaDTO implements Serializable {

    private Long id;

    private Integer idEntrega;

    private Integer idVehiculo;

    private Integer idRuta;

    private Long listaEntregaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdEntrega() {
        return idEntrega;
    }

    public void setIdEntrega(Integer idEntrega) {
        this.idEntrega = idEntrega;
    }

    public Integer getIdVehiculo() {
        return idVehiculo;
    }

    public void setIdVehiculo(Integer idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public Integer getIdRuta() {
        return idRuta;
    }

    public void setIdRuta(Integer idRuta) {
        this.idRuta = idRuta;
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

        EntregaDTO entregaDTO = (EntregaDTO) o;
        if(entregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntregaDTO{" +
            "id=" + getId() +
            ", idEntrega=" + getIdEntrega() +
            ", idVehiculo=" + getIdVehiculo() +
            ", idRuta=" + getIdRuta() +
            "}";
    }
}
