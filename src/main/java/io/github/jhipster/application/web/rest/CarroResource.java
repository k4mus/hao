package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.CarroService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.CarroDTO;
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
 * REST controller for managing Carro.
 */
@RestController
@RequestMapping("/api")
public class CarroResource {

    private final Logger log = LoggerFactory.getLogger(CarroResource.class);

    private static final String ENTITY_NAME = "carro";

    private final CarroService carroService;

    public CarroResource(CarroService carroService) {
        this.carroService = carroService;
    }

    /**
     * POST  /carros : Create a new carro.
     *
     * @param carroDTO the carroDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carroDTO, or with status 400 (Bad Request) if the carro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/carros")
    @Timed
    public ResponseEntity<CarroDTO> createCarro(@RequestBody CarroDTO carroDTO) throws URISyntaxException {
        log.debug("REST request to save Carro : {}", carroDTO);
        if (carroDTO.getId() != null) {
            throw new BadRequestAlertException("A new carro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarroDTO result = carroService.save(carroDTO);
        return ResponseEntity.created(new URI("/api/carros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /carros : Updates an existing carro.
     *
     * @param carroDTO the carroDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carroDTO,
     * or with status 400 (Bad Request) if the carroDTO is not valid,
     * or with status 500 (Internal Server Error) if the carroDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/carros")
    @Timed
    public ResponseEntity<CarroDTO> updateCarro(@RequestBody CarroDTO carroDTO) throws URISyntaxException {
        log.debug("REST request to update Carro : {}", carroDTO);
        if (carroDTO.getId() == null) {
            return createCarro(carroDTO);
        }
        CarroDTO result = carroService.save(carroDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carroDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /carros : get all the carros.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carros in body
     */
    @GetMapping("/carros")
    @Timed
    public ResponseEntity<List<CarroDTO>> getAllCarros(Pageable pageable) {
        log.debug("REST request to get a page of Carros");
        Page<CarroDTO> page = carroService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/carros");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /carros/:id : get the "id" carro.
     *
     * @param id the id of the carroDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carroDTO, or with status 404 (Not Found)
     */
    @GetMapping("/carros/{id}")
    @Timed
    public ResponseEntity<CarroDTO> getCarro(@PathVariable Long id) {
        log.debug("REST request to get Carro : {}", id);
        CarroDTO carroDTO = carroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carroDTO));
    }

    /**
     * DELETE  /carros/:id : delete the "id" carro.
     *
     * @param id the id of the carroDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/carros/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
        log.debug("REST request to delete Carro : {}", id);
        carroService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
