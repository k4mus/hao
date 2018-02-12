import { BaseEntity } from './../../shared';

export class CarroMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idCarro?: number,
        public idCliente?: number,
        public idMercado?: number,
        public idMedioPago?: number,
        public fecha?: string,
        public idClientes?: BaseEntity[],
        public idMercados?: BaseEntity[],
        public idMedioPagos?: BaseEntity[],
        public carroProductosId?: number,
        public listaEntregaId?: number,
    ) {
    }
}
