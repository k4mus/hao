package io.github.jhipster.application.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Cliente.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Cliente.class.getName() + ".idUsuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Direccion.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Comercio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Comercio.class.getName() + ".idUsuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Repartidor.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Repartidor.class.getName() + ".idUsuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sucursal.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sucursal.class.getName() + ".idComercios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sucursal.class.getName() + ".idMecados", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Mercado.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Producto.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Stock.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Stock.class.getName() + ".idSucursals", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.StockProducto.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.StockProducto.class.getName() + ".idProductos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.StockProducto.class.getName() + ".idStocks", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Carro.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Carro.class.getName() + ".idClientes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Carro.class.getName() + ".idMercados", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Carro.class.getName() + ".idMedioPagos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.CarroProductos.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.CarroProductos.class.getName() + ".idCarros", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.CarroProductos.class.getName() + ".idStockProductos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MedioPago.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ruta.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Vehiculo.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Vehiculo.class.getName() + ".idRepartidors", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Entrega.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Entrega.class.getName() + ".idVehiculos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Entrega.class.getName() + ".idRutas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ListaEntrega.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ListaEntrega.class.getName() + ".idEntregas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ListaEntrega.class.getName() + ".idCarros", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
