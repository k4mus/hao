import { BaseEntity } from './../../shared';

export class SucursalMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idSucursal?: number,
        public nombreSucursal?: string,
        public idComercio?: number,
        public idMercado?: number,
        public idComercios?: BaseEntity[],
        public idMecados?: BaseEntity[],
        public stockId?: number,
    ) {
    }
}
