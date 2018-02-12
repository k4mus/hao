package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.CarroProductosService;
import io.github.jhipster.application.domain.CarroProductos;
import io.github.jhipster.application.repository.CarroProductosRepository;
import io.github.jhipster.application.service.dto.CarroProductosDTO;
import io.github.jhipster.application.service.mapper.CarroProductosMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CarroProductos.
 */
@Service
@Transactional
public class CarroProductosServiceImpl implements CarroProductosService {

    private final Logger log = LoggerFactory.getLogger(CarroProductosServiceImpl.class);

    private final CarroProductosRepository carroProductosRepository;

    private final CarroProductosMapper carroProductosMapper;

    public CarroProductosServiceImpl(CarroProductosRepository carroProductosRepository, CarroProductosMapper carroProductosMapper) {
        this.carroProductosRepository = carroProductosRepository;
        this.carroProductosMapper = carroProductosMapper;
    }

    /**
     * Save a carroProductos.
     *
     * @param carroProductosDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CarroProductosDTO save(CarroProductosDTO carroProductosDTO) {
        log.debug("Request to save CarroProductos : {}", carroProductosDTO);
        CarroProductos carroProductos = carroProductosMapper.toEntity(carroProductosDTO);
        carroProductos = carroProductosRepository.save(carroProductos);
        return carroProductosMapper.toDto(carroProductos);
    }

    /**
     * Get all the carroProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CarroProductosDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CarroProductos");
        return carroProductosRepository.findAll(pageable)
            .map(carroProductosMapper::toDto);
    }

    /**
     * Get one carroProductos by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CarroProductosDTO findOne(Long id) {
        log.debug("Request to get CarroProductos : {}", id);
        CarroProductos carroProductos = carroProductosRepository.findOne(id);
        return carroProductosMapper.toDto(carroProductos);
    }

    /**
     * Delete the carroProductos by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CarroProductos : {}", id);
        carroProductosRepository.delete(id);
    }
}
