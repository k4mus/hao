package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.RutaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Ruta.
 */
public interface RutaService {

    /**
     * Save a ruta.
     *
     * @param rutaDTO the entity to save
     * @return the persisted entity
     */
    RutaDTO save(RutaDTO rutaDTO);

    /**
     * Get all the rutas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RutaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" ruta.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RutaDTO findOne(Long id);

    /**
     * Delete the "id" ruta.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
