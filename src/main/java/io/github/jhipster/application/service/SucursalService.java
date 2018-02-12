package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.SucursalDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Sucursal.
 */
public interface SucursalService {

    /**
     * Save a sucursal.
     *
     * @param sucursalDTO the entity to save
     * @return the persisted entity
     */
    SucursalDTO save(SucursalDTO sucursalDTO);

    /**
     * Get all the sucursals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SucursalDTO> findAll(Pageable pageable);

    /**
     * Get the "id" sucursal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SucursalDTO findOne(Long id);

    /**
     * Delete the "id" sucursal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
