package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.RepartidorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Repartidor and its DTO RepartidorDTO.
 */
@Mapper(componentModel = "spring", uses = {VehiculoMapper.class})
public interface RepartidorMapper extends EntityMapper<RepartidorDTO, Repartidor> {

    @Mapping(source = "vehiculo.id", target = "vehiculoId")
    RepartidorDTO toDto(Repartidor repartidor);

    @Mapping(target = "idUsuarios", ignore = true)
    @Mapping(source = "vehiculoId", target = "vehiculo")
    Repartidor toEntity(RepartidorDTO repartidorDTO);

    default Repartidor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Repartidor repartidor = new Repartidor();
        repartidor.setId(id);
        return repartidor;
    }
}
