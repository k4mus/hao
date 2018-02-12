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
 * A Carro.
 */
@Entity
@Table(name = "carro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_carro")
    private Integer idCarro;

    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(name = "id_mercado")
    private Integer idMercado;

    @Column(name = "id_medio_pago")
    private Integer idMedioPago;

    @Column(name = "fecha")
    private String fecha;

    @OneToMany(mappedBy = "carro")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cliente> idClientes = new HashSet<>();

    @OneToMany(mappedBy = "carro")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mercado> idMercados = new HashSet<>();

    @OneToMany(mappedBy = "carro")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MedioPago> idMedioPagos = new HashSet<>();

    @ManyToOne
    private CarroProductos carroProductos;

    @ManyToOne
    private ListaEntrega listaEntrega;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCarro() {
        return idCarro;
    }

    public Carro idCarro(Integer idCarro) {
        this.idCarro = idCarro;
        return this;
    }

    public void setIdCarro(Integer idCarro) {
        this.idCarro = idCarro;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public Carro idCliente(Integer idCliente) {
        this.idCliente = idCliente;
        return this;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdMercado() {
        return idMercado;
    }

    public Carro idMercado(Integer idMercado) {
        this.idMercado = idMercado;
        return this;
    }

    public void setIdMercado(Integer idMercado) {
        this.idMercado = idMercado;
    }

    public Integer getIdMedioPago() {
        return idMedioPago;
    }

    public Carro idMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
        return this;
    }

    public void setIdMedioPago(Integer idMedioPago) {
        this.idMedioPago = idMedioPago;
    }

    public String getFecha() {
        return fecha;
    }

    public Carro fecha(String fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Set<Cliente> getIdClientes() {
        return idClientes;
    }

    public Carro idClientes(Set<Cliente> clientes) {
        this.idClientes = clientes;
        return this;
    }

    public Carro addIdCliente(Cliente cliente) {
        this.idClientes.add(cliente);
        cliente.setCarro(this);
        return this;
    }

    public Carro removeIdCliente(Cliente cliente) {
        this.idClientes.remove(cliente);
        cliente.setCarro(null);
        return this;
    }

    public void setIdClientes(Set<Cliente> clientes) {
        this.idClientes = clientes;
    }

    public Set<Mercado> getIdMercados() {
        return idMercados;
    }

    public Carro idMercados(Set<Mercado> mercados) {
        this.idMercados = mercados;
        return this;
    }

    public Carro addIdMercado(Mercado mercado) {
        this.idMercados.add(mercado);
        mercado.setCarro(this);
        return this;
    }

    public Carro removeIdMercado(Mercado mercado) {
        this.idMercados.remove(mercado);
        mercado.setCarro(null);
        return this;
    }

    public void setIdMercados(Set<Mercado> mercados) {
        this.idMercados = mercados;
    }

    public Set<MedioPago> getIdMedioPagos() {
        return idMedioPagos;
    }

    public Carro idMedioPagos(Set<MedioPago> medioPagos) {
        this.idMedioPagos = medioPagos;
        return this;
    }

    public Carro addIdMedioPago(MedioPago medioPago) {
        this.idMedioPagos.add(medioPago);
        medioPago.setCarro(this);
        return this;
    }

    public Carro removeIdMedioPago(MedioPago medioPago) {
        this.idMedioPagos.remove(medioPago);
        medioPago.setCarro(null);
        return this;
    }

    public void setIdMedioPagos(Set<MedioPago> medioPagos) {
        this.idMedioPagos = medioPagos;
    }

    public CarroProductos getCarroProductos() {
        return carroProductos;
    }

    public Carro carroProductos(CarroProductos carroProductos) {
        this.carroProductos = carroProductos;
        return this;
    }

    public void setCarroProductos(CarroProductos carroProductos) {
        this.carroProductos = carroProductos;
    }

    public ListaEntrega getListaEntrega() {
        return listaEntrega;
    }

    public Carro listaEntrega(ListaEntrega listaEntrega) {
        this.listaEntrega = listaEntrega;
        return this;
    }

    public void setListaEntrega(ListaEntrega listaEntrega) {
        this.listaEntrega = listaEntrega;
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
        Carro carro = (Carro) o;
        if (carro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Carro{" +
            "id=" + getId() +
            ", idCarro=" + getIdCarro() +
            ", idCliente=" + getIdCliente() +
            ", idMercado=" + getIdMercado() +
            ", idMedioPago=" + getIdMedioPago() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
