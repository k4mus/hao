package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.CarroProductosService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.CarroProductosDTO;
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
 * REST controller for managing CarroProductos.
 */
@RestController
@RequestMapping("/api")
public class CarroProductosResource {

    private final Logger log = LoggerFactory.getLogger(CarroProductosResource.class);

    private static final String ENTITY_NAME = "carroProductos";

    private final CarroProductosService carroProductosService;

    public CarroProductosResource(CarroProductosService carroProductosService) {
        this.carroProductosService = carroProductosService;
    }

    /**
     * POST  /carro-productos : Create a new carroProductos.
     *
     * @param carroProductosDTO the carroProductosDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carroProductosDTO, or with status 400 (Bad Request) if the carroProductos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/carro-productos")
    @Timed
    public ResponseEntity<CarroProductosDTO> createCarroProductos(@RequestBody CarroProductosDTO carroProductosDTO) throws URISyntaxException {
        log.debug("REST request to save CarroProductos : {}", carroProductosDTO);
        if (carroProductosDTO.getId() != null) {
            throw new BadRequestAlertException("A new carroProductos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarroProductosDTO result = carroProductosService.save(carroProductosDTO);
        return ResponseEntity.created(new URI("/api/carro-productos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /carro-productos : Updates an existing carroProductos.
     *
     * @param carroProductosDTO the carroProductosDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carroProductosDTO,
     * or with status 400 (Bad Request) if the carroProductosDTO is not valid,
     * or with status 500 (Internal Server Error) if the carroProductosDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/carro-productos")
    @Timed
    public ResponseEntity<CarroProductosDTO> updateCarroProductos(@RequestBody CarroProductosDTO carroProductosDTO) throws URISyntaxException {
        log.debug("REST request to update CarroProductos : {}", carroProductosDTO);
        if (carroProductosDTO.getId() == null) {
            return createCarroProductos(carroProductosDTO);
        }
        CarroProductosDTO result = carroProductosService.save(carroProductosDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carroProductosDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /carro-productos : get all the carroProductos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carroProductos in body
     */
    @GetMapping("/carro-productos")
    @Timed
    public ResponseEntity<List<CarroProductosDTO>> getAllCarroProductos(Pageable pageable) {
        log.debug("REST request to get a page of CarroProductos");
        Page<CarroProductosDTO> page = carroProductosService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/carro-productos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /carro-productos/:id : get the "id" carroProductos.
     *
     * @param id the id of the carroProductosDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carroProductosDTO, or with status 404 (Not Found)
     */
    @GetMapping("/carro-productos/{id}")
    @Timed
    public ResponseEntity<CarroProductosDTO> getCarroProductos(@PathVariable Long id) {
        log.debug("REST request to get CarroProductos : {}", id);
        CarroProductosDTO carroProductosDTO = carroProductosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carroProductosDTO));
    }

    /**
     * DELETE  /carro-productos/:id : delete the "id" carroProductos.
     *
     * @param id the id of the carroProductosDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/carro-productos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarroProductos(@PathVariable Long id) {
        log.debug("REST request to delete CarroProductos : {}", id);
        carroProductosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
