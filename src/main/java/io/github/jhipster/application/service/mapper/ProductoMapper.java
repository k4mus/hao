package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ProductoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Producto and its DTO ProductoDTO.
 */
@Mapper(componentModel = "spring", uses = {StockProductoMapper.class})
public interface ProductoMapper extends EntityMapper<ProductoDTO, Producto> {

    @Mapping(source = "stockProducto.id", target = "stockProductoId")
    ProductoDTO toDto(Producto producto);

    @Mapping(source = "stockProductoId", target = "stockProducto")
    Producto toEntity(ProductoDTO productoDTO);

    default Producto fromId(Long id) {
        if (id == null) {
            return null;
        }
        Producto producto = new Producto();
        producto.setId(id);
        return producto;
    }
}
