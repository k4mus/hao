package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CarroDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Carro and its DTO CarroDTO.
 */
@Mapper(componentModel = "spring", uses = {CarroProductosMapper.class, ListaEntregaMapper.class})
public interface CarroMapper extends EntityMapper<CarroDTO, Carro> {

    @Mapping(source = "carroProductos.id", target = "carroProductosId")
    @Mapping(source = "listaEntrega.id", target = "listaEntregaId")
    CarroDTO toDto(Carro carro);

    @Mapping(target = "idClientes", ignore = true)
    @Mapping(target = "idMercados", ignore = true)
    @Mapping(target = "idMedioPagos", ignore = true)
    @Mapping(source = "carroProductosId", target = "carroProductos")
    @Mapping(source = "listaEntregaId", target = "listaEntrega")
    Carro toEntity(CarroDTO carroDTO);

    default Carro fromId(Long id) {
        if (id == null) {
            return null;
        }
        Carro carro = new Carro();
        carro.setId(id);
        return carro;
    }
}
