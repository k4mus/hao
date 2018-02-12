import { BaseEntity } from './../../shared';

export class ProductoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idProducto?: number,
        public nombreProducto?: string,
        public stockProductoId?: number,
    ) {
    }
}
