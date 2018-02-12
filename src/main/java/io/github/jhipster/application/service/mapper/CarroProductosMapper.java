package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CarroProductosDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CarroProductos and its DTO CarroProductosDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CarroProductosMapper extends EntityMapper<CarroProductosDTO, CarroProductos> {


    @Mapping(target = "idCarros", ignore = true)
    @Mapping(target = "idStockProductos", ignore = true)
    CarroProductos toEntity(CarroProductosDTO carroProductosDTO);

    default CarroProductos fromId(Long id) {
        if (id == null) {
            return null;
        }
        CarroProductos carroProductos = new CarroProductos();
        carroProductos.setId(id);
        return carroProductos;
    }
}
