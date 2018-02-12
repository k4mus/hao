package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Comercio;
import io.github.jhipster.application.repository.ComercioRepository;
import io.github.jhipster.application.service.ComercioService;
import io.github.jhipster.application.service.dto.ComercioDTO;
import io.github.jhipster.application.service.mapper.ComercioMapper;
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
 * Test class for the ComercioResource REST controller.
 *
 * @see ComercioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class ComercioResourceIntTest {

    private static final Integer DEFAULT_ID_COMERCIO = 1;
    private static final Integer UPDATED_ID_COMERCIO = 2;

    private static final String DEFAULT_NOMBRE_COMERCIO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_COMERCIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_USUARIO = 1;
    private static final Integer UPDATED_ID_USUARIO = 2;

    private static final Integer DEFAULT_ID_DIRECCION = 1;
    private static final Integer UPDATED_ID_DIRECCION = 2;

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private ComercioMapper comercioMapper;

    @Autowired
    private ComercioService comercioService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComercioMockMvc;

    private Comercio comercio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComercioResource comercioResource = new ComercioResource(comercioService);
        this.restComercioMockMvc = MockMvcBuilders.standaloneSetup(comercioResource)
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
    public static Comercio createEntity(EntityManager em) {
        Comercio comercio = new Comercio()
            .idComercio(DEFAULT_ID_COMERCIO)
            .nombreComercio(DEFAULT_NOMBRE_COMERCIO)
            .idUsuario(DEFAULT_ID_USUARIO)
            .idDireccion(DEFAULT_ID_DIRECCION);
        return comercio;
    }

    @Before
    public void initTest() {
        comercio = createEntity(em);
    }

    @Test
    @Transactional
    public void createComercio() throws Exception {
        int databaseSizeBeforeCreate = comercioRepository.findAll().size();

        // Create the Comercio
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);
        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isCreated());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeCreate + 1);
        Comercio testComercio = comercioList.get(comercioList.size() - 1);
        assertThat(testComercio.getIdComercio()).isEqualTo(DEFAULT_ID_COMERCIO);
        assertThat(testComercio.getNombreComercio()).isEqualTo(DEFAULT_NOMBRE_COMERCIO);
        assertThat(testComercio.getIdUsuario()).isEqualTo(DEFAULT_ID_USUARIO);
        assertThat(testComercio.getIdDireccion()).isEqualTo(DEFAULT_ID_DIRECCION);
    }

    @Test
    @Transactional
    public void createComercioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comercioRepository.findAll().size();

        // Create the Comercio with an existing ID
        comercio.setId(1L);
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComercios() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);

        // Get all the comercioList
        restComercioMockMvc.perform(get("/api/comercios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comercio.getId().intValue())))
            .andExpect(jsonPath("$.[*].idComercio").value(hasItem(DEFAULT_ID_COMERCIO)))
            .andExpect(jsonPath("$.[*].nombreComercio").value(hasItem(DEFAULT_NOMBRE_COMERCIO.toString())))
            .andExpect(jsonPath("$.[*].idUsuario").value(hasItem(DEFAULT_ID_USUARIO)))
            .andExpect(jsonPath("$.[*].idDireccion").value(hasItem(DEFAULT_ID_DIRECCION)));
    }

    @Test
    @Transactional
    public void getComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);

        // Get the comercio
        restComercioMockMvc.perform(get("/api/comercios/{id}", comercio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comercio.getId().intValue()))
            .andExpect(jsonPath("$.idComercio").value(DEFAULT_ID_COMERCIO))
            .andExpect(jsonPath("$.nombreComercio").value(DEFAULT_NOMBRE_COMERCIO.toString()))
            .andExpect(jsonPath("$.idUsuario").value(DEFAULT_ID_USUARIO))
            .andExpect(jsonPath("$.idDireccion").value(DEFAULT_ID_DIRECCION));
    }

    @Test
    @Transactional
    public void getNonExistingComercio() throws Exception {
        // Get the comercio
        restComercioMockMvc.perform(get("/api/comercios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);
        int databaseSizeBeforeUpdate = comercioRepository.findAll().size();

        // Update the comercio
        Comercio updatedComercio = comercioRepository.findOne(comercio.getId());
        // Disconnect from session so that the updates on updatedComercio are not directly saved in db
        em.detach(updatedComercio);
        updatedComercio
            .idComercio(UPDATED_ID_COMERCIO)
            .nombreComercio(UPDATED_NOMBRE_COMERCIO)
            .idUsuario(UPDATED_ID_USUARIO)
            .idDireccion(UPDATED_ID_DIRECCION);
        ComercioDTO comercioDTO = comercioMapper.toDto(updatedComercio);

        restComercioMockMvc.perform(put("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isOk());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeUpdate);
        Comercio testComercio = comercioList.get(comercioList.size() - 1);
        assertThat(testComercio.getIdComercio()).isEqualTo(UPDATED_ID_COMERCIO);
        assertThat(testComercio.getNombreComercio()).isEqualTo(UPDATED_NOMBRE_COMERCIO);
        assertThat(testComercio.getIdUsuario()).isEqualTo(UPDATED_ID_USUARIO);
        assertThat(testComercio.getIdDireccion()).isEqualTo(UPDATED_ID_DIRECCION);
    }

    @Test
    @Transactional
    public void updateNonExistingComercio() throws Exception {
        int databaseSizeBeforeUpdate = comercioRepository.findAll().size();

        // Create the Comercio
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComercioMockMvc.perform(put("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isCreated());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);
        int databaseSizeBeforeDelete = comercioRepository.findAll().size();

        // Get the comercio
        restComercioMockMvc.perform(delete("/api/comercios/{id}", comercio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comercio.class);
        Comercio comercio1 = new Comercio();
        comercio1.setId(1L);
        Comercio comercio2 = new Comercio();
        comercio2.setId(comercio1.getId());
        assertThat(comercio1).isEqualTo(comercio2);
        comercio2.setId(2L);
        assertThat(comercio1).isNotEqualTo(comercio2);
        comercio1.setId(null);
        assertThat(comercio1).isNotEqualTo(comercio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComercioDTO.class);
        ComercioDTO comercioDTO1 = new ComercioDTO();
        comercioDTO1.setId(1L);
        ComercioDTO comercioDTO2 = new ComercioDTO();
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
        comercioDTO2.setId(comercioDTO1.getId());
        assertThat(comercioDTO1).isEqualTo(comercioDTO2);
        comercioDTO2.setId(2L);
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
        comercioDTO1.setId(null);
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(comercioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(comercioMapper.fromId(null)).isNull();
    }
}
