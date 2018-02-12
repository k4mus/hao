package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ComercioDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Comercio.
 */
public interface ComercioService {

    /**
     * Save a comercio.
     *
     * @param comercioDTO the entity to save
     * @return the persisted entity
     */
    ComercioDTO save(ComercioDTO comercioDTO);

    /**
     * Get all the comercios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComercioDTO> findAll(Pageable pageable);

    /**
     * Get the "id" comercio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComercioDTO findOne(Long id);

    /**
     * Delete the "id" comercio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
