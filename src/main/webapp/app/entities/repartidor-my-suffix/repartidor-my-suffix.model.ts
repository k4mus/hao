import { BaseEntity } from './../../shared';

export class RepartidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idRepartidor?: number,
        public nombreRepartidor?: string,
        public idUsuario?: number,
        public idUsuarios?: BaseEntity[],
        public vehiculoId?: number,
    ) {
    }
}
