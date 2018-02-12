package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.SucursalService;
import io.github.jhipster.application.domain.Sucursal;
import io.github.jhipster.application.repository.SucursalRepository;
import io.github.jhipster.application.service.dto.SucursalDTO;
import io.github.jhipster.application.service.mapper.SucursalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Sucursal.
 */
@Service
@Transactional
public class SucursalServiceImpl implements SucursalService {

    private final Logger log = LoggerFactory.getLogger(SucursalServiceImpl.class);

    private final SucursalRepository sucursalRepository;

    private final SucursalMapper sucursalMapper;

    public SucursalServiceImpl(SucursalRepository sucursalRepository, SucursalMapper sucursalMapper) {
        this.sucursalRepository = sucursalRepository;
        this.sucursalMapper = sucursalMapper;
    }

    /**
     * Save a sucursal.
     *
     * @param sucursalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SucursalDTO save(SucursalDTO sucursalDTO) {
        log.debug("Request to save Sucursal : {}", sucursalDTO);
        Sucursal sucursal = sucursalMapper.toEntity(sucursalDTO);
        sucursal = sucursalRepository.save(sucursal);
        return sucursalMapper.toDto(sucursal);
    }

    /**
     * Get all the sucursals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SucursalDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Sucursals");
        return sucursalRepository.findAll(pageable)
            .map(sucursalMapper::toDto);
    }

    /**
     * Get one sucursal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SucursalDTO findOne(Long id) {
        log.debug("Request to get Sucursal : {}", id);
        Sucursal sucursal = sucursalRepository.findOne(id);
        return sucursalMapper.toDto(sucursal);
    }

    /**
     * Delete the sucursal by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sucursal : {}", id);
        sucursalRepository.delete(id);
    }
}
