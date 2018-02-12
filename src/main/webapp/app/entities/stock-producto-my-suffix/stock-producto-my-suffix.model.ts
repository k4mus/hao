import { BaseEntity } from './../../shared';

export class StockProductoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idStockProducto?: number,
        public idStock?: number,
        public idProducto?: string,
        public cantidad?: number,
        public idProductos?: BaseEntity[],
        public idStocks?: BaseEntity[],
        public carroProductosId?: number,
    ) {
    }
}
