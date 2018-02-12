import { BaseEntity } from './../../shared';

export class UsuarioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idUsuario?: number,
        public nombreUsuario?: string,
        public clienteId?: number,
        public comercioId?: number,
        public repartidorId?: number,
    ) {
    }
}
