package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.MercadoService;
import io.github.jhipster.application.domain.Mercado;
import io.github.jhipster.application.repository.MercadoRepository;
import io.github.jhipster.application.service.dto.MercadoDTO;
import io.github.jhipster.application.service.mapper.MercadoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Mercado.
 */
@Service
@Transactional
public class MercadoServiceImpl implements MercadoService {

    private final Logger log = LoggerFactory.getLogger(MercadoServiceImpl.class);

    private final MercadoRepository mercadoRepository;

    private final MercadoMapper mercadoMapper;

    public MercadoServiceImpl(MercadoRepository mercadoRepository, MercadoMapper mercadoMapper) {
        this.mercadoRepository = mercadoRepository;
        this.mercadoMapper = mercadoMapper;
    }

    /**
     * Save a mercado.
     *
     * @param mercadoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MercadoDTO save(MercadoDTO mercadoDTO) {
        log.debug("Request to save Mercado : {}", mercadoDTO);
        Mercado mercado = mercadoMapper.toEntity(mercadoDTO);
        mercado = mercadoRepository.save(mercado);
        return mercadoMapper.toDto(mercado);
    }

    /**
     * Get all the mercados.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MercadoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Mercados");
        return mercadoRepository.findAll(pageable)
            .map(mercadoMapper::toDto);
    }

    /**
     * Get one mercado by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MercadoDTO findOne(Long id) {
        log.debug("Request to get Mercado : {}", id);
        Mercado mercado = mercadoRepository.findOne(id);
        return mercadoMapper.toDto(mercado);
    }

    /**
     * Delete the mercado by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mercado : {}", id);
        mercadoRepository.delete(id);
    }
}
