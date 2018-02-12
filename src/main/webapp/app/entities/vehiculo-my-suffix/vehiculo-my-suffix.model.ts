import { BaseEntity } from './../../shared';

export class VehiculoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idVehiculo?: number,
        public idRepartidor?: number,
        public nombreVehiculo?: string,
        public patente?: string,
        public consumo?: string,
        public idRepartidors?: BaseEntity[],
        public entregaId?: number,
    ) {
    }
}
