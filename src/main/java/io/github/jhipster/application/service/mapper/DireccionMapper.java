package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.DireccionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Direccion and its DTO DireccionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DireccionMapper extends EntityMapper<DireccionDTO, Direccion> {



    default Direccion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Direccion direccion = new Direccion();
        direccion.setId(id);
        return direccion;
    }
}
