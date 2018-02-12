package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.EntregaService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.EntregaDTO;
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
 * REST controller for managing Entrega.
 */
@RestController
@RequestMapping("/api")
public class EntregaResource {

    private final Logger log = LoggerFactory.getLogger(EntregaResource.class);

    private static final String ENTITY_NAME = "entrega";

    private final EntregaService entregaService;

    public EntregaResource(EntregaService entregaService) {
        this.entregaService = entregaService;
    }

    /**
     * POST  /entregas : Create a new entrega.
     *
     * @param entregaDTO the entregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entregaDTO, or with status 400 (Bad Request) if the entrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entregas")
    @Timed
    public ResponseEntity<EntregaDTO> createEntrega(@RequestBody EntregaDTO entregaDTO) throws URISyntaxException {
        log.debug("REST request to save Entrega : {}", entregaDTO);
        if (entregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new entrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntregaDTO result = entregaService.save(entregaDTO);
        return ResponseEntity.created(new URI("/api/entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entregas : Updates an existing entrega.
     *
     * @param entregaDTO the entregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entregaDTO,
     * or with status 400 (Bad Request) if the entregaDTO is not valid,
     * or with status 500 (Internal Server Error) if the entregaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entregas")
    @Timed
    public ResponseEntity<EntregaDTO> updateEntrega(@RequestBody EntregaDTO entregaDTO) throws URISyntaxException {
        log.debug("REST request to update Entrega : {}", entregaDTO);
        if (entregaDTO.getId() == null) {
            return createEntrega(entregaDTO);
        }
        EntregaDTO result = entregaService.save(entregaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entregaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entregas : get all the entregas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of entregas in body
     */
    @GetMapping("/entregas")
    @Timed
    public ResponseEntity<List<EntregaDTO>> getAllEntregas(Pageable pageable) {
        log.debug("REST request to get a page of Entregas");
        Page<EntregaDTO> page = entregaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/entregas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /entregas/:id : get the "id" entrega.
     *
     * @param id the id of the entregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entregaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<EntregaDTO> getEntrega(@PathVariable Long id) {
        log.debug("REST request to get Entrega : {}", id);
        EntregaDTO entregaDTO = entregaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entregaDTO));
    }

    /**
     * DELETE  /entregas/:id : delete the "id" entrega.
     *
     * @param id the id of the entregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntrega(@PathVariable Long id) {
        log.debug("REST request to delete Entrega : {}", id);
        entregaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
