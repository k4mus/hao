package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.RutaService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.RutaDTO;
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
 * REST controller for managing Ruta.
 */
@RestController
@RequestMapping("/api")
public class RutaResource {

    private final Logger log = LoggerFactory.getLogger(RutaResource.class);

    private static final String ENTITY_NAME = "ruta";

    private final RutaService rutaService;

    public RutaResource(RutaService rutaService) {
        this.rutaService = rutaService;
    }

    /**
     * POST  /rutas : Create a new ruta.
     *
     * @param rutaDTO the rutaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rutaDTO, or with status 400 (Bad Request) if the ruta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rutas")
    @Timed
    public ResponseEntity<RutaDTO> createRuta(@RequestBody RutaDTO rutaDTO) throws URISyntaxException {
        log.debug("REST request to save Ruta : {}", rutaDTO);
        if (rutaDTO.getId() != null) {
            throw new BadRequestAlertException("A new ruta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RutaDTO result = rutaService.save(rutaDTO);
        return ResponseEntity.created(new URI("/api/rutas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rutas : Updates an existing ruta.
     *
     * @param rutaDTO the rutaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rutaDTO,
     * or with status 400 (Bad Request) if the rutaDTO is not valid,
     * or with status 500 (Internal Server Error) if the rutaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rutas")
    @Timed
    public ResponseEntity<RutaDTO> updateRuta(@RequestBody RutaDTO rutaDTO) throws URISyntaxException {
        log.debug("REST request to update Ruta : {}", rutaDTO);
        if (rutaDTO.getId() == null) {
            return createRuta(rutaDTO);
        }
        RutaDTO result = rutaService.save(rutaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rutaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rutas : get all the rutas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rutas in body
     */
    @GetMapping("/rutas")
    @Timed
    public ResponseEntity<List<RutaDTO>> getAllRutas(Pageable pageable) {
        log.debug("REST request to get a page of Rutas");
        Page<RutaDTO> page = rutaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rutas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rutas/:id : get the "id" ruta.
     *
     * @param id the id of the rutaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rutaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/rutas/{id}")
    @Timed
    public ResponseEntity<RutaDTO> getRuta(@PathVariable Long id) {
        log.debug("REST request to get Ruta : {}", id);
        RutaDTO rutaDTO = rutaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rutaDTO));
    }

    /**
     * DELETE  /rutas/:id : delete the "id" ruta.
     *
     * @param id the id of the rutaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rutas/{id}")
    @Timed
    public ResponseEntity<Void> deleteRuta(@PathVariable Long id) {
        log.debug("REST request to delete Ruta : {}", id);
        rutaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
