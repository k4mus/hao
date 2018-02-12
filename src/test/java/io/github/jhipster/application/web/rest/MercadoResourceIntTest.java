package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Mercado;
import io.github.jhipster.application.repository.MercadoRepository;
import io.github.jhipster.application.service.MercadoService;
import io.github.jhipster.application.service.dto.MercadoDTO;
import io.github.jhipster.application.service.mapper.MercadoMapper;
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
 * Test class for the MercadoResource REST controller.
 *
 * @see MercadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class MercadoResourceIntTest {

    private static final Integer DEFAULT_ID_MERCADO = 1;
    private static final Integer UPDATED_ID_MERCADO = 2;

    private static final String DEFAULT_NOMBRE_MERCADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MERCADO = "BBBBBBBBBB";

    private static final String DEFAULT_UBICACION = "AAAAAAAAAA";
    private static final String UPDATED_UBICACION = "BBBBBBBBBB";

    @Autowired
    private MercadoRepository mercadoRepository;

    @Autowired
    private MercadoMapper mercadoMapper;

    @Autowired
    private MercadoService mercadoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMercadoMockMvc;

    private Mercado mercado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MercadoResource mercadoResource = new MercadoResource(mercadoService);
        this.restMercadoMockMvc = MockMvcBuilders.standaloneSetup(mercadoResource)
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
    public static Mercado createEntity(EntityManager em) {
        Mercado mercado = new Mercado()
            .idMercado(DEFAULT_ID_MERCADO)
            .nombreMercado(DEFAULT_NOMBRE_MERCADO)
            .ubicacion(DEFAULT_UBICACION);
        return mercado;
    }

    @Before
    public void initTest() {
        mercado = createEntity(em);
    }

    @Test
    @Transactional
    public void createMercado() throws Exception {
        int databaseSizeBeforeCreate = mercadoRepository.findAll().size();

        // Create the Mercado
        MercadoDTO mercadoDTO = mercadoMapper.toDto(mercado);
        restMercadoMockMvc.perform(post("/api/mercados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mercadoDTO)))
            .andExpect(status().isCreated());

        // Validate the Mercado in the database
        List<Mercado> mercadoList = mercadoRepository.findAll();
        assertThat(mercadoList).hasSize(databaseSizeBeforeCreate + 1);
        Mercado testMercado = mercadoList.get(mercadoList.size() - 1);
        assertThat(testMercado.getIdMercado()).isEqualTo(DEFAULT_ID_MERCADO);
        assertThat(testMercado.getNombreMercado()).isEqualTo(DEFAULT_NOMBRE_MERCADO);
        assertThat(testMercado.getUbicacion()).isEqualTo(DEFAULT_UBICACION);
    }

    @Test
    @Transactional
    public void createMercadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mercadoRepository.findAll().size();

        // Create the Mercado with an existing ID
        mercado.setId(1L);
        MercadoDTO mercadoDTO = mercadoMapper.toDto(mercado);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMercadoMockMvc.perform(post("/api/mercados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mercadoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mercado in the database
        List<Mercado> mercadoList = mercadoRepository.findAll();
        assertThat(mercadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMercados() throws Exception {
        // Initialize the database
        mercadoRepository.saveAndFlush(mercado);

        // Get all the mercadoList
        restMercadoMockMvc.perform(get("/api/mercados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mercado.getId().intValue())))
            .andExpect(jsonPath("$.[*].idMercado").value(hasItem(DEFAULT_ID_MERCADO)))
            .andExpect(jsonPath("$.[*].nombreMercado").value(hasItem(DEFAULT_NOMBRE_MERCADO.toString())))
            .andExpect(jsonPath("$.[*].ubicacion").value(hasItem(DEFAULT_UBICACION.toString())));
    }

    @Test
    @Transactional
    public void getMercado() throws Exception {
        // Initialize the database
        mercadoRepository.saveAndFlush(mercado);

        // Get the mercado
        restMercadoMockMvc.perform(get("/api/mercados/{id}", mercado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mercado.getId().intValue()))
            .andExpect(jsonPath("$.idMercado").value(DEFAULT_ID_MERCADO))
            .andExpect(jsonPath("$.nombreMercado").value(DEFAULT_NOMBRE_MERCADO.toString()))
            .andExpect(jsonPath("$.ubicacion").value(DEFAULT_UBICACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMercado() throws Exception {
        // Get the mercado
        restMercadoMockMvc.perform(get("/api/mercados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMercado() throws Exception {
        // Initialize the database
        mercadoRepository.saveAndFlush(mercado);
        int databaseSizeBeforeUpdate = mercadoRepository.findAll().size();

        // Update the mercado
        Mercado updatedMercado = mercadoRepository.findOne(mercado.getId());
        // Disconnect from session so that the updates on updatedMercado are not directly saved in db
        em.detach(updatedMercado);
        updatedMercado
            .idMercado(UPDATED_ID_MERCADO)
            .nombreMercado(UPDATED_NOMBRE_MERCADO)
            .ubicacion(UPDATED_UBICACION);
        MercadoDTO mercadoDTO = mercadoMapper.toDto(updatedMercado);

        restMercadoMockMvc.perform(put("/api/mercados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mercadoDTO)))
            .andExpect(status().isOk());

        // Validate the Mercado in the database
        List<Mercado> mercadoList = mercadoRepository.findAll();
        assertThat(mercadoList).hasSize(databaseSizeBeforeUpdate);
        Mercado testMercado = mercadoList.get(mercadoList.size() - 1);
        assertThat(testMercado.getIdMercado()).isEqualTo(UPDATED_ID_MERCADO);
        assertThat(testMercado.getNombreMercado()).isEqualTo(UPDATED_NOMBRE_MERCADO);
        assertThat(testMercado.getUbicacion()).isEqualTo(UPDATED_UBICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingMercado() throws Exception {
        int databaseSizeBeforeUpdate = mercadoRepository.findAll().size();

        // Create the Mercado
        MercadoDTO mercadoDTO = mercadoMapper.toDto(mercado);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMercadoMockMvc.perform(put("/api/mercados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mercadoDTO)))
            .andExpect(status().isCreated());

        // Validate the Mercado in the database
        List<Mercado> mercadoList = mercadoRepository.findAll();
        assertThat(mercadoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMercado() throws Exception {
        // Initialize the database
        mercadoRepository.saveAndFlush(mercado);
        int databaseSizeBeforeDelete = mercadoRepository.findAll().size();

        // Get the mercado
        restMercadoMockMvc.perform(delete("/api/mercados/{id}", mercado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mercado> mercadoList = mercadoRepository.findAll();
        assertThat(mercadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mercado.class);
        Mercado mercado1 = new Mercado();
        mercado1.setId(1L);
        Mercado mercado2 = new Mercado();
        mercado2.setId(mercado1.getId());
        assertThat(mercado1).isEqualTo(mercado2);
        mercado2.setId(2L);
        assertThat(mercado1).isNotEqualTo(mercado2);
        mercado1.setId(null);
        assertThat(mercado1).isNotEqualTo(mercado2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MercadoDTO.class);
        MercadoDTO mercadoDTO1 = new MercadoDTO();
        mercadoDTO1.setId(1L);
        MercadoDTO mercadoDTO2 = new MercadoDTO();
        assertThat(mercadoDTO1).isNotEqualTo(mercadoDTO2);
        mercadoDTO2.setId(mercadoDTO1.getId());
        assertThat(mercadoDTO1).isEqualTo(mercadoDTO2);
        mercadoDTO2.setId(2L);
        assertThat(mercadoDTO1).isNotEqualTo(mercadoDTO2);
        mercadoDTO1.setId(null);
        assertThat(mercadoDTO1).isNotEqualTo(mercadoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mercadoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mercadoMapper.fromId(null)).isNull();
    }
}
