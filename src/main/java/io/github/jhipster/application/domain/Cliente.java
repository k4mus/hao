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
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Usuario> idUsuarios = new HashSet<>();

    @ManyToOne
    private Carro carro;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public Cliente idCliente(Integer idCliente) {
        this.idCliente = idCliente;
        return this;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public Cliente idUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
        return this;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Set<Usuario> getIdUsuarios() {
        return idUsuarios;
    }

    public Cliente idUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
        return this;
    }

    public Cliente addIdUsuario(Usuario usuario) {
        this.idUsuarios.add(usuario);
        usuario.setCliente(this);
        return this;
    }

    public Cliente removeIdUsuario(Usuario usuario) {
        this.idUsuarios.remove(usuario);
        usuario.setCliente(null);
        return this;
    }

    public void setIdUsuarios(Set<Usuario> usuarios) {
        this.idUsuarios = usuarios;
    }

    public Carro getCarro() {
        return carro;
    }

    public Cliente carro(Carro carro) {
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", idCliente=" + getIdCliente() +
            ", idUsuario=" + getIdUsuario() +
            "}";
    }
}
