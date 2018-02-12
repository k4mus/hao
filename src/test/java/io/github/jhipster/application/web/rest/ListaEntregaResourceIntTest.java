package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.ListaEntrega;
import io.github.jhipster.application.repository.ListaEntregaRepository;
import io.github.jhipster.application.service.ListaEntregaService;
import io.github.jhipster.application.service.dto.ListaEntregaDTO;
import io.github.jhipster.application.service.mapper.ListaEntregaMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ListaEntregaResource REST controller.
 *
 * @see ListaEntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class ListaEntregaResourceIntTest {

    private static final Integer DEFAULT_ID_LISTA_ENTREGA = 1;
    private static final Integer UPDATED_ID_LISTA_ENTREGA = 2;

    private static final Integer DEFAULT_ID_CARRO = 1;
    private static final Integer UPDATED_ID_CARRO = 2;

    private static final String DEFAULT_UNBICACION = "AAAAAAAAAA";
    private static final String UPDATED_UNBICACION = "BBBBBBBBBB";

    @Autowired
    private ListaEntregaRepository listaEntregaRepository;

    @Autowired
    private ListaEntregaMapper listaEntregaMapper;

    @Autowired
    private ListaEntregaService listaEntregaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restListaEntregaMockMvc;

    private ListaEntrega listaEntrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListaEntregaResource listaEntregaResource = new ListaEntregaResource(listaEntregaService);
        this.restListaEntregaMockMvc = MockMvcBuilders.standaloneSetup(listaEntregaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaEntrega createEntity(EntityManager em) {
        ListaEntrega listaEntrega = new ListaEntrega()
            .idListaEntrega(DEFAULT_ID_LISTA_ENTREGA)
            .idCarro(DEFAULT_ID_CARRO)
            .unbicacion(DEFAULT_UNBICACION);
        return listaEntrega;
    }

    @Before
    public void initTest() {
        listaEntrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createListaEntrega() throws Exception {
        int databaseSizeBeforeCreate = listaEntregaRepository.findAll().size();

        // Create the ListaEntrega
        ListaEntregaDTO listaEntregaDTO = listaEntregaMapper.toDto(listaEntrega);
        restListaEntregaMockMvc.perform(post("/api/lista-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the ListaEntrega in the database
        List<ListaEntrega> listaEntregaList = listaEntregaRepository.findAll();
        assertThat(listaEntregaList).hasSize(databaseSizeBeforeCreate + 1);
        ListaEntrega testListaEntrega = listaEntregaList.get(listaEntregaList.size() - 1);
        assertThat(testListaEntrega.getIdListaEntrega()).isEqualTo(DEFAULT_ID_LISTA_ENTREGA);
        assertThat(testListaEntrega.getIdCarro()).isEqualTo(DEFAULT_ID_CARRO);
        assertThat(testListaEntrega.getUnbicacion()).isEqualTo(DEFAULT_UNBICACION);
    }

    @Test
    @Transactional
    public void createListaEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listaEntregaRepository.findAll().size();

        // Create the ListaEntrega with an existing ID
        listaEntrega.setId(1L);
        ListaEntregaDTO listaEntregaDTO = listaEntregaMapper.toDto(listaEntrega);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaEntregaMockMvc.perform(post("/api/lista-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaEntregaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ListaEntrega in the database
        List<ListaEntrega> listaEntregaList = listaEntregaRepository.findAll();
        assertThat(listaEntregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllListaEntregas() throws Exception {
        // Initialize the database
        listaEntregaRepository.saveAndFlush(listaEntrega);

        // Get all the listaEntregaList
        restListaEntregaMockMvc.perform(get("/api/lista-entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].idListaEntrega").value(hasItem(DEFAULT_ID_LISTA_ENTREGA)))
            .andExpect(jsonPath("$.[*].idCarro").value(hasItem(DEFAULT_ID_CARRO)))
            .andExpect(jsonPath("$.[*].unbicacion").value(hasItem(DEFAULT_UNBICACION.toString())));
    }

    @Test
    @Transactional
    public void getListaEntrega() throws Exception {
        // Initialize the database
        listaEntregaRepository.saveAndFlush(listaEntrega);

        // Get the listaEntrega
        restListaEntregaMockMvc.perform(get("/api/lista-entregas/{id}", listaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listaEntrega.getId().intValue()))
            .andExpect(jsonPath("$.idListaEntrega").value(DEFAULT_ID_LISTA_ENTREGA))
            .andExpect(jsonPath("$.idCarro").value(DEFAULT_ID_CARRO))
            .andExpect(jsonPath("$.unbicacion").value(DEFAULT_UNBICACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListaEntrega() throws Exception {
        // Get the listaEntrega
        restListaEntregaMockMvc.perform(get("/api/lista-entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListaEntrega() throws Exception {
        // Initialize the database
        listaEntregaRepository.saveAndFlush(listaEntrega);
        int databaseSizeBeforeUpdate = listaEntregaRepository.findAll().size();

        // Update the listaEntrega
        ListaEntrega updatedListaEntrega = listaEntregaRepository.findOne(listaEntrega.getId());
        // Disconnect from session so that the updates on updatedListaEntrega are not directly saved in db
        em.detach(updatedListaEntrega);
        updatedListaEntrega
            .idListaEntrega(UPDATED_ID_LISTA_ENTREGA)
            .idCarro(UPDATED_ID_CARRO)
            .unbicacion(UPDATED_UNBICACION);
        ListaEntregaDTO listaEntregaDTO = listaEntregaMapper.toDto(updatedListaEntrega);

        restListaEntregaMockMvc.perform(put("/api/lista-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaEntregaDTO)))
            .andExpect(status().isOk());

        // Validate the ListaEntrega in the database
        List<ListaEntrega> listaEntregaList = listaEntregaRepository.findAll();
        assertThat(listaEntregaList).hasSize(databaseSizeBeforeUpdate);
        ListaEntrega testListaEntrega = listaEntregaList.get(listaEntregaList.size() - 1);
        assertThat(testListaEntrega.getIdListaEntrega()).isEqualTo(UPDATED_ID_LISTA_ENTREGA);
        assertThat(testListaEntrega.getIdCarro()).isEqualTo(UPDATED_ID_CARRO);
        assertThat(testListaEntrega.getUnbicacion()).isEqualTo(UPDATED_UNBICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingListaEntrega() throws Exception {
        int databaseSizeBeforeUpdate = listaEntregaRepository.findAll().size();

        // Create the ListaEntrega
        ListaEntregaDTO listaEntregaDTO = listaEntregaMapper.toDto(listaEntrega);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restListaEntregaMockMvc.perform(put("/api/lista-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the ListaEntrega in the database
        List<ListaEntrega> listaEntregaList = listaEntregaRepository.findAll();
        assertThat(listaEntregaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteListaEntrega() throws Exception {
        // Initialize the database
        listaEntregaRepository.saveAndFlush(listaEntrega);
        int databaseSizeBeforeDelete = listaEntregaRepository.findAll().size();

        // Get the listaEntrega
        restListaEntregaMockMvc.perform(delete("/api/lista-entregas/{id}", listaEntrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ListaEntrega> listaEntregaList = listaEntregaRepository.findAll();
        assertThat(listaEntregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaEntrega.class);
        ListaEntrega listaEntrega1 = new ListaEntrega();
        listaEntrega1.setId(1L);
        ListaEntrega listaEntrega2 = new ListaEntrega();
        listaEntrega2.setId(listaEntrega1.getId());
        assertThat(listaEntrega1).isEqualTo(listaEntrega2);
        listaEntrega2.setId(2L);
        assertThat(listaEntrega1).isNotEqualTo(listaEntrega2);
        listaEntrega1.setId(null);
        assertThat(listaEntrega1).isNotEqualTo(listaEntrega2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaEntregaDTO.class);
        ListaEntregaDTO listaEntregaDTO1 = new ListaEntregaDTO();
        listaEntregaDTO1.setId(1L);
        ListaEntregaDTO listaEntregaDTO2 = new ListaEntregaDTO();
        assertThat(listaEntregaDTO1).isNotEqualTo(listaEntregaDTO2);
        listaEntregaDTO2.setId(listaEntregaDTO1.getId());
        assertThat(listaEntregaDTO1).isEqualTo(listaEntregaDTO2);
        listaEntregaDTO2.setId(2L);
        assertThat(listaEntregaDTO1).isNotEqualTo(listaEntregaDTO2);
        listaEntregaDTO1.setId(null);
        assertThat(listaEntregaDTO1).isNotEqualTo(listaEntregaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(listaEntregaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(listaEntregaMapper.fromId(null)).isNull();
    }
}
