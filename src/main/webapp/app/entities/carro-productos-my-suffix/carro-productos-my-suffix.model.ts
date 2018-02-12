import { BaseEntity } from './../../shared';

export class CarroProductosMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idCarro?: number,
        public idStockProducto?: number,
        public precio?: number,
        public descuento?: number,
        public idDireccionCliente?: number,
        public idCarros?: BaseEntity[],
        public idStockProductos?: BaseEntity[],
    ) {
    }
}
