package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Repartidor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Repartidor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepartidorRepository extends JpaRepository<Repartidor, Long> {

}
