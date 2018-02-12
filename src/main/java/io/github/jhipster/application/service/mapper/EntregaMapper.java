package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.EntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Entrega and its DTO EntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {ListaEntregaMapper.class})
public interface EntregaMapper extends EntityMapper<EntregaDTO, Entrega> {

    @Mapping(source = "listaEntrega.id", target = "listaEntregaId")
    EntregaDTO toDto(Entrega entrega);

    @Mapping(target = "idVehiculos", ignore = true)
    @Mapping(target = "idRutas", ignore = true)
    @Mapping(source = "listaEntregaId", target = "listaEntrega")
    Entrega toEntity(EntregaDTO entregaDTO);

    default Entrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        Entrega entrega = new Entrega();
        entrega.setId(id);
        return entrega;
    }
}
