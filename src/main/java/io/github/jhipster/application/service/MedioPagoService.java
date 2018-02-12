package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.MedioPagoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing MedioPago.
 */
public interface MedioPagoService {

    /**
     * Save a medioPago.
     *
     * @param medioPagoDTO the entity to save
     * @return the persisted entity
     */
    MedioPagoDTO save(MedioPagoDTO medioPagoDTO);

    /**
     * Get all the medioPagos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MedioPagoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" medioPago.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MedioPagoDTO findOne(Long id);

    /**
     * Delete the "id" medioPago.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
