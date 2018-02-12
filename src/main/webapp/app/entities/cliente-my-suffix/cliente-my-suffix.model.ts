import { BaseEntity } from './../../shared';

export class ClienteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idCliente?: number,
        public idUsuario?: number,
        public idUsuarios?: BaseEntity[],
        public carroId?: number,
    ) {
    }
}
