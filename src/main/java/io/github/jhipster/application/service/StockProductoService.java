package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.StockProductoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing StockProducto.
 */
public interface StockProductoService {

    /**
     * Save a stockProducto.
     *
     * @param stockProductoDTO the entity to save
     * @return the persisted entity
     */
    StockProductoDTO save(StockProductoDTO stockProductoDTO);

    /**
     * Get all the stockProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StockProductoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" stockProducto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StockProductoDTO findOne(Long id);

    /**
     * Delete the "id" stockProducto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
