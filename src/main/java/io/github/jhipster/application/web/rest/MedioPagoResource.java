package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.MedioPagoService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.MedioPagoDTO;
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
 * REST controller for managing MedioPago.
 */
@RestController
@RequestMapping("/api")
public class MedioPagoResource {

    private final Logger log = LoggerFactory.getLogger(MedioPagoResource.class);

    private static final String ENTITY_NAME = "medioPago";

    private final MedioPagoService medioPagoService;

    public MedioPagoResource(MedioPagoService medioPagoService) {
        this.medioPagoService = medioPagoService;
    }

    /**
     * POST  /medio-pagos : Create a new medioPago.
     *
     * @param medioPagoDTO the medioPagoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medioPagoDTO, or with status 400 (Bad Request) if the medioPago has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medio-pagos")
    @Timed
    public ResponseEntity<MedioPagoDTO> createMedioPago(@RequestBody MedioPagoDTO medioPagoDTO) throws URISyntaxException {
        log.debug("REST request to save MedioPago : {}", medioPagoDTO);
        if (medioPagoDTO.getId() != null) {
            throw new BadRequestAlertException("A new medioPago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioPagoDTO result = medioPagoService.save(medioPagoDTO);
        return ResponseEntity.created(new URI("/api/medio-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medio-pagos : Updates an existing medioPago.
     *
     * @param medioPagoDTO the medioPagoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medioPagoDTO,
     * or with status 400 (Bad Request) if the medioPagoDTO is not valid,
     * or with status 500 (Internal Server Error) if the medioPagoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medio-pagos")
    @Timed
    public ResponseEntity<MedioPagoDTO> updateMedioPago(@RequestBody MedioPagoDTO medioPagoDTO) throws URISyntaxException {
        log.debug("REST request to update MedioPago : {}", medioPagoDTO);
        if (medioPagoDTO.getId() == null) {
            return createMedioPago(medioPagoDTO);
        }
        MedioPagoDTO result = medioPagoService.save(medioPagoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medioPagoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medio-pagos : get all the medioPagos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medioPagos in body
     */
    @GetMapping("/medio-pagos")
    @Timed
    public ResponseEntity<List<MedioPagoDTO>> getAllMedioPagos(Pageable pageable) {
        log.debug("REST request to get a page of MedioPagos");
        Page<MedioPagoDTO> page = medioPagoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/medio-pagos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /medio-pagos/:id : get the "id" medioPago.
     *
     * @param id the id of the medioPagoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medioPagoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/medio-pagos/{id}")
    @Timed
    public ResponseEntity<MedioPagoDTO> getMedioPago(@PathVariable Long id) {
        log.debug("REST request to get MedioPago : {}", id);
        MedioPagoDTO medioPagoDTO = medioPagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(medioPagoDTO));
    }

    /**
     * DELETE  /medio-pagos/:id : delete the "id" medioPago.
     *
     * @param id the id of the medioPagoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medio-pagos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedioPago(@PathVariable Long id) {
        log.debug("REST request to delete MedioPago : {}", id);
        medioPagoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
