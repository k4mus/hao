package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Repartidor;
import io.github.jhipster.application.repository.RepartidorRepository;
import io.github.jhipster.application.service.RepartidorService;
import io.github.jhipster.application.service.dto.RepartidorDTO;
import io.github.jhipster.application.service.mapper.RepartidorMapper;
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
 * Test class for the RepartidorResource REST controller.
 *
 * @see RepartidorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class RepartidorResourceIntTest {

    private static final Integer DEFAULT_ID_REPARTIDOR = 1;
    private static final Integer UPDATED_ID_REPARTIDOR = 2;

    private static final String DEFAULT_NOMBRE_REPARTIDOR = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_REPARTIDOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_USUARIO = 1;
    private static final Integer UPDATED_ID_USUARIO = 2;

    @Autowired
    private RepartidorRepository repartidorRepository;

    @Autowired
    private RepartidorMapper repartidorMapper;

    @Autowired
    private RepartidorService repartidorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRepartidorMockMvc;

    private Repartidor repartidor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepartidorResource repartidorResource = new RepartidorResource(repartidorService);
        this.restRepartidorMockMvc = MockMvcBuilders.standaloneSetup(repartidorResource)
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
    public static Repartidor createEntity(EntityManager em) {
        Repartidor repartidor = new Repartidor()
            .idRepartidor(DEFAULT_ID_REPARTIDOR)
            .nombreRepartidor(DEFAULT_NOMBRE_REPARTIDOR)
            .idUsuario(DEFAULT_ID_USUARIO);
        return repartidor;
    }

    @Before
    public void initTest() {
        repartidor = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepartidor() throws Exception {
        int databaseSizeBeforeCreate = repartidorRepository.findAll().size();

        // Create the Repartidor
        RepartidorDTO repartidorDTO = repartidorMapper.toDto(repartidor);
        restRepartidorMockMvc.perform(post("/api/repartidors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repartidorDTO)))
            .andExpect(status().isCreated());

        // Validate the Repartidor in the database
        List<Repartidor> repartidorList = repartidorRepository.findAll();
        assertThat(repartidorList).hasSize(databaseSizeBeforeCreate + 1);
        Repartidor testRepartidor = repartidorList.get(repartidorList.size() - 1);
        assertThat(testRepartidor.getIdRepartidor()).isEqualTo(DEFAULT_ID_REPARTIDOR);
        assertThat(testRepartidor.getNombreRepartidor()).isEqualTo(DEFAULT_NOMBRE_REPARTIDOR);
        assertThat(testRepartidor.getIdUsuario()).isEqualTo(DEFAULT_ID_USUARIO);
    }

    @Test
    @Transactional
    public void createRepartidorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repartidorRepository.findAll().size();

        // Create the Repartidor with an existing ID
        repartidor.setId(1L);
        RepartidorDTO repartidorDTO = repartidorMapper.toDto(repartidor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepartidorMockMvc.perform(post("/api/repartidors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repartidorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repartidor in the database
        List<Repartidor> repartidorList = repartidorRepository.findAll();
        assertThat(repartidorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepartidors() throws Exception {
        // Initialize the database
        repartidorRepository.saveAndFlush(repartidor);

        // Get all the repartidorList
        restRepartidorMockMvc.perform(get("/api/repartidors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repartidor.getId().intValue())))
            .andExpect(jsonPath("$.[*].idRepartidor").value(hasItem(DEFAULT_ID_REPARTIDOR)))
            .andExpect(jsonPath("$.[*].nombreRepartidor").value(hasItem(DEFAULT_NOMBRE_REPARTIDOR.toString())))
            .andExpect(jsonPath("$.[*].idUsuario").value(hasItem(DEFAULT_ID_USUARIO)));
    }

    @Test
    @Transactional
    public void getRepartidor() throws Exception {
        // Initialize the database
        repartidorRepository.saveAndFlush(repartidor);

        // Get the repartidor
        restRepartidorMockMvc.perform(get("/api/repartidors/{id}", repartidor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repartidor.getId().intValue()))
            .andExpect(jsonPath("$.idRepartidor").value(DEFAULT_ID_REPARTIDOR))
            .andExpect(jsonPath("$.nombreRepartidor").value(DEFAULT_NOMBRE_REPARTIDOR.toString()))
            .andExpect(jsonPath("$.idUsuario").value(DEFAULT_ID_USUARIO));
    }

    @Test
    @Transactional
    public void getNonExistingRepartidor() throws Exception {
        // Get the repartidor
        restRepartidorMockMvc.perform(get("/api/repartidors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepartidor() throws Exception {
        // Initialize the database
        repartidorRepository.saveAndFlush(repartidor);
        int databaseSizeBeforeUpdate = repartidorRepository.findAll().size();

        // Update the repartidor
        Repartidor updatedRepartidor = repartidorRepository.findOne(repartidor.getId());
        // Disconnect from session so that the updates on updatedRepartidor are not directly saved in db
        em.detach(updatedRepartidor);
        updatedRepartidor
            .idRepartidor(UPDATED_ID_REPARTIDOR)
            .nombreRepartidor(UPDATED_NOMBRE_REPARTIDOR)
            .idUsuario(UPDATED_ID_USUARIO);
        RepartidorDTO repartidorDTO = repartidorMapper.toDto(updatedRepartidor);

        restRepartidorMockMvc.perform(put("/api/repartidors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repartidorDTO)))
            .andExpect(status().isOk());

        // Validate the Repartidor in the database
        List<Repartidor> repartidorList = repartidorRepository.findAll();
        assertThat(repartidorList).hasSize(databaseSizeBeforeUpdate);
        Repartidor testRepartidor = repartidorList.get(repartidorList.size() - 1);
        assertThat(testRepartidor.getIdRepartidor()).isEqualTo(UPDATED_ID_REPARTIDOR);
        assertThat(testRepartidor.getNombreRepartidor()).isEqualTo(UPDATED_NOMBRE_REPARTIDOR);
        assertThat(testRepartidor.getIdUsuario()).isEqualTo(UPDATED_ID_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingRepartidor() throws Exception {
        int databaseSizeBeforeUpdate = repartidorRepository.findAll().size();

        // Create the Repartidor
        RepartidorDTO repartidorDTO = repartidorMapper.toDto(repartidor);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRepartidorMockMvc.perform(put("/api/repartidors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repartidorDTO)))
            .andExpect(status().isCreated());

        // Validate the Repartidor in the database
        List<Repartidor> repartidorList = repartidorRepository.findAll();
        assertThat(repartidorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRepartidor() throws Exception {
        // Initialize the database
        repartidorRepository.saveAndFlush(repartidor);
        int databaseSizeBeforeDelete = repartidorRepository.findAll().size();

        // Get the repartidor
        restRepartidorMockMvc.perform(delete("/api/repartidors/{id}", repartidor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Repartidor> repartidorList = repartidorRepository.findAll();
        assertThat(repartidorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repartidor.class);
        Repartidor repartidor1 = new Repartidor();
        repartidor1.setId(1L);
        Repartidor repartidor2 = new Repartidor();
        repartidor2.setId(repartidor1.getId());
        assertThat(repartidor1).isEqualTo(repartidor2);
        repartidor2.setId(2L);
        assertThat(repartidor1).isNotEqualTo(repartidor2);
        repartidor1.setId(null);
        assertThat(repartidor1).isNotEqualTo(repartidor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepartidorDTO.class);
        RepartidorDTO repartidorDTO1 = new RepartidorDTO();
        repartidorDTO1.setId(1L);
        RepartidorDTO repartidorDTO2 = new RepartidorDTO();
        assertThat(repartidorDTO1).isNotEqualTo(repartidorDTO2);
        repartidorDTO2.setId(repartidorDTO1.getId());
        assertThat(repartidorDTO1).isEqualTo(repartidorDTO2);
        repartidorDTO2.setId(2L);
        assertThat(repartidorDTO1).isNotEqualTo(repartidorDTO2);
        repartidorDTO1.setId(null);
        assertThat(repartidorDTO1).isNotEqualTo(repartidorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(repartidorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(repartidorMapper.fromId(null)).isNull();
    }
}
