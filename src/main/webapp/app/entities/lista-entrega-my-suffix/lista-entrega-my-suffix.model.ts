import { BaseEntity } from './../../shared';

export class ListaEntregaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idListaEntrega?: number,
        public idCarro?: number,
        public unbicacion?: string,
        public idEntregas?: BaseEntity[],
        public idCarros?: BaseEntity[],
    ) {
    }
}
