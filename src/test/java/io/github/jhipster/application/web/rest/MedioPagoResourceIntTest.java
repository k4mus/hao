package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.MedioPago;
import io.github.jhipster.application.repository.MedioPagoRepository;
import io.github.jhipster.application.service.MedioPagoService;
import io.github.jhipster.application.service.dto.MedioPagoDTO;
import io.github.jhipster.application.service.mapper.MedioPagoMapper;
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
 * Test class for the MedioPagoResource REST controller.
 *
 * @see MedioPagoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class MedioPagoResourceIntTest {

    private static final Integer DEFAULT_ID_MEDIO_PAGO = 1;
    private static final Integer UPDATED_ID_MEDIO_PAGO = 2;

    private static final String DEFAULT_NOMBRE_MEDIO_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MEDIO_PAGO = "BBBBBBBBBB";

    @Autowired
    private MedioPagoRepository medioPagoRepository;

    @Autowired
    private MedioPagoMapper medioPagoMapper;

    @Autowired
    private MedioPagoService medioPagoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMedioPagoMockMvc;

    private MedioPago medioPago;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedioPagoResource medioPagoResource = new MedioPagoResource(medioPagoService);
        this.restMedioPagoMockMvc = MockMvcBuilders.standaloneSetup(medioPagoResource)
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
    public static MedioPago createEntity(EntityManager em) {
        MedioPago medioPago = new MedioPago()
            .idMedioPago(DEFAULT_ID_MEDIO_PAGO)
            .nombreMedioPago(DEFAULT_NOMBRE_MEDIO_PAGO);
        return medioPago;
    }

    @Before
    public void initTest() {
        medioPago = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedioPago() throws Exception {
        int databaseSizeBeforeCreate = medioPagoRepository.findAll().size();

        // Create the MedioPago
        MedioPagoDTO medioPagoDTO = medioPagoMapper.toDto(medioPago);
        restMedioPagoMockMvc.perform(post("/api/medio-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioPagoDTO)))
            .andExpect(status().isCreated());

        // Validate the MedioPago in the database
        List<MedioPago> medioPagoList = medioPagoRepository.findAll();
        assertThat(medioPagoList).hasSize(databaseSizeBeforeCreate + 1);
        MedioPago testMedioPago = medioPagoList.get(medioPagoList.size() - 1);
        assertThat(testMedioPago.getIdMedioPago()).isEqualTo(DEFAULT_ID_MEDIO_PAGO);
        assertThat(testMedioPago.getNombreMedioPago()).isEqualTo(DEFAULT_NOMBRE_MEDIO_PAGO);
    }

    @Test
    @Transactional
    public void createMedioPagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medioPagoRepository.findAll().size();

        // Create the MedioPago with an existing ID
        medioPago.setId(1L);
        MedioPagoDTO medioPagoDTO = medioPagoMapper.toDto(medioPago);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioPagoMockMvc.perform(post("/api/medio-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioPagoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedioPago in the database
        List<MedioPago> medioPagoList = medioPagoRepository.findAll();
        assertThat(medioPagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMedioPagos() throws Exception {
        // Initialize the database
        medioPagoRepository.saveAndFlush(medioPago);

        // Get all the medioPagoList
        restMedioPagoMockMvc.perform(get("/api/medio-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioPago.getId().intValue())))
            .andExpect(jsonPath("$.[*].idMedioPago").value(hasItem(DEFAULT_ID_MEDIO_PAGO)))
            .andExpect(jsonPath("$.[*].nombreMedioPago").value(hasItem(DEFAULT_NOMBRE_MEDIO_PAGO.toString())));
    }

    @Test
    @Transactional
    public void getMedioPago() throws Exception {
        // Initialize the database
        medioPagoRepository.saveAndFlush(medioPago);

        // Get the medioPago
        restMedioPagoMockMvc.perform(get("/api/medio-pagos/{id}", medioPago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medioPago.getId().intValue()))
            .andExpect(jsonPath("$.idMedioPago").value(DEFAULT_ID_MEDIO_PAGO))
            .andExpect(jsonPath("$.nombreMedioPago").value(DEFAULT_NOMBRE_MEDIO_PAGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedioPago() throws Exception {
        // Get the medioPago
        restMedioPagoMockMvc.perform(get("/api/medio-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedioPago() throws Exception {
        // Initialize the database
        medioPagoRepository.saveAndFlush(medioPago);
        int databaseSizeBeforeUpdate = medioPagoRepository.findAll().size();

        // Update the medioPago
        MedioPago updatedMedioPago = medioPagoRepository.findOne(medioPago.getId());
        // Disconnect from session so that the updates on updatedMedioPago are not directly saved in db
        em.detach(updatedMedioPago);
        updatedMedioPago
            .idMedioPago(UPDATED_ID_MEDIO_PAGO)
            .nombreMedioPago(UPDATED_NOMBRE_MEDIO_PAGO);
        MedioPagoDTO medioPagoDTO = medioPagoMapper.toDto(updatedMedioPago);

        restMedioPagoMockMvc.perform(put("/api/medio-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioPagoDTO)))
            .andExpect(status().isOk());

        // Validate the MedioPago in the database
        List<MedioPago> medioPagoList = medioPagoRepository.findAll();
        assertThat(medioPagoList).hasSize(databaseSizeBeforeUpdate);
        MedioPago testMedioPago = medioPagoList.get(medioPagoList.size() - 1);
        assertThat(testMedioPago.getIdMedioPago()).isEqualTo(UPDATED_ID_MEDIO_PAGO);
        assertThat(testMedioPago.getNombreMedioPago()).isEqualTo(UPDATED_NOMBRE_MEDIO_PAGO);
    }

    @Test
    @Transactional
    public void updateNonExistingMedioPago() throws Exception {
        int databaseSizeBeforeUpdate = medioPagoRepository.findAll().size();

        // Create the MedioPago
        MedioPagoDTO medioPagoDTO = medioPagoMapper.toDto(medioPago);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMedioPagoMockMvc.perform(put("/api/medio-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioPagoDTO)))
            .andExpect(status().isCreated());

        // Validate the MedioPago in the database
        List<MedioPago> medioPagoList = medioPagoRepository.findAll();
        assertThat(medioPagoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMedioPago() throws Exception {
        // Initialize the database
        medioPagoRepository.saveAndFlush(medioPago);
        int databaseSizeBeforeDelete = medioPagoRepository.findAll().size();

        // Get the medioPago
        restMedioPagoMockMvc.perform(delete("/api/medio-pagos/{id}", medioPago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedioPago> medioPagoList = medioPagoRepository.findAll();
        assertThat(medioPagoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioPago.class);
        MedioPago medioPago1 = new MedioPago();
        medioPago1.setId(1L);
        MedioPago medioPago2 = new MedioPago();
        medioPago2.setId(medioPago1.getId());
        assertThat(medioPago1).isEqualTo(medioPago2);
        medioPago2.setId(2L);
        assertThat(medioPago1).isNotEqualTo(medioPago2);
        medioPago1.setId(null);
        assertThat(medioPago1).isNotEqualTo(medioPago2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioPagoDTO.class);
        MedioPagoDTO medioPagoDTO1 = new MedioPagoDTO();
        medioPagoDTO1.setId(1L);
        MedioPagoDTO medioPagoDTO2 = new MedioPagoDTO();
        assertThat(medioPagoDTO1).isNotEqualTo(medioPagoDTO2);
        medioPagoDTO2.setId(medioPagoDTO1.getId());
        assertThat(medioPagoDTO1).isEqualTo(medioPagoDTO2);
        medioPagoDTO2.setId(2L);
        assertThat(medioPagoDTO1).isNotEqualTo(medioPagoDTO2);
        medioPagoDTO1.setId(null);
        assertThat(medioPagoDTO1).isNotEqualTo(medioPagoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(medioPagoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(medioPagoMapper.fromId(null)).isNull();
    }
}
