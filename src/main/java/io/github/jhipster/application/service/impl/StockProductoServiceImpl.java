package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.StockProductoService;
import io.github.jhipster.application.domain.StockProducto;
import io.github.jhipster.application.repository.StockProductoRepository;
import io.github.jhipster.application.service.dto.StockProductoDTO;
import io.github.jhipster.application.service.mapper.StockProductoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing StockProducto.
 */
@Service
@Transactional
public class StockProductoServiceImpl implements StockProductoService {

    private final Logger log = LoggerFactory.getLogger(StockProductoServiceImpl.class);

    private final StockProductoRepository stockProductoRepository;

    private final StockProductoMapper stockProductoMapper;

    public StockProductoServiceImpl(StockProductoRepository stockProductoRepository, StockProductoMapper stockProductoMapper) {
        this.stockProductoRepository = stockProductoRepository;
        this.stockProductoMapper = stockProductoMapper;
    }

    /**
     * Save a stockProducto.
     *
     * @param stockProductoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StockProductoDTO save(StockProductoDTO stockProductoDTO) {
        log.debug("Request to save StockProducto : {}", stockProductoDTO);
        StockProducto stockProducto = stockProductoMapper.toEntity(stockProductoDTO);
        stockProducto = stockProductoRepository.save(stockProducto);
        return stockProductoMapper.toDto(stockProducto);
    }

    /**
     * Get all the stockProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StockProductoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StockProductos");
        return stockProductoRepository.findAll(pageable)
            .map(stockProductoMapper::toDto);
    }

    /**
     * Get one stockProducto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StockProductoDTO findOne(Long id) {
        log.debug("Request to get StockProducto : {}", id);
        StockProducto stockProducto = stockProductoRepository.findOne(id);
        return stockProductoMapper.toDto(stockProducto);
    }

    /**
     * Delete the stockProducto by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StockProducto : {}", id);
        stockProductoRepository.delete(id);
    }
}
