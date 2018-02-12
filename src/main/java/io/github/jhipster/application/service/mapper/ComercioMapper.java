package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ComercioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comercio and its DTO ComercioDTO.
 */
@Mapper(componentModel = "spring", uses = {SucursalMapper.class})
public interface ComercioMapper extends EntityMapper<ComercioDTO, Comercio> {

    @Mapping(source = "sucursal.id", target = "sucursalId")
    ComercioDTO toDto(Comercio comercio);

    @Mapping(target = "idUsuarios", ignore = true)
    @Mapping(source = "sucursalId", target = "sucursal")
    Comercio toEntity(ComercioDTO comercioDTO);

    default Comercio fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comercio comercio = new Comercio();
        comercio.setId(id);
        return comercio;
    }
}
