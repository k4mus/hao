package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.EntregaService;
import io.github.jhipster.application.domain.Entrega;
import io.github.jhipster.application.repository.EntregaRepository;
import io.github.jhipster.application.service.dto.EntregaDTO;
import io.github.jhipster.application.service.mapper.EntregaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Entrega.
 */
@Service
@Transactional
public class EntregaServiceImpl implements EntregaService {

    private final Logger log = LoggerFactory.getLogger(EntregaServiceImpl.class);

    private final EntregaRepository entregaRepository;

    private final EntregaMapper entregaMapper;

    public EntregaServiceImpl(EntregaRepository entregaRepository, EntregaMapper entregaMapper) {
        this.entregaRepository = entregaRepository;
        this.entregaMapper = entregaMapper;
    }

    /**
     * Save a entrega.
     *
     * @param entregaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EntregaDTO save(EntregaDTO entregaDTO) {
        log.debug("Request to save Entrega : {}", entregaDTO);
        Entrega entrega = entregaMapper.toEntity(entregaDTO);
        entrega = entregaRepository.save(entrega);
        return entregaMapper.toDto(entrega);
    }

    /**
     * Get all the entregas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EntregaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Entregas");
        return entregaRepository.findAll(pageable)
            .map(entregaMapper::toDto);
    }

    /**
     * Get one entrega by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EntregaDTO findOne(Long id) {
        log.debug("Request to get Entrega : {}", id);
        Entrega entrega = entregaRepository.findOne(id);
        return entregaMapper.toDto(entrega);
    }

    /**
     * Delete the entrega by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Entrega : {}", id);
        entregaRepository.delete(id);
    }
}
