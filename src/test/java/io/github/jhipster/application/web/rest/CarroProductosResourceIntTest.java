package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.CarroProductos;
import io.github.jhipster.application.repository.CarroProductosRepository;
import io.github.jhipster.application.service.CarroProductosService;
import io.github.jhipster.application.service.dto.CarroProductosDTO;
import io.github.jhipster.application.service.mapper.CarroProductosMapper;
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
 * Test class for the CarroProductosResource REST controller.
 *
 * @see CarroProductosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class CarroProductosResourceIntTest {

    private static final Integer DEFAULT_ID_CARRO = 1;
    private static final Integer UPDATED_ID_CARRO = 2;

    private static final Integer DEFAULT_ID_STOCK_PRODUCTO = 1;
    private static final Integer UPDATED_ID_STOCK_PRODUCTO = 2;

    private static final Integer DEFAULT_PRECIO = 1;
    private static final Integer UPDATED_PRECIO = 2;

    private static final Integer DEFAULT_DESCUENTO = 1;
    private static final Integer UPDATED_DESCUENTO = 2;

    private static final Integer DEFAULT_ID_DIRECCION_CLIENTE = 1;
    private static final Integer UPDATED_ID_DIRECCION_CLIENTE = 2;

    @Autowired
    private CarroProductosRepository carroProductosRepository;

    @Autowired
    private CarroProductosMapper carroProductosMapper;

    @Autowired
    private CarroProductosService carroProductosService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCarroProductosMockMvc;

    private CarroProductos carroProductos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarroProductosResource carroProductosResource = new CarroProductosResource(carroProductosService);
        this.restCarroProductosMockMvc = MockMvcBuilders.standaloneSetup(carroProductosResource)
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
    public static CarroProductos createEntity(EntityManager em) {
        CarroProductos carroProductos = new CarroProductos()
            .idCarro(DEFAULT_ID_CARRO)
            .idStockProducto(DEFAULT_ID_STOCK_PRODUCTO)
            .precio(DEFAULT_PRECIO)
            .descuento(DEFAULT_DESCUENTO)
            .idDireccionCliente(DEFAULT_ID_DIRECCION_CLIENTE);
        return carroProductos;
    }

    @Before
    public void initTest() {
        carroProductos = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarroProductos() throws Exception {
        int databaseSizeBeforeCreate = carroProductosRepository.findAll().size();

        // Create the CarroProductos
        CarroProductosDTO carroProductosDTO = carroProductosMapper.toDto(carroProductos);
        restCarroProductosMockMvc.perform(post("/api/carro-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroProductosDTO)))
            .andExpect(status().isCreated());

        // Validate the CarroProductos in the database
        List<CarroProductos> carroProductosList = carroProductosRepository.findAll();
        assertThat(carroProductosList).hasSize(databaseSizeBeforeCreate + 1);
        CarroProductos testCarroProductos = carroProductosList.get(carroProductosList.size() - 1);
        assertThat(testCarroProductos.getIdCarro()).isEqualTo(DEFAULT_ID_CARRO);
        assertThat(testCarroProductos.getIdStockProducto()).isEqualTo(DEFAULT_ID_STOCK_PRODUCTO);
        assertThat(testCarroProductos.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testCarroProductos.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testCarroProductos.getIdDireccionCliente()).isEqualTo(DEFAULT_ID_DIRECCION_CLIENTE);
    }

    @Test
    @Transactional
    public void createCarroProductosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carroProductosRepository.findAll().size();

        // Create the CarroProductos with an existing ID
        carroProductos.setId(1L);
        CarroProductosDTO carroProductosDTO = carroProductosMapper.toDto(carroProductos);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarroProductosMockMvc.perform(post("/api/carro-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroProductosDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CarroProductos in the database
        List<CarroProductos> carroProductosList = carroProductosRepository.findAll();
        assertThat(carroProductosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCarroProductos() throws Exception {
        // Initialize the database
        carroProductosRepository.saveAndFlush(carroProductos);

        // Get all the carroProductosList
        restCarroProductosMockMvc.perform(get("/api/carro-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carroProductos.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCarro").value(hasItem(DEFAULT_ID_CARRO)))
            .andExpect(jsonPath("$.[*].idStockProducto").value(hasItem(DEFAULT_ID_STOCK_PRODUCTO)))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO)))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO)))
            .andExpect(jsonPath("$.[*].idDireccionCliente").value(hasItem(DEFAULT_ID_DIRECCION_CLIENTE)));
    }

    @Test
    @Transactional
    public void getCarroProductos() throws Exception {
        // Initialize the database
        carroProductosRepository.saveAndFlush(carroProductos);

        // Get the carroProductos
        restCarroProductosMockMvc.perform(get("/api/carro-productos/{id}", carroProductos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carroProductos.getId().intValue()))
            .andExpect(jsonPath("$.idCarro").value(DEFAULT_ID_CARRO))
            .andExpect(jsonPath("$.idStockProducto").value(DEFAULT_ID_STOCK_PRODUCTO))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO))
            .andExpect(jsonPath("$.idDireccionCliente").value(DEFAULT_ID_DIRECCION_CLIENTE));
    }

    @Test
    @Transactional
    public void getNonExistingCarroProductos() throws Exception {
        // Get the carroProductos
        restCarroProductosMockMvc.perform(get("/api/carro-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarroProductos() throws Exception {
        // Initialize the database
        carroProductosRepository.saveAndFlush(carroProductos);
        int databaseSizeBeforeUpdate = carroProductosRepository.findAll().size();

        // Update the carroProductos
        CarroProductos updatedCarroProductos = carroProductosRepository.findOne(carroProductos.getId());
        // Disconnect from session so that the updates on updatedCarroProductos are not directly saved in db
        em.detach(updatedCarroProductos);
        updatedCarroProductos
            .idCarro(UPDATED_ID_CARRO)
            .idStockProducto(UPDATED_ID_STOCK_PRODUCTO)
            .precio(UPDATED_PRECIO)
            .descuento(UPDATED_DESCUENTO)
            .idDireccionCliente(UPDATED_ID_DIRECCION_CLIENTE);
        CarroProductosDTO carroProductosDTO = carroProductosMapper.toDto(updatedCarroProductos);

        restCarroProductosMockMvc.perform(put("/api/carro-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroProductosDTO)))
            .andExpect(status().isOk());

        // Validate the CarroProductos in the database
        List<CarroProductos> carroProductosList = carroProductosRepository.findAll();
        assertThat(carroProductosList).hasSize(databaseSizeBeforeUpdate);
        CarroProductos testCarroProductos = carroProductosList.get(carroProductosList.size() - 1);
        assertThat(testCarroProductos.getIdCarro()).isEqualTo(UPDATED_ID_CARRO);
        assertThat(testCarroProductos.getIdStockProducto()).isEqualTo(UPDATED_ID_STOCK_PRODUCTO);
        assertThat(testCarroProductos.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testCarroProductos.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testCarroProductos.getIdDireccionCliente()).isEqualTo(UPDATED_ID_DIRECCION_CLIENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingCarroProductos() throws Exception {
        int databaseSizeBeforeUpdate = carroProductosRepository.findAll().size();

        // Create the CarroProductos
        CarroProductosDTO carroProductosDTO = carroProductosMapper.toDto(carroProductos);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCarroProductosMockMvc.perform(put("/api/carro-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carroProductosDTO)))
            .andExpect(status().isCreated());

        // Validate the CarroProductos in the database
        List<CarroProductos> carroProductosList = carroProductosRepository.findAll();
        assertThat(carroProductosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCarroProductos() throws Exception {
        // Initialize the database
        carroProductosRepository.saveAndFlush(carroProductos);
        int databaseSizeBeforeDelete = carroProductosRepository.findAll().size();

        // Get the carroProductos
        restCarroProductosMockMvc.perform(delete("/api/carro-productos/{id}", carroProductos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CarroProductos> carroProductosList = carroProductosRepository.findAll();
        assertThat(carroProductosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarroProductos.class);
        CarroProductos carroProductos1 = new CarroProductos();
        carroProductos1.setId(1L);
        CarroProductos carroProductos2 = new CarroProductos();
        carroProductos2.setId(carroProductos1.getId());
        assertThat(carroProductos1).isEqualTo(carroProductos2);
        carroProductos2.setId(2L);
        assertThat(carroProductos1).isNotEqualTo(carroProductos2);
        carroProductos1.setId(null);
        assertThat(carroProductos1).isNotEqualTo(carroProductos2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarroProductosDTO.class);
        CarroProductosDTO carroProductosDTO1 = new CarroProductosDTO();
        carroProductosDTO1.setId(1L);
        CarroProductosDTO carroProductosDTO2 = new CarroProductosDTO();
        assertThat(carroProductosDTO1).isNotEqualTo(carroProductosDTO2);
        carroProductosDTO2.setId(carroProductosDTO1.getId());
        assertThat(carroProductosDTO1).isEqualTo(carroProductosDTO2);
        carroProductosDTO2.setId(2L);
        assertThat(carroProductosDTO1).isNotEqualTo(carroProductosDTO2);
        carroProductosDTO1.setId(null);
        assertThat(carroProductosDTO1).isNotEqualTo(carroProductosDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(carroProductosMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(carroProductosMapper.fromId(null)).isNull();
    }
}
