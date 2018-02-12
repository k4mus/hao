package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.SucursalService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.SucursalDTO;
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
 * REST controller for managing Sucursal.
 */
@RestController
@RequestMapping("/api")
public class SucursalResource {

    private final Logger log = LoggerFactory.getLogger(SucursalResource.class);

    private static final String ENTITY_NAME = "sucursal";

    private final SucursalService sucursalService;

    public SucursalResource(SucursalService sucursalService) {
        this.sucursalService = sucursalService;
    }

    /**
     * POST  /sucursals : Create a new sucursal.
     *
     * @param sucursalDTO the sucursalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sucursalDTO, or with status 400 (Bad Request) if the sucursal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sucursals")
    @Timed
    public ResponseEntity<SucursalDTO> createSucursal(@RequestBody SucursalDTO sucursalDTO) throws URISyntaxException {
        log.debug("REST request to save Sucursal : {}", sucursalDTO);
        if (sucursalDTO.getId() != null) {
            throw new BadRequestAlertException("A new sucursal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SucursalDTO result = sucursalService.save(sucursalDTO);
        return ResponseEntity.created(new URI("/api/sucursals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sucursals : Updates an existing sucursal.
     *
     * @param sucursalDTO the sucursalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sucursalDTO,
     * or with status 400 (Bad Request) if the sucursalDTO is not valid,
     * or with status 500 (Internal Server Error) if the sucursalDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sucursals")
    @Timed
    public ResponseEntity<SucursalDTO> updateSucursal(@RequestBody SucursalDTO sucursalDTO) throws URISyntaxException {
        log.debug("REST request to update Sucursal : {}", sucursalDTO);
        if (sucursalDTO.getId() == null) {
            return createSucursal(sucursalDTO);
        }
        SucursalDTO result = sucursalService.save(sucursalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sucursalDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sucursals : get all the sucursals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sucursals in body
     */
    @GetMapping("/sucursals")
    @Timed
    public ResponseEntity<List<SucursalDTO>> getAllSucursals(Pageable pageable) {
        log.debug("REST request to get a page of Sucursals");
        Page<SucursalDTO> page = sucursalService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sucursals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sucursals/:id : get the "id" sucursal.
     *
     * @param id the id of the sucursalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sucursalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<SucursalDTO> getSucursal(@PathVariable Long id) {
        log.debug("REST request to get Sucursal : {}", id);
        SucursalDTO sucursalDTO = sucursalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sucursalDTO));
    }

    /**
     * DELETE  /sucursals/:id : delete the "id" sucursal.
     *
     * @param id the id of the sucursalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<Void> deleteSucursal(@PathVariable Long id) {
        log.debug("REST request to delete Sucursal : {}", id);
        sucursalService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
