package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.MedioPagoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MedioPago and its DTO MedioPagoDTO.
 */
@Mapper(componentModel = "spring", uses = {CarroMapper.class})
public interface MedioPagoMapper extends EntityMapper<MedioPagoDTO, MedioPago> {

    @Mapping(source = "carro.id", target = "carroId")
    MedioPagoDTO toDto(MedioPago medioPago);

    @Mapping(source = "carroId", target = "carro")
    MedioPago toEntity(MedioPagoDTO medioPagoDTO);

    default MedioPago fromId(Long id) {
        if (id == null) {
            return null;
        }
        MedioPago medioPago = new MedioPago();
        medioPago.setId(id);
        return medioPago;
    }
}
