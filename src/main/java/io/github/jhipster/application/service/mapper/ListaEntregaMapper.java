package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ListaEntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ListaEntrega and its DTO ListaEntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ListaEntregaMapper extends EntityMapper<ListaEntregaDTO, ListaEntrega> {


    @Mapping(target = "idEntregas", ignore = true)
    @Mapping(target = "idCarros", ignore = true)
    ListaEntrega toEntity(ListaEntregaDTO listaEntregaDTO);

    default ListaEntrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        ListaEntrega listaEntrega = new ListaEntrega();
        listaEntrega.setId(id);
        return listaEntrega;
    }
}
