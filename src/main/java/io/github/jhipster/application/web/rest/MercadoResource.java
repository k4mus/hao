package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.MercadoService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.MercadoDTO;
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
 * REST controller for managing Mercado.
 */
@RestController
@RequestMapping("/api")
public class MercadoResource {

    private final Logger log = LoggerFactory.getLogger(MercadoResource.class);

    private static final String ENTITY_NAME = "mercado";

    private final MercadoService mercadoService;

    public MercadoResource(MercadoService mercadoService) {
        this.mercadoService = mercadoService;
    }

    /**
     * POST  /mercados : Create a new mercado.
     *
     * @param mercadoDTO the mercadoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mercadoDTO, or with status 400 (Bad Request) if the mercado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mercados")
    @Timed
    public ResponseEntity<MercadoDTO> createMercado(@RequestBody MercadoDTO mercadoDTO) throws URISyntaxException {
        log.debug("REST request to save Mercado : {}", mercadoDTO);
        if (mercadoDTO.getId() != null) {
            throw new BadRequestAlertException("A new mercado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MercadoDTO result = mercadoService.save(mercadoDTO);
        return ResponseEntity.created(new URI("/api/mercados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mercados : Updates an existing mercado.
     *
     * @param mercadoDTO the mercadoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mercadoDTO,
     * or with status 400 (Bad Request) if the mercadoDTO is not valid,
     * or with status 500 (Internal Server Error) if the mercadoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mercados")
    @Timed
    public ResponseEntity<MercadoDTO> updateMercado(@RequestBody MercadoDTO mercadoDTO) throws URISyntaxException {
        log.debug("REST request to update Mercado : {}", mercadoDTO);
        if (mercadoDTO.getId() == null) {
            return createMercado(mercadoDTO);
        }
        MercadoDTO result = mercadoService.save(mercadoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mercadoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mercados : get all the mercados.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mercados in body
     */
    @GetMapping("/mercados")
    @Timed
    public ResponseEntity<List<MercadoDTO>> getAllMercados(Pageable pageable) {
        log.debug("REST request to get a page of Mercados");
        Page<MercadoDTO> page = mercadoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mercados");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mercados/:id : get the "id" mercado.
     *
     * @param id the id of the mercadoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mercadoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mercados/{id}")
    @Timed
    public ResponseEntity<MercadoDTO> getMercado(@PathVariable Long id) {
        log.debug("REST request to get Mercado : {}", id);
        MercadoDTO mercadoDTO = mercadoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mercadoDTO));
    }

    /**
     * DELETE  /mercados/:id : delete the "id" mercado.
     *
     * @param id the id of the mercadoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mercados/{id}")
    @Timed
    public ResponseEntity<Void> deleteMercado(@PathVariable Long id) {
        log.debug("REST request to delete Mercado : {}", id);
        mercadoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
