import { BaseEntity } from './../../shared';

export class ComercioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idComercio?: number,
        public nombreComercio?: string,
        public idUsuario?: number,
        public idDireccion?: number,
        public idUsuarios?: BaseEntity[],
        public sucursalId?: number,
    ) {
    }
}
