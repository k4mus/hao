import { BaseEntity } from './../../shared';

export class StockMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idStock?: number,
        public nombreStock?: string,
        public idSucursal?: number,
        public idSucursals?: BaseEntity[],
        public stockProductoId?: number,
    ) {
    }
}
