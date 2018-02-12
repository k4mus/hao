package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.ListaEntregaService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.ListaEntregaDTO;
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
 * REST controller for managing ListaEntrega.
 */
@RestController
@RequestMapping("/api")
public class ListaEntregaResource {

    private final Logger log = LoggerFactory.getLogger(ListaEntregaResource.class);

    private static final String ENTITY_NAME = "listaEntrega";

    private final ListaEntregaService listaEntregaService;

    public ListaEntregaResource(ListaEntregaService listaEntregaService) {
        this.listaEntregaService = listaEntregaService;
    }

    /**
     * POST  /lista-entregas : Create a new listaEntrega.
     *
     * @param listaEntregaDTO the listaEntregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new listaEntregaDTO, or with status 400 (Bad Request) if the listaEntrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lista-entregas")
    @Timed
    public ResponseEntity<ListaEntregaDTO> createListaEntrega(@RequestBody ListaEntregaDTO listaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to save ListaEntrega : {}", listaEntregaDTO);
        if (listaEntregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new listaEntrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListaEntregaDTO result = listaEntregaService.save(listaEntregaDTO);
        return ResponseEntity.created(new URI("/api/lista-entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lista-entregas : Updates an existing listaEntrega.
     *
     * @param listaEntregaDTO the listaEntregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated listaEntregaDTO,
     * or with status 400 (Bad Request) if the listaEntregaDTO is not valid,
     * or with status 500 (Internal Server Error) if the listaEntregaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lista-entregas")
    @Timed
    public ResponseEntity<ListaEntregaDTO> updateListaEntrega(@RequestBody ListaEntregaDTO listaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to update ListaEntrega : {}", listaEntregaDTO);
        if (listaEntregaDTO.getId() == null) {
            return createListaEntrega(listaEntregaDTO);
        }
        ListaEntregaDTO result = listaEntregaService.save(listaEntregaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, listaEntregaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lista-entregas : get all the listaEntregas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of listaEntregas in body
     */
    @GetMapping("/lista-entregas")
    @Timed
    public ResponseEntity<List<ListaEntregaDTO>> getAllListaEntregas(Pageable pageable) {
        log.debug("REST request to get a page of ListaEntregas");
        Page<ListaEntregaDTO> page = listaEntregaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lista-entregas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lista-entregas/:id : get the "id" listaEntrega.
     *
     * @param id the id of the listaEntregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the listaEntregaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/lista-entregas/{id}")
    @Timed
    public ResponseEntity<ListaEntregaDTO> getListaEntrega(@PathVariable Long id) {
        log.debug("REST request to get ListaEntrega : {}", id);
        ListaEntregaDTO listaEntregaDTO = listaEntregaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(listaEntregaDTO));
    }

    /**
     * DELETE  /lista-entregas/:id : delete the "id" listaEntrega.
     *
     * @param id the id of the listaEntregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lista-entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteListaEntrega(@PathVariable Long id) {
        log.debug("REST request to delete ListaEntrega : {}", id);
        listaEntregaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
