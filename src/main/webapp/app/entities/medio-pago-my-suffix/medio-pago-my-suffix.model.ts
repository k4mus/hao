import { BaseEntity } from './../../shared';

export class MedioPagoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idMedioPago?: number,
        public nombreMedioPago?: string,
        public carroId?: number,
    ) {
    }
}
