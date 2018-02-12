package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.ComercioService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.ComercioDTO;
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
 * REST controller for managing Comercio.
 */
@RestController
@RequestMapping("/api")
public class ComercioResource {

    private final Logger log = LoggerFactory.getLogger(ComercioResource.class);

    private static final String ENTITY_NAME = "comercio";

    private final ComercioService comercioService;

    public ComercioResource(ComercioService comercioService) {
        this.comercioService = comercioService;
    }

    /**
     * POST  /comercios : Create a new comercio.
     *
     * @param comercioDTO the comercioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comercioDTO, or with status 400 (Bad Request) if the comercio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comercios")
    @Timed
    public ResponseEntity<ComercioDTO> createComercio(@RequestBody ComercioDTO comercioDTO) throws URISyntaxException {
        log.debug("REST request to save Comercio : {}", comercioDTO);
        if (comercioDTO.getId() != null) {
            throw new BadRequestAlertException("A new comercio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComercioDTO result = comercioService.save(comercioDTO);
        return ResponseEntity.created(new URI("/api/comercios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comercios : Updates an existing comercio.
     *
     * @param comercioDTO the comercioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comercioDTO,
     * or with status 400 (Bad Request) if the comercioDTO is not valid,
     * or with status 500 (Internal Server Error) if the comercioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comercios")
    @Timed
    public ResponseEntity<ComercioDTO> updateComercio(@RequestBody ComercioDTO comercioDTO) throws URISyntaxException {
        log.debug("REST request to update Comercio : {}", comercioDTO);
        if (comercioDTO.getId() == null) {
            return createComercio(comercioDTO);
        }
        ComercioDTO result = comercioService.save(comercioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comercioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comercios : get all the comercios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of comercios in body
     */
    @GetMapping("/comercios")
    @Timed
    public ResponseEntity<List<ComercioDTO>> getAllComercios(Pageable pageable) {
        log.debug("REST request to get a page of Comercios");
        Page<ComercioDTO> page = comercioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comercios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /comercios/:id : get the "id" comercio.
     *
     * @param id the id of the comercioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comercioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/comercios/{id}")
    @Timed
    public ResponseEntity<ComercioDTO> getComercio(@PathVariable Long id) {
        log.debug("REST request to get Comercio : {}", id);
        ComercioDTO comercioDTO = comercioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comercioDTO));
    }

    /**
     * DELETE  /comercios/:id : delete the "id" comercio.
     *
     * @param id the id of the comercioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comercios/{id}")
    @Timed
    public ResponseEntity<Void> deleteComercio(@PathVariable Long id) {
        log.debug("REST request to delete Comercio : {}", id);
        comercioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
