package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Direccion;
import io.github.jhipster.application.repository.DireccionRepository;
import io.github.jhipster.application.service.DireccionService;
import io.github.jhipster.application.service.dto.DireccionDTO;
import io.github.jhipster.application.service.mapper.DireccionMapper;
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
 * Test class for the DireccionResource REST controller.
 *
 * @see DireccionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class DireccionResourceIntTest {

    private static final Integer DEFAULT_ID_DIRECCION = 1;
    private static final Integer UPDATED_ID_DIRECCION = 2;

    private static final String DEFAULT_UBICACION = "AAAAAAAAAA";
    private static final String UPDATED_UBICACION = "BBBBBBBBBB";

    private static final String DEFAULT_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_CALLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final String DEFAULT_DPTO = "AAAAAAAAAA";
    private static final String UPDATED_DPTO = "BBBBBBBBBB";

    private static final String DEFAULT_POBLACION = "AAAAAAAAAA";
    private static final String UPDATED_POBLACION = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_COMUNA = 1;
    private static final Integer UPDATED_ID_COMUNA = 2;

    @Autowired
    private DireccionRepository direccionRepository;

    @Autowired
    private DireccionMapper direccionMapper;

    @Autowired
    private DireccionService direccionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDireccionMockMvc;

    private Direccion direccion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DireccionResource direccionResource = new DireccionResource(direccionService);
        this.restDireccionMockMvc = MockMvcBuilders.standaloneSetup(direccionResource)
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
    public static Direccion createEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .idDireccion(DEFAULT_ID_DIRECCION)
            .ubicacion(DEFAULT_UBICACION)
            .calle(DEFAULT_CALLE)
            .numero(DEFAULT_NUMERO)
            .dpto(DEFAULT_DPTO)
            .poblacion(DEFAULT_POBLACION)
            .idComuna(DEFAULT_ID_COMUNA);
        return direccion;
    }

    @Before
    public void initTest() {
        direccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDireccion() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion
        DireccionDTO direccionDTO = direccionMapper.toDto(direccion);
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionDTO)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate + 1);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getIdDireccion()).isEqualTo(DEFAULT_ID_DIRECCION);
        assertThat(testDireccion.getUbicacion()).isEqualTo(DEFAULT_UBICACION);
        assertThat(testDireccion.getCalle()).isEqualTo(DEFAULT_CALLE);
        assertThat(testDireccion.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testDireccion.getDpto()).isEqualTo(DEFAULT_DPTO);
        assertThat(testDireccion.getPoblacion()).isEqualTo(DEFAULT_POBLACION);
        assertThat(testDireccion.getIdComuna()).isEqualTo(DEFAULT_ID_COMUNA);
    }

    @Test
    @Transactional
    public void createDireccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion with an existing ID
        direccion.setId(1L);
        DireccionDTO direccionDTO = direccionMapper.toDto(direccion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDireccions() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get all the direccionList
        restDireccionMockMvc.perform(get("/api/direccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(direccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].idDireccion").value(hasItem(DEFAULT_ID_DIRECCION)))
            .andExpect(jsonPath("$.[*].ubicacion").value(hasItem(DEFAULT_UBICACION.toString())))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dpto").value(hasItem(DEFAULT_DPTO.toString())))
            .andExpect(jsonPath("$.[*].poblacion").value(hasItem(DEFAULT_POBLACION.toString())))
            .andExpect(jsonPath("$.[*].idComuna").value(hasItem(DEFAULT_ID_COMUNA)));
    }

    @Test
    @Transactional
    public void getDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", direccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(direccion.getId().intValue()))
            .andExpect(jsonPath("$.idDireccion").value(DEFAULT_ID_DIRECCION))
            .andExpect(jsonPath("$.ubicacion").value(DEFAULT_UBICACION.toString()))
            .andExpect(jsonPath("$.calle").value(DEFAULT_CALLE.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dpto").value(DEFAULT_DPTO.toString()))
            .andExpect(jsonPath("$.poblacion").value(DEFAULT_POBLACION.toString()))
            .andExpect(jsonPath("$.idComuna").value(DEFAULT_ID_COMUNA));
    }

    @Test
    @Transactional
    public void getNonExistingDireccion() throws Exception {
        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Update the direccion
        Direccion updatedDireccion = direccionRepository.findOne(direccion.getId());
        // Disconnect from session so that the updates on updatedDireccion are not directly saved in db
        em.detach(updatedDireccion);
        updatedDireccion
            .idDireccion(UPDATED_ID_DIRECCION)
            .ubicacion(UPDATED_UBICACION)
            .calle(UPDATED_CALLE)
            .numero(UPDATED_NUMERO)
            .dpto(UPDATED_DPTO)
            .poblacion(UPDATED_POBLACION)
            .idComuna(UPDATED_ID_COMUNA);
        DireccionDTO direccionDTO = direccionMapper.toDto(updatedDireccion);

        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionDTO)))
            .andExpect(status().isOk());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getIdDireccion()).isEqualTo(UPDATED_ID_DIRECCION);
        assertThat(testDireccion.getUbicacion()).isEqualTo(UPDATED_UBICACION);
        assertThat(testDireccion.getCalle()).isEqualTo(UPDATED_CALLE);
        assertThat(testDireccion.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testDireccion.getDpto()).isEqualTo(UPDATED_DPTO);
        assertThat(testDireccion.getPoblacion()).isEqualTo(UPDATED_POBLACION);
        assertThat(testDireccion.getIdComuna()).isEqualTo(UPDATED_ID_COMUNA);
    }

    @Test
    @Transactional
    public void updateNonExistingDireccion() throws Exception {
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Create the Direccion
        DireccionDTO direccionDTO = direccionMapper.toDto(direccion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionDTO)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);
        int databaseSizeBeforeDelete = direccionRepository.findAll().size();

        // Get the direccion
        restDireccionMockMvc.perform(delete("/api/direccions/{id}", direccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Direccion.class);
        Direccion direccion1 = new Direccion();
        direccion1.setId(1L);
        Direccion direccion2 = new Direccion();
        direccion2.setId(direccion1.getId());
        assertThat(direccion1).isEqualTo(direccion2);
        direccion2.setId(2L);
        assertThat(direccion1).isNotEqualTo(direccion2);
        direccion1.setId(null);
        assertThat(direccion1).isNotEqualTo(direccion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DireccionDTO.class);
        DireccionDTO direccionDTO1 = new DireccionDTO();
        direccionDTO1.setId(1L);
        DireccionDTO direccionDTO2 = new DireccionDTO();
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
        direccionDTO2.setId(direccionDTO1.getId());
        assertThat(direccionDTO1).isEqualTo(direccionDTO2);
        direccionDTO2.setId(2L);
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
        direccionDTO1.setId(null);
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(direccionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(direccionMapper.fromId(null)).isNull();
    }
}
