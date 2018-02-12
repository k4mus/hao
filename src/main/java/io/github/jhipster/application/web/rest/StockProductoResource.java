package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.StockProductoService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.StockProductoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StockProducto.
 */
@RestController
@RequestMapping("/api")
public class StockProductoResource {

    private final Logger log = LoggerFactory.getLogger(StockProductoResource.class);

    private static final String ENTITY_NAME = "stockProducto";

    private final StockProductoService stockProductoService;

    public StockProductoResource(StockProductoService stockProductoService) {
        this.stockProductoService = stockProductoService;
    }

    /**
     * POST  /stock-productos : Create a new stockProducto.
     *
     * @param stockProductoDTO the stockProductoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stockProductoDTO, or with status 400 (Bad Request) if the stockProducto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stock-productos")
    @Timed
    public ResponseEntity<StockProductoDTO> createStockProducto(@RequestBody StockProductoDTO stockProductoDTO) throws URISyntaxException {
        log.debug("REST request to save StockProducto : {}", stockProductoDTO);
        if (stockProductoDTO.getId() != null) {
            throw new BadRequestAlertException("A new stockProducto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockProductoDTO result = stockProductoService.save(stockProductoDTO);
        return ResponseEntity.created(new URI("/api/stock-productos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stock-productos : Updates an existing stockProducto.
     *
     * @param stockProductoDTO the stockProductoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stockProductoDTO,
     * or with status 400 (Bad Request) if the stockProductoDTO is not valid,
     * or with status 500 (Internal Server Error) if the stockProductoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stock-productos")
    @Timed
    public ResponseEntity<StockProductoDTO> updateStockProducto(@RequestBody StockProductoDTO stockProductoDTO) throws URISyntaxException {
        log.debug("REST request to update StockProducto : {}", stockProductoDTO);
        if (stockProductoDTO.getId() == null) {
            return createStockProducto(stockProductoDTO);
        }
        StockProductoDTO result = stockProductoService.save(stockProductoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stockProductoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stock-productos : get all the stockProductos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stockProductos in body
     */
    @GetMapping("/stock-productos")
    @Timed
    public ResponseEntity<List<StockProductoDTO>> getAllStockProductos(Pageable pageable) {
        log.debug("REST request to get a page of StockProductos");
        Page<StockProductoDTO> page = stockProductoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stock-productos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stock-productos/:id : get the "id" stockProducto.
     *
     * @param id the id of the stockProductoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stockProductoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stock-productos/{id}")
    @Timed
    public ResponseEntity<StockProductoDTO> getStockProducto(@PathVariable Long id) {
        log.debug("REST request to get StockProducto : {}", id);
        StockProductoDTO stockProductoDTO = stockProductoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stockProductoDTO));
    }

    /**
     * DELETE  /stock-productos/:id : delete the "id" stockProducto.
     *
     * @param id the id of the stockProductoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stock-productos/{id}")
    @Timed
    public ResponseEntity<Void> deleteStockProducto(@PathVariable Long id) {
        log.debug("REST request to delete StockProducto : {}", id);
        stockProductoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
