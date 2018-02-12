package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ListaEntrega.
 */
@Entity
@Table(name = "lista_entrega")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListaEntrega implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_lista_entrega")
    private Integer idListaEntrega;

    @Column(name = "id_carro")
    private Integer idCarro;

    @Column(name = "unbicacion")
    private String unbicacion;

    @OneToMany(mappedBy = "listaEntrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entrega> idEntregas = new HashSet<>();

    @OneToMany(mappedBy = "listaEntrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Carro> idCarros = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdListaEntrega() {
        return idListaEntrega;
    }

    public ListaEntrega idListaEntrega(Integer idListaEntrega) {
        this.idListaEntrega = idListaEntrega;
        return this;
    }

    public void setIdListaEntrega(Integer idListaEntrega) {
        this.idListaEntrega = idListaEntrega;
    }

    public Integer getIdCarro() {
        return idCarro;
    }

    public ListaEntrega idCarro(Integer idCarro) {
        this.idCarro = idCarro;
        return this;
    }

    public void setIdCarro(Integer idCarro) {
        this.idCarro = idCarro;
    }

    public String getUnbicacion() {
        return unbicacion;
    }

    public ListaEntrega unbicacion(String unbicacion) {
        this.unbicacion = unbicacion;
        return this;
    }

    public void setUnbicacion(String unbicacion) {
        this.unbicacion = unbicacion;
    }

    public Set<Entrega> getIdEntregas() {
        return idEntregas;
    }

    public ListaEntrega idEntregas(Set<Entrega> entregas) {
        this.idEntregas = entregas;
        return this;
    }

    public ListaEntrega addIdEntrega(Entrega entrega) {
        this.idEntregas.add(entrega);
        entrega.setListaEntrega(this);
        return this;
    }

    public ListaEntrega removeIdEntrega(Entrega entrega) {
        this.idEntregas.remove(entrega);
        entrega.setListaEntrega(null);
        return this;
    }

    public void setIdEntregas(Set<Entrega> entregas) {
        this.idEntregas = entregas;
    }

    public Set<Carro> getIdCarros() {
        return idCarros;
    }

    public ListaEntrega idCarros(Set<Carro> carros) {
        this.idCarros = carros;
        return this;
    }

    public ListaEntrega addIdCarro(Carro carro) {
        this.idCarros.add(carro);
        carro.setListaEntrega(this);
        return this;
    }

    public ListaEntrega removeIdCarro(Carro carro) {
        this.idCarros.remove(carro);
        carro.setListaEntrega(null);
        return this;
    }

    public void setIdCarros(Set<Carro> carros) {
        this.idCarros = carros;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ListaEntrega listaEntrega = (ListaEntrega) o;
        if (listaEntrega.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listaEntrega.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListaEntrega{" +
            "id=" + getId() +
            ", idListaEntrega=" + getIdListaEntrega() +
            ", idCarro=" + getIdCarro() +
            ", unbicacion='" + getUnbicacion() + "'" +
            "}";
    }
}
