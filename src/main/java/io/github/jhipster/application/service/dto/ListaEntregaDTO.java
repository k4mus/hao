package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ListaEntrega entity.
 */
public class ListaEntregaDTO implements Serializable {

    private Long id;

    private Integer idListaEntrega;

    private Integer idCarro;

    private String unbicacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdListaEntrega() {
        return idListaEntrega;
    }

    public void setIdListaEntrega(Integer idListaEntrega) {
        this.idListaEntrega = idListaEntrega;
    }

    public Integer getIdCarro() {
        return idCarro;
    }

    public void setIdCarro(Integer idCarro) {
        this.idCarro = idCarro;
    }

    public String getUnbicacion() {
        return unbicacion;
    }

    public void setUnbicacion(String unbicacion) {
        this.unbicacion = unbicacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ListaEntregaDTO listaEntregaDTO = (ListaEntregaDTO) o;
        if(listaEntregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listaEntregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListaEntregaDTO{" +
            "id=" + getId() +
            ", idListaEntrega=" + getIdListaEntrega() +
            ", idCarro=" + getIdCarro() +
            ", unbicacion='" + getUnbicacion() + "'" +
            "}";
    }
}
