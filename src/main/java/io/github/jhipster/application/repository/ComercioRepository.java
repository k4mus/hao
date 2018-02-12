package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Comercio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Comercio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComercioRepository extends JpaRepository<Comercio, Long> {

}
