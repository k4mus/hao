package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.RepartidorService;
import io.github.jhipster.application.domain.Repartidor;
import io.github.jhipster.application.repository.RepartidorRepository;
import io.github.jhipster.application.service.dto.RepartidorDTO;
import io.github.jhipster.application.service.mapper.RepartidorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Repartidor.
 */
@Service
@Transactional
public class RepartidorServiceImpl implements RepartidorService {

    private final Logger log = LoggerFactory.getLogger(RepartidorServiceImpl.class);

    private final RepartidorRepository repartidorRepository;

    private final RepartidorMapper repartidorMapper;

    public RepartidorServiceImpl(RepartidorRepository repartidorRepository, RepartidorMapper repartidorMapper) {
        this.repartidorRepository = repartidorRepository;
        this.repartidorMapper = repartidorMapper;
    }

    /**
     * Save a repartidor.
     *
     * @param repartidorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RepartidorDTO save(RepartidorDTO repartidorDTO) {
        log.debug("Request to save Repartidor : {}", repartidorDTO);
        Repartidor repartidor = repartidorMapper.toEntity(repartidorDTO);
        repartidor = repartidorRepository.save(repartidor);
        return repartidorMapper.toDto(repartidor);
    }

    /**
     * Get all the repartidors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepartidorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Repartidors");
        return repartidorRepository.findAll(pageable)
            .map(repartidorMapper::toDto);
    }

    /**
     * Get one repartidor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RepartidorDTO findOne(Long id) {
        log.debug("Request to get Repartidor : {}", id);
        Repartidor repartidor = repartidorRepository.findOne(id);
        return repartidorMapper.toDto(repartidor);
    }

    /**
     * Delete the repartidor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Repartidor : {}", id);
        repartidorRepository.delete(id);
    }
}
