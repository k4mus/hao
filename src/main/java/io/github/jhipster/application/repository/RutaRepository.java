package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Ruta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ruta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {

}
