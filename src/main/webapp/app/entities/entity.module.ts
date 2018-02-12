import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HaoUsuarioMySuffixModule } from './usuario-my-suffix/usuario-my-suffix.module';
import { HaoClienteMySuffixModule } from './cliente-my-suffix/cliente-my-suffix.module';
import { HaoDireccionMySuffixModule } from './direccion-my-suffix/direccion-my-suffix.module';
import { HaoComercioMySuffixModule } from './comercio-my-suffix/comercio-my-suffix.module';
import { HaoRepartidorMySuffixModule } from './repartidor-my-suffix/repartidor-my-suffix.module';
import { HaoSucursalMySuffixModule } from './sucursal-my-suffix/sucursal-my-suffix.module';
import { HaoMercadoMySuffixModule } from './mercado-my-suffix/mercado-my-suffix.module';
import { HaoProductoMySuffixModule } from './producto-my-suffix/producto-my-suffix.module';
import { HaoStockMySuffixModule } from './stock-my-suffix/stock-my-suffix.module';
import { HaoStockProductoMySuffixModule } from './stock-producto-my-suffix/stock-producto-my-suffix.module';
import { HaoCarroMySuffixModule } from './carro-my-suffix/carro-my-suffix.module';
import { HaoCarroProductosMySuffixModule } from './carro-productos-my-suffix/carro-productos-my-suffix.module';
import { HaoMedioPagoMySuffixModule } from './medio-pago-my-suffix/medio-pago-my-suffix.module';
import { HaoRutaMySuffixModule } from './ruta-my-suffix/ruta-my-suffix.module';
import { HaoVehiculoMySuffixModule } from './vehiculo-my-suffix/vehiculo-my-suffix.module';
import { HaoEntregaMySuffixModule } from './entrega-my-suffix/entrega-my-suffix.module';
import { HaoListaEntregaMySuffixModule } from './lista-entrega-my-suffix/lista-entrega-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HaoUsuarioMySuffixModule,
        HaoClienteMySuffixModule,
        HaoDireccionMySuffixModule,
        HaoComercioMySuffixModule,
        HaoRepartidorMySuffixModule,
        HaoSucursalMySuffixModule,
        HaoMercadoMySuffixModule,
        HaoProductoMySuffixModule,
        HaoStockMySuffixModule,
        HaoStockProductoMySuffixModule,
        HaoCarroMySuffixModule,
        HaoCarroProductosMySuffixModule,
        HaoMedioPagoMySuffixModule,
        HaoRutaMySuffixModule,
        HaoVehiculoMySuffixModule,
        HaoEntregaMySuffixModule,
        HaoListaEntregaMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoEntityModule {}
