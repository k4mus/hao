package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.RutaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ruta and its DTO RutaDTO.
 */
@Mapper(componentModel = "spring", uses = {EntregaMapper.class})
public interface RutaMapper extends EntityMapper<RutaDTO, Ruta> {

    @Mapping(source = "entrega.id", target = "entregaId")
    RutaDTO toDto(Ruta ruta);

    @Mapping(source = "entregaId", target = "entrega")
    Ruta toEntity(RutaDTO rutaDTO);

    default Ruta fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ruta ruta = new Ruta();
        ruta.setId(id);
        return ruta;
    }
}
