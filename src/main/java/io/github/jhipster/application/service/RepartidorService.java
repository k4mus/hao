package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.RepartidorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Repartidor.
 */
public interface RepartidorService {

    /**
     * Save a repartidor.
     *
     * @param repartidorDTO the entity to save
     * @return the persisted entity
     */
    RepartidorDTO save(RepartidorDTO repartidorDTO);

    /**
     * Get all the repartidors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RepartidorDTO> findAll(Pageable pageable);

    /**
     * Get the "id" repartidor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RepartidorDTO findOne(Long id);

    /**
     * Delete the "id" repartidor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
