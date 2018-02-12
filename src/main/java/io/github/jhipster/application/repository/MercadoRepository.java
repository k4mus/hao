package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Mercado;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mercado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MercadoRepository extends JpaRepository<Mercado, Long> {

}
