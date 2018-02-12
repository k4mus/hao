package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ListaEntregaService;
import io.github.jhipster.application.domain.ListaEntrega;
import io.github.jhipster.application.repository.ListaEntregaRepository;
import io.github.jhipster.application.service.dto.ListaEntregaDTO;
import io.github.jhipster.application.service.mapper.ListaEntregaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ListaEntrega.
 */
@Service
@Transactional
public class ListaEntregaServiceImpl implements ListaEntregaService {

    private final Logger log = LoggerFactory.getLogger(ListaEntregaServiceImpl.class);

    private final ListaEntregaRepository listaEntregaRepository;

    private final ListaEntregaMapper listaEntregaMapper;

    public ListaEntregaServiceImpl(ListaEntregaRepository listaEntregaRepository, ListaEntregaMapper listaEntregaMapper) {
        this.listaEntregaRepository = listaEntregaRepository;
        this.listaEntregaMapper = listaEntregaMapper;
    }

    /**
     * Save a listaEntrega.
     *
     * @param listaEntregaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ListaEntregaDTO save(ListaEntregaDTO listaEntregaDTO) {
        log.debug("Request to save ListaEntrega : {}", listaEntregaDTO);
        ListaEntrega listaEntrega = listaEntregaMapper.toEntity(listaEntregaDTO);
        listaEntrega = listaEntregaRepository.save(listaEntrega);
        return listaEntregaMapper.toDto(listaEntrega);
    }

    /**
     * Get all the listaEntregas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ListaEntregaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ListaEntregas");
        return listaEntregaRepository.findAll(pageable)
            .map(listaEntregaMapper::toDto);
    }

    /**
     * Get one listaEntrega by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ListaEntregaDTO findOne(Long id) {
        log.debug("Request to get ListaEntrega : {}", id);
        ListaEntrega listaEntrega = listaEntregaRepository.findOne(id);
        return listaEntregaMapper.toDto(listaEntrega);
    }

    /**
     * Delete the listaEntrega by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ListaEntrega : {}", id);
        listaEntregaRepository.delete(id);
    }
}
