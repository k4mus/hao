package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.RutaService;
import io.github.jhipster.application.domain.Ruta;
import io.github.jhipster.application.repository.RutaRepository;
import io.github.jhipster.application.service.dto.RutaDTO;
import io.github.jhipster.application.service.mapper.RutaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Ruta.
 */
@Service
@Transactional
public class RutaServiceImpl implements RutaService {

    private final Logger log = LoggerFactory.getLogger(RutaServiceImpl.class);

    private final RutaRepository rutaRepository;

    private final RutaMapper rutaMapper;

    public RutaServiceImpl(RutaRepository rutaRepository, RutaMapper rutaMapper) {
        this.rutaRepository = rutaRepository;
        this.rutaMapper = rutaMapper;
    }

    /**
     * Save a ruta.
     *
     * @param rutaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RutaDTO save(RutaDTO rutaDTO) {
        log.debug("Request to save Ruta : {}", rutaDTO);
        Ruta ruta = rutaMapper.toEntity(rutaDTO);
        ruta = rutaRepository.save(ruta);
        return rutaMapper.toDto(ruta);
    }

    /**
     * Get all the rutas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RutaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Rutas");
        return rutaRepository.findAll(pageable)
            .map(rutaMapper::toDto);
    }

    /**
     * Get one ruta by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RutaDTO findOne(Long id) {
        log.debug("Request to get Ruta : {}", id);
        Ruta ruta = rutaRepository.findOne(id);
        return rutaMapper.toDto(ruta);
    }

    /**
     * Delete the ruta by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ruta : {}", id);
        rutaRepository.delete(id);
    }
}
