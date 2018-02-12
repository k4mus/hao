package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.RepartidorService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.RepartidorDTO;
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
 * REST controller for managing Repartidor.
 */
@RestController
@RequestMapping("/api")
public class RepartidorResource {

    private final Logger log = LoggerFactory.getLogger(RepartidorResource.class);

    private static final String ENTITY_NAME = "repartidor";

    private final RepartidorService repartidorService;

    public RepartidorResource(RepartidorService repartidorService) {
        this.repartidorService = repartidorService;
    }

    /**
     * POST  /repartidors : Create a new repartidor.
     *
     * @param repartidorDTO the repartidorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repartidorDTO, or with status 400 (Bad Request) if the repartidor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repartidors")
    @Timed
    public ResponseEntity<RepartidorDTO> createRepartidor(@RequestBody RepartidorDTO repartidorDTO) throws URISyntaxException {
        log.debug("REST request to save Repartidor : {}", repartidorDTO);
        if (repartidorDTO.getId() != null) {
            throw new BadRequestAlertException("A new repartidor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepartidorDTO result = repartidorService.save(repartidorDTO);
        return ResponseEntity.created(new URI("/api/repartidors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repartidors : Updates an existing repartidor.
     *
     * @param repartidorDTO the repartidorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repartidorDTO,
     * or with status 400 (Bad Request) if the repartidorDTO is not valid,
     * or with status 500 (Internal Server Error) if the repartidorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repartidors")
    @Timed
    public ResponseEntity<RepartidorDTO> updateRepartidor(@RequestBody RepartidorDTO repartidorDTO) throws URISyntaxException {
        log.debug("REST request to update Repartidor : {}", repartidorDTO);
        if (repartidorDTO.getId() == null) {
            return createRepartidor(repartidorDTO);
        }
        RepartidorDTO result = repartidorService.save(repartidorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repartidorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repartidors : get all the repartidors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of repartidors in body
     */
    @GetMapping("/repartidors")
    @Timed
    public ResponseEntity<List<RepartidorDTO>> getAllRepartidors(Pageable pageable) {
        log.debug("REST request to get a page of Repartidors");
        Page<RepartidorDTO> page = repartidorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/repartidors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /repartidors/:id : get the "id" repartidor.
     *
     * @param id the id of the repartidorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repartidorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/repartidors/{id}")
    @Timed
    public ResponseEntity<RepartidorDTO> getRepartidor(@PathVariable Long id) {
        log.debug("REST request to get Repartidor : {}", id);
        RepartidorDTO repartidorDTO = repartidorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(repartidorDTO));
    }

    /**
     * DELETE  /repartidors/:id : delete the "id" repartidor.
     *
     * @param id the id of the repartidorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repartidors/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepartidor(@PathVariable Long id) {
        log.debug("REST request to delete Repartidor : {}", id);
        repartidorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
