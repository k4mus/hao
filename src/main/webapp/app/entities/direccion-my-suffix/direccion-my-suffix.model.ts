import { BaseEntity } from './../../shared';

export class DireccionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public idDireccion?: number,
        public ubicacion?: string,
        public calle?: string,
        public numero?: number,
        public dpto?: string,
        public poblacion?: string,
        public idComuna?: number,
    ) {
    }
}
