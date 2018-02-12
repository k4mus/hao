package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ClienteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Cliente.
 */
public interface ClienteService {

    /**
     * Save a cliente.
     *
     * @param clienteDTO the entity to save
     * @return the persisted entity
     */
    ClienteDTO save(ClienteDTO clienteDTO);

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ClienteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cliente.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ClienteDTO findOne(Long id);

    /**
     * Delete the "id" cliente.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
