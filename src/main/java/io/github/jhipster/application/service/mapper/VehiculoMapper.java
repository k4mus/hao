package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.VehiculoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vehiculo and its DTO VehiculoDTO.
 */
@Mapper(componentModel = "spring", uses = {EntregaMapper.class})
public interface VehiculoMapper extends EntityMapper<VehiculoDTO, Vehiculo> {

    @Mapping(source = "entrega.id", target = "entregaId")
    VehiculoDTO toDto(Vehiculo vehiculo);

    @Mapping(target = "idRepartidors", ignore = true)
    @Mapping(source = "entregaId", target = "entrega")
    Vehiculo toEntity(VehiculoDTO vehiculoDTO);

    default Vehiculo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setId(id);
        return vehiculo;
    }
}
