package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.Carro;
import io.github.jhipster.application.repository.CarroRepository;
import io.github.jhipster.application.service.CarroService;
import io.github.jhipster.application.service.dto.CarroDTO;
import io.github.jhipster.application.service.mapper.CarroMapper;
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
 * Test class for the CarroResource REST controller.
 *
 * @see CarroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class CarroResourceIntTest {

    private static final Integer DEFAULT_ID_CARRO = 1;
    private static final Integer UPDATED_ID_CARRO = 2;

    private static final Integer DEFAULT_ID_CLIENTE = 1;
    private static final Integer UPDATED_ID_CLIENTE = 2;

    private static final Integer DEFAULT_ID_MERCADO = 1;
    private static final Integer UPDATED_ID_MERCADO = 2;

    private static final Integer DEFAULT_ID_MEDIO_PAGO = 1;
    private static final Integer UPDATED_ID_MEDIO_PAGO = 2;

    private static final String DEFAULT_FECHA = "AAAAAAAAAA";
    private static final String UPDATED_FECHA = "BBBBBBBBBB";

    @Autowired
    private CarroRepository carroRepository;

    @Autowired
    private CarroMapper carroMapper;

    @Autowired
    private CarroService carroService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCarroMockMvc;

    private Carro carro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarroResource carroResource = new CarroResource(carroService);
        this.restCarroMockMvc = MockMvcBuilders.standaloneSetup(carroResource)
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
    public static Carro createEntity(EntityManager em) {
        Carro carro = new Carro()
            .idCarro(DEFAULT_ID_CARRO)
            .idCliente(DEFAULT_ID_CLIENTE)
            .idMercado(DEFAULT_ID_MERCADO)
            .idMedioPago(DEFAULT_ID_MEDIO_PAGO)
            .fecha(DEFAULT_FECHA);
        return carro;
    }

    @Before
    public void initTest() {
        carro = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarro() throws Exception {
        int databaseSizeBeforeCreate = carroRepository.findAll().size();

        // Create the Carro
        CarroDTO carroDTO = carroMapper.toDto(carro);
        restCarroMockMvc.perform(post("/api/carros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroDTO)))
            .andExpect(status().isCreated());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeCreate + 1);
        Carro testCarro = carroList.get(carroList.size() - 1);
        assertThat(testCarro.getIdCarro()).isEqualTo(DEFAULT_ID_CARRO);
        assertThat(testCarro.getIdCliente()).isEqualTo(DEFAULT_ID_CLIENTE);
        assertThat(testCarro.getIdMercado()).isEqualTo(DEFAULT_ID_MERCADO);
        assertThat(testCarro.getIdMedioPago()).isEqualTo(DEFAULT_ID_MEDIO_PAGO);
        assertThat(testCarro.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createCarroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carroRepository.findAll().size();

        // Create the Carro with an existing ID
        carro.setId(1L);
        CarroDTO carroDTO = carroMapper.toDto(carro);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarroMockMvc.perform(post("/api/carros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCarros() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        // Get all the carroList
        restCarroMockMvc.perform(get("/api/carros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carro.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCarro").value(hasItem(DEFAULT_ID_CARRO)))
            .andExpect(jsonPath("$.[*].idCliente").value(hasItem(DEFAULT_ID_CLIENTE)))
            .andExpect(jsonPath("$.[*].idMercado").value(hasItem(DEFAULT_ID_MERCADO)))
            .andExpect(jsonPath("$.[*].idMedioPago").value(hasItem(DEFAULT_ID_MEDIO_PAGO)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void getCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        // Get the carro
        restCarroMockMvc.perform(get("/api/carros/{id}", carro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carro.getId().intValue()))
            .andExpect(jsonPath("$.idCarro").value(DEFAULT_ID_CARRO))
            .andExpect(jsonPath("$.idCliente").value(DEFAULT_ID_CLIENTE))
            .andExpect(jsonPath("$.idMercado").value(DEFAULT_ID_MERCADO))
            .andExpect(jsonPath("$.idMedioPago").value(DEFAULT_ID_MEDIO_PAGO))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCarro() throws Exception {
        // Get the carro
        restCarroMockMvc.perform(get("/api/carros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);
        int databaseSizeBeforeUpdate = carroRepository.findAll().size();

        // Update the carro
        Carro updatedCarro = carroRepository.findOne(carro.getId());
        // Disconnect from session so that the updates on updatedCarro are not directly saved in db
        em.detach(updatedCarro);
        updatedCarro
            .idCarro(UPDATED_ID_CARRO)
            .idCliente(UPDATED_ID_CLIENTE)
            .idMercado(UPDATED_ID_MERCADO)
            .idMedioPago(UPDATED_ID_MEDIO_PAGO)
            .fecha(UPDATED_FECHA);
        CarroDTO carroDTO = carroMapper.toDto(updatedCarro);

        restCarroMockMvc.perform(put("/api/carros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroDTO)))
            .andExpect(status().isOk());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeUpdate);
        Carro testCarro = carroList.get(carroList.size() - 1);
        assertThat(testCarro.getIdCarro()).isEqualTo(UPDATED_ID_CARRO);
        assertThat(testCarro.getIdCliente()).isEqualTo(UPDATED_ID_CLIENTE);
        assertThat(testCarro.getIdMercado()).isEqualTo(UPDATED_ID_MERCADO);
        assertThat(testCarro.getIdMedioPago()).isEqualTo(UPDATED_ID_MEDIO_PAGO);
        assertThat(testCarro.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingCarro() throws Exception {
        int databaseSizeBeforeUpdate = carroRepository.findAll().size();

        // Create the Carro
        CarroDTO carroDTO = carroMapper.toDto(carro);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCarroMockMvc.perform(put("/api/carros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroDTO)))
            .andExpect(status().isCreated());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);
        int databaseSizeBeforeDelete = carroRepository.findAll().size();

        // Get the carro
        restCarroMockMvc.perform(delete("/api/carros/{id}", carro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Carro.class);
        Carro carro1 = new Carro();
        carro1.setId(1L);
        Carro carro2 = new Carro();
        carro2.setId(carro1.getId());
        assertThat(carro1).isEqualTo(carro2);
        carro2.setId(2L);
        assertThat(carro1).isNotEqualTo(carro2);
        carro1.setId(null);
        assertThat(carro1).isNotEqualTo(carro2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarroDTO.class);
        CarroDTO carroDTO1 = new CarroDTO();
        carroDTO1.setId(1L);
        CarroDTO carroDTO2 = new CarroDTO();
        assertThat(carroDTO1).isNotEqualTo(carroDTO2);
        carroDTO2.setId(carroDTO1.getId());
        assertThat(carroDTO1).isEqualTo(carroDTO2);
        carroDTO2.setId(2L);
        assertThat(carroDTO1).isNotEqualTo(carroDTO2);
        carroDTO1.setId(null);
        assertThat(carroDTO1).isNotEqualTo(carroDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(carroMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(carroMapper.fromId(null)).isNull();
    }
}
