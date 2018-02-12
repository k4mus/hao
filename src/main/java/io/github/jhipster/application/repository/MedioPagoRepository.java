package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MedioPago;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MedioPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioPagoRepository extends JpaRepository<MedioPago, Long> {

}
