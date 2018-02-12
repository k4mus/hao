package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.MedioPagoService;
import io.github.jhipster.application.domain.MedioPago;
import io.github.jhipster.application.repository.MedioPagoRepository;
import io.github.jhipster.application.service.dto.MedioPagoDTO;
import io.github.jhipster.application.service.mapper.MedioPagoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing MedioPago.
 */
@Service
@Transactional
public class MedioPagoServiceImpl implements MedioPagoService {

    private final Logger log = LoggerFactory.getLogger(MedioPagoServiceImpl.class);

    private final MedioPagoRepository medioPagoRepository;

    private final MedioPagoMapper medioPagoMapper;

    public MedioPagoServiceImpl(MedioPagoRepository medioPagoRepository, MedioPagoMapper medioPagoMapper) {
        this.medioPagoRepository = medioPagoRepository;
        this.medioPagoMapper = medioPagoMapper;
    }

    /**
     * Save a medioPago.
     *
     * @param medioPagoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedioPagoDTO save(MedioPagoDTO medioPagoDTO) {
        log.debug("Request to save MedioPago : {}", medioPagoDTO);
        MedioPago medioPago = medioPagoMapper.toEntity(medioPagoDTO);
        medioPago = medioPagoRepository.save(medioPago);
        return medioPagoMapper.toDto(medioPago);
    }

    /**
     * Get all the medioPagos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MedioPagoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MedioPagos");
        return medioPagoRepository.findAll(pageable)
            .map(medioPagoMapper::toDto);
    }

    /**
     * Get one medioPago by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MedioPagoDTO findOne(Long id) {
        log.debug("Request to get MedioPago : {}", id);
        MedioPago medioPago = medioPagoRepository.findOne(id);
        return medioPagoMapper.toDto(medioPago);
    }

    /**
     * Delete the medioPago by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MedioPago : {}", id);
        medioPagoRepository.delete(id);
    }
}
