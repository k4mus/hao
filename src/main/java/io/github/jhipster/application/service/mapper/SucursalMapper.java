package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.SucursalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Sucursal and its DTO SucursalDTO.
 */
@Mapper(componentModel = "spring", uses = {StockMapper.class})
public interface SucursalMapper extends EntityMapper<SucursalDTO, Sucursal> {

    @Mapping(source = "stock.id", target = "stockId")
    SucursalDTO toDto(Sucursal sucursal);

    @Mapping(target = "idComercios", ignore = true)
    @Mapping(target = "idMecados", ignore = true)
    @Mapping(source = "stockId", target = "stock")
    Sucursal toEntity(SucursalDTO sucursalDTO);

    default Sucursal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Sucursal sucursal = new Sucursal();
        sucursal.setId(id);
        return sucursal;
    }
}
