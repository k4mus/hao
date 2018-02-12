package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.CarroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Carro.
 */
public interface CarroService {

    /**
     * Save a carro.
     *
     * @param carroDTO the entity to save
     * @return the persisted entity
     */
    CarroDTO save(CarroDTO carroDTO);

    /**
     * Get all the carros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CarroDTO> findAll(Pageable pageable);

    /**
     * Get the "id" carro.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CarroDTO findOne(Long id);

    /**
     * Delete the "id" carro.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
