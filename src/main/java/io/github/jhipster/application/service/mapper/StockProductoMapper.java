package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.StockProductoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StockProducto and its DTO StockProductoDTO.
 */
@Mapper(componentModel = "spring", uses = {CarroProductosMapper.class})
public interface StockProductoMapper extends EntityMapper<StockProductoDTO, StockProducto> {

    @Mapping(source = "carroProductos.id", target = "carroProductosId")
    StockProductoDTO toDto(StockProducto stockProducto);

    @Mapping(target = "idProductos", ignore = true)
    @Mapping(target = "idStocks", ignore = true)
    @Mapping(source = "carroProductosId", target = "carroProductos")
    StockProducto toEntity(StockProductoDTO stockProductoDTO);

    default StockProducto fromId(Long id) {
        if (id == null) {
            return null;
        }
        StockProducto stockProducto = new StockProducto();
        stockProducto.setId(id);
        return stockProducto;
    }
}
