import { BaseEntity } from './../../shared';

export class MercadoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idMercado?: number,
        public nombreMercado?: string,
        public ubicacion?: string,
        public sucursalId?: number,
        public carroId?: number,
    ) {
    }
}
