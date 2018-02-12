package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.StockProducto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StockProducto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockProductoRepository extends JpaRepository<StockProducto, Long> {

}
