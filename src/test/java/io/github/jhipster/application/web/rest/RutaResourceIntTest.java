package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Ruta;
import io.github.jhipster.application.repository.RutaRepository;
import io.github.jhipster.application.service.RutaService;
import io.github.jhipster.application.service.dto.RutaDTO;
import io.github.jhipster.application.service.mapper.RutaMapper;
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
 * Test class for the RutaResource REST controller.
 *
 * @see RutaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class RutaResourceIntTest {

    private static final Integer DEFAULT_ID_RUTA = 1;
    private static final Integer UPDATED_ID_RUTA = 2;

    private static final Integer DEFAULT_NOMBRE_RUTA = 1;
    private static final Integer UPDATED_NOMBRE_RUTA = 2;

    private static final String DEFAULT_UBICACION_ORIGEN = "AAAAAAAAAA";
    private static final String UPDATED_UBICACION_ORIGEN = "BBBBBBBBBB";

    private static final String DEFAULT_UBICACION_DESTINO = "AAAAAAAAAA";
    private static final String UPDATED_UBICACION_DESTINO = "BBBBBBBBBB";

    @Autowired
    private RutaRepository rutaRepository;

    @Autowired
    private RutaMapper rutaMapper;

    @Autowired
    private RutaService rutaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRutaMockMvc;

    private Ruta ruta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RutaResource rutaResource = new RutaResource(rutaService);
        this.restRutaMockMvc = MockMvcBuilders.standaloneSetup(rutaResource)
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
    public static Ruta createEntity(EntityManager em) {
        Ruta ruta = new Ruta()
            .idRuta(DEFAULT_ID_RUTA)
            .nombreRuta(DEFAULT_NOMBRE_RUTA)
            .ubicacionOrigen(DEFAULT_UBICACION_ORIGEN)
            .ubicacionDestino(DEFAULT_UBICACION_DESTINO);
        return ruta;
    }

    @Before
    public void initTest() {
        ruta = createEntity(em);
    }

    @Test
    @Transactional
    public void createRuta() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta
        RutaDTO rutaDTO = rutaMapper.toDto(ruta);
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rutaDTO)))
            .andExpect(status().isCreated());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate + 1);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getIdRuta()).isEqualTo(DEFAULT_ID_RUTA);
        assertThat(testRuta.getNombreRuta()).isEqualTo(DEFAULT_NOMBRE_RUTA);
        assertThat(testRuta.getUbicacionOrigen()).isEqualTo(DEFAULT_UBICACION_ORIGEN);
        assertThat(testRuta.getUbicacionDestino()).isEqualTo(DEFAULT_UBICACION_DESTINO);
    }

    @Test
    @Transactional
    public void createRutaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta with an existing ID
        ruta.setId(1L);
        RutaDTO rutaDTO = rutaMapper.toDto(ruta);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rutaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRutas() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        // Get all the rutaList
        restRutaMockMvc.perform(get("/api/rutas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruta.getId().intValue())))
            .andExpect(jsonPath("$.[*].idRuta").value(hasItem(DEFAULT_ID_RUTA)))
            .andExpect(jsonPath("$.[*].nombreRuta").value(hasItem(DEFAULT_NOMBRE_RUTA)))
            .andExpect(jsonPath("$.[*].ubicacionOrigen").value(hasItem(DEFAULT_UBICACION_ORIGEN.toString())))
            .andExpect(jsonPath("$.[*].ubicacionDestino").value(hasItem(DEFAULT_UBICACION_DESTINO.toString())));
    }

    @Test
    @Transactional
    public void getRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", ruta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ruta.getId().intValue()))
            .andExpect(jsonPath("$.idRuta").value(DEFAULT_ID_RUTA))
            .andExpect(jsonPath("$.nombreRuta").value(DEFAULT_NOMBRE_RUTA))
            .andExpect(jsonPath("$.ubicacionOrigen").value(DEFAULT_UBICACION_ORIGEN.toString()))
            .andExpect(jsonPath("$.ubicacionDestino").value(DEFAULT_UBICACION_DESTINO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRuta() throws Exception {
        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);
        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Update the ruta
        Ruta updatedRuta = rutaRepository.findOne(ruta.getId());
        // Disconnect from session so that the updates on updatedRuta are not directly saved in db
        em.detach(updatedRuta);
        updatedRuta
            .idRuta(UPDATED_ID_RUTA)
            .nombreRuta(UPDATED_NOMBRE_RUTA)
            .ubicacionOrigen(UPDATED_UBICACION_ORIGEN)
            .ubicacionDestino(UPDATED_UBICACION_DESTINO);
        RutaDTO rutaDTO = rutaMapper.toDto(updatedRuta);

        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rutaDTO)))
            .andExpect(status().isOk());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getIdRuta()).isEqualTo(UPDATED_ID_RUTA);
        assertThat(testRuta.getNombreRuta()).isEqualTo(UPDATED_NOMBRE_RUTA);
        assertThat(testRuta.getUbicacionOrigen()).isEqualTo(UPDATED_UBICACION_ORIGEN);
        assertThat(testRuta.getUbicacionDestino()).isEqualTo(UPDATED_UBICACION_DESTINO);
    }

    @Test
    @Transactional
    public void updateNonExistingRuta() throws Exception {
        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Create the Ruta
        RutaDTO rutaDTO = rutaMapper.toDto(ruta);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rutaDTO)))
            .andExpect(status().isCreated());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);
        int databaseSizeBeforeDelete = rutaRepository.findAll().size();

        // Get the ruta
        restRutaMockMvc.perform(delete("/api/rutas/{id}", ruta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ruta.class);
        Ruta ruta1 = new Ruta();
        ruta1.setId(1L);
        Ruta ruta2 = new Ruta();
        ruta2.setId(ruta1.getId());
        assertThat(ruta1).isEqualTo(ruta2);
        ruta2.setId(2L);
        assertThat(ruta1).isNotEqualTo(ruta2);
        ruta1.setId(null);
        assertThat(ruta1).isNotEqualTo(ruta2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RutaDTO.class);
        RutaDTO rutaDTO1 = new RutaDTO();
        rutaDTO1.setId(1L);
        RutaDTO rutaDTO2 = new RutaDTO();
        assertThat(rutaDTO1).isNotEqualTo(rutaDTO2);
        rutaDTO2.setId(rutaDTO1.getId());
        assertThat(rutaDTO1).isEqualTo(rutaDTO2);
        rutaDTO2.setId(2L);
        assertThat(rutaDTO1).isNotEqualTo(rutaDTO2);
        rutaDTO1.setId(null);
        assertThat(rutaDTO1).isNotEqualTo(rutaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(rutaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(rutaMapper.fromId(null)).isNull();
    }
}
