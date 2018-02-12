package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.UsuarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, ComercioMapper.class, RepartidorMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "comercio.id", target = "comercioId")
    @Mapping(source = "repartidor.id", target = "repartidorId")
    UsuarioDTO toDto(Usuario usuario);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "comercioId", target = "comercio")
    @Mapping(source = "repartidorId", target = "repartidor")
    Usuario toEntity(UsuarioDTO usuarioDTO);

    default Usuario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
