import { BaseEntity } from './../../shared';

export class RutaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idRuta?: number,
        public nombreRuta?: number,
        public ubicacionOrigen?: string,
        public ubicacionDestino?: string,
        public entregaId?: number,
    ) {
    }
}
