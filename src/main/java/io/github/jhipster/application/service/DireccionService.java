package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.DireccionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Direccion.
 */
public interface DireccionService {

    /**
     * Save a direccion.
     *
     * @param direccionDTO the entity to save
     * @return the persisted entity
     */
    DireccionDTO save(DireccionDTO direccionDTO);

    /**
     * Get all the direccions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DireccionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" direccion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DireccionDTO findOne(Long id);

    /**
     * Delete the "id" direccion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
