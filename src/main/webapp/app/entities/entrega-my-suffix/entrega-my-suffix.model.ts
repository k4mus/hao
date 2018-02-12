import { BaseEntity } from './../../shared';

export class EntregaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idEntrega?: number,
        public idVehiculo?: number,
        public idRuta?: number,
        public idVehiculos?: BaseEntity[],
        public idRutas?: BaseEntity[],
        public listaEntregaId?: number,
    ) {
    }
}
