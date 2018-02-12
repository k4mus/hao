package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ListaEntrega;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ListaEntrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaEntregaRepository extends JpaRepository<ListaEntrega, Long> {

}
