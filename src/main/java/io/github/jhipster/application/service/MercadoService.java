package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.MercadoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Mercado.
 */
public interface MercadoService {

    /**
     * Save a mercado.
     *
     * @param mercadoDTO the entity to save
     * @return the persisted entity
     */
    MercadoDTO save(MercadoDTO mercadoDTO);

    /**
     * Get all the mercados.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MercadoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" mercado.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MercadoDTO findOne(Long id);

    /**
     * Delete the "id" mercado.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
