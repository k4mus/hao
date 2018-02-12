package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.CarroService;
import io.github.jhipster.application.domain.Carro;
import io.github.jhipster.application.repository.CarroRepository;
import io.github.jhipster.application.service.dto.CarroDTO;
import io.github.jhipster.application.service.mapper.CarroMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Carro.
 */
@Service
@Transactional
public class CarroServiceImpl implements CarroService {

    private final Logger log = LoggerFactory.getLogger(CarroServiceImpl.class);

    private final CarroRepository carroRepository;

    private final CarroMapper carroMapper;

    public CarroServiceImpl(CarroRepository carroRepository, CarroMapper carroMapper) {
        this.carroRepository = carroRepository;
        this.carroMapper = carroMapper;
    }

    /**
     * Save a carro.
     *
     * @param carroDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CarroDTO save(CarroDTO carroDTO) {
        log.debug("Request to save Carro : {}", carroDTO);
        Carro carro = carroMapper.toEntity(carroDTO);
        carro = carroRepository.save(carro);
        return carroMapper.toDto(carro);
    }

    /**
     * Get all the carros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CarroDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Carros");
        return carroRepository.findAll(pageable)
            .map(carroMapper::toDto);
    }

    /**
     * Get one carro by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CarroDTO findOne(Long id) {
        log.debug("Request to get Carro : {}", id);
        Carro carro = carroRepository.findOne(id);
        return carroMapper.toDto(carro);
    }

    /**
     * Delete the carro by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Carro : {}", id);
        carroRepository.delete(id);
    }
}
