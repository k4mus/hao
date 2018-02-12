package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MedioPago.
 */
@Entity
@Table(name = "medio_pago")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedioPago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_medio_pago")
    private Integer idMedioPago;

    @Column(name = "nombre_medio_pago")
    private String nombreMedioPago;

    @ManyToOne
    private Carro carro;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdMedioPago() {
        return idMedioPago;
    }

    public MedioPago idMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
        return this;
    }

    public void setIdMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
    }

    public String getNombreMedioPago() {
        return nombreMedioPago;
    }

    public MedioPago nombreMedioPago(String nombreMedioPago) {
        this.nombreMedioPago = nombreMedioPago;
        return this;
    }

    public void setNombreMedioPago(String nombreMedioPago) {
        this.nombreMedioPago = nombreMedioPago;
    }

    public Carro getCarro() {
        return carro;
    }

    public MedioPago carro(Carro carro) {
        this.carro = carro;
        return this;
    }

    public void setCarro(Carro carro) {
        this.carro = carro;
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
        MedioPago medioPago = (MedioPago) o;
        if (medioPago.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medioPago.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedioPago{" +
            "id=" + getId() +
            ", idMedioPago=" + getIdMedioPago() +
            ", nombreMedioPago='" + getNombreMedioPago() + "'" +
            "}";
    }
}
