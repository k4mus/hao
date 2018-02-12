package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.MercadoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mercado and its DTO MercadoDTO.
 */
@Mapper(componentModel = "spring", uses = {SucursalMapper.class, CarroMapper.class})
public interface MercadoMapper extends EntityMapper<MercadoDTO, Mercado> {

    @Mapping(source = "sucursal.id", target = "sucursalId")
    @Mapping(source = "carro.id", target = "carroId")
    MercadoDTO toDto(Mercado mercado);

    @Mapping(source = "sucursalId", target = "sucursal")
    @Mapping(source = "carroId", target = "carro")
    Mercado toEntity(MercadoDTO mercadoDTO);

    default Mercado fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mercado mercado = new Mercado();
        mercado.setId(id);
        return mercado;
    }
}
