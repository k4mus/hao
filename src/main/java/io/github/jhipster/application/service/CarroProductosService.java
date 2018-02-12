package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.CarroProductosDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CarroProductos.
 */
public interface CarroProductosService {

    /**
     * Save a carroProductos.
     *
     * @param carroProductosDTO the entity to save
     * @return the persisted entity
     */
    CarroProductosDTO save(CarroProductosDTO carroProductosDTO);

    /**
     * Get all the carroProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CarroProductosDTO> findAll(Pageable pageable);

    /**
     * Get the "id" carroProductos.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CarroProductosDTO findOne(Long id);

    /**
     * Delete the "id" carroProductos.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
