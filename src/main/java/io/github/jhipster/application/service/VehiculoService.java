package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.VehiculoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Vehiculo.
 */
public interface VehiculoService {

    /**
     * Save a vehiculo.
     *
     * @param vehiculoDTO the entity to save
     * @return the persisted entity
     */
    VehiculoDTO save(VehiculoDTO vehiculoDTO);

    /**
     * Get all the vehiculos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VehiculoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" vehiculo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VehiculoDTO findOne(Long id);

    /**
     * Delete the "id" vehiculo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
