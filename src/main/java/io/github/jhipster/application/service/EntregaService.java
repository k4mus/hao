package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.EntregaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Entrega.
 */
public interface EntregaService {

    /**
     * Save a entrega.
     *
     * @param entregaDTO the entity to save
     * @return the persisted entity
     */
    EntregaDTO save(EntregaDTO entregaDTO);

    /**
     * Get all the entregas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EntregaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" entrega.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EntregaDTO findOne(Long id);

    /**
     * Delete the "id" entrega.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
