package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ListaEntregaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ListaEntrega.
 */
public interface ListaEntregaService {

    /**
     * Save a listaEntrega.
     *
     * @param listaEntregaDTO the entity to save
     * @return the persisted entity
     */
    ListaEntregaDTO save(ListaEntregaDTO listaEntregaDTO);

    /**
     * Get all the listaEntregas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ListaEntregaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" listaEntrega.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ListaEntregaDTO findOne(Long id);

    /**
     * Delete the "id" listaEntrega.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
