package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ComercioService;
import io.github.jhipster.application.domain.Comercio;
import io.github.jhipster.application.repository.ComercioRepository;
import io.github.jhipster.application.service.dto.ComercioDTO;
import io.github.jhipster.application.service.mapper.ComercioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Comercio.
 */
@Service
@Transactional
public class ComercioServiceImpl implements ComercioService {

    private final Logger log = LoggerFactory.getLogger(ComercioServiceImpl.class);

    private final ComercioRepository comercioRepository;

    private final ComercioMapper comercioMapper;

    public ComercioServiceImpl(ComercioRepository comercioRepository, ComercioMapper comercioMapper) {
        this.comercioRepository = comercioRepository;
        this.comercioMapper = comercioMapper;
    }

    /**
     * Save a comercio.
     *
     * @param comercioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComercioDTO save(ComercioDTO comercioDTO) {
        log.debug("Request to save Comercio : {}", comercioDTO);
        Comercio comercio = comercioMapper.toEntity(comercioDTO);
        comercio = comercioRepository.save(comercio);
        return comercioMapper.toDto(comercio);
    }

    /**
     * Get all the comercios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComercioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Comercios");
        return comercioRepository.findAll(pageable)
            .map(comercioMapper::toDto);
    }

    /**
     * Get one comercio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComercioDTO findOne(Long id) {
        log.debug("Request to get Comercio : {}", id);
        Comercio comercio = comercioRepository.findOne(id);
        return comercioMapper.toDto(comercio);
    }

    /**
     * Delete the comercio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Comercio : {}", id);
        comercioRepository.delete(id);
    }
}
