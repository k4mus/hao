package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.HaoApp;

import io.github.jhipster.application.domain.StockProducto;
import io.github.jhipster.application.repository.StockProductoRepository;
import io.github.jhipster.application.service.StockProductoService;
import io.github.jhipster.application.service.dto.StockProductoDTO;
import io.github.jhipster.application.service.mapper.StockProductoMapper;
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
 * Test class for the StockProductoResource REST controller.
 *
 * @see StockProductoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HaoApp.class)
public class StockProductoResourceIntTest {

    private static final Integer DEFAULT_ID_STOCK_PRODUCTO = 1;
    private static final Integer UPDATED_ID_STOCK_PRODUCTO = 2;

    private static final Integer DEFAULT_ID_STOCK = 1;
    private static final Integer UPDATED_ID_STOCK = 2;

    private static final String DEFAULT_ID_PRODUCTO = "AAAAAAAAAA";
    private static final String UPDATED_ID_PRODUCTO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    @Autowired
    private StockProductoRepository stockProductoRepository;

    @Autowired
    private StockProductoMapper stockProductoMapper;

    @Autowired
    private StockProductoService stockProductoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStockProductoMockMvc;

    private StockProducto stockProducto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StockProductoResource stockProductoResource = new StockProductoResource(stockProductoService);
        this.restStockProductoMockMvc = MockMvcBuilders.standaloneSetup(stockProductoResource)
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
    public static StockProducto createEntity(EntityManager em) {
        StockProducto stockProducto = new StockProducto()
            .idStockProducto(DEFAULT_ID_STOCK_PRODUCTO)
            .idStock(DEFAULT_ID_STOCK)
            .idProducto(DEFAULT_ID_PRODUCTO)
            .cantidad(DEFAULT_CANTIDAD);
        return stockProducto;
    }

    @Before
    public void initTest() {
        stockProducto = createEntity(em);
    }

    @Test
    @Transactional
    public void createStockProducto() throws Exception {
        int databaseSizeBeforeCreate = stockProductoRepository.findAll().size();

        // Create the StockProducto
        StockProductoDTO stockProductoDTO = stockProductoMapper.toDto(stockProducto);
        restStockProductoMockMvc.perform(post("/api/stock-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockProductoDTO)))
            .andExpect(status().isCreated());

        // Validate the StockProducto in the database
        List<StockProducto> stockProductoList = stockProductoRepository.findAll();
        assertThat(stockProductoList).hasSize(databaseSizeBeforeCreate + 1);
        StockProducto testStockProducto = stockProductoList.get(stockProductoList.size() - 1);
        assertThat(testStockProducto.getIdStockProducto()).isEqualTo(DEFAULT_ID_STOCK_PRODUCTO);
        assertThat(testStockProducto.getIdStock()).isEqualTo(DEFAULT_ID_STOCK);
        assertThat(testStockProducto.getIdProducto()).isEqualTo(DEFAULT_ID_PRODUCTO);
        assertThat(testStockProducto.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createStockProductoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stockProductoRepository.findAll().size();

        // Create the StockProducto with an existing ID
        stockProducto.setId(1L);
        StockProductoDTO stockProductoDTO = stockProductoMapper.toDto(stockProducto);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStockProductoMockMvc.perform(post("/api/stock-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockProductoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StockProducto in the database
        List<StockProducto> stockProductoList = stockProductoRepository.findAll();
        assertThat(stockProductoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStockProductos() throws Exception {
        // Initialize the database
        stockProductoRepository.saveAndFlush(stockProducto);

        // Get all the stockProductoList
        restStockProductoMockMvc.perform(get("/api/stock-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stockProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].idStockProducto").value(hasItem(DEFAULT_ID_STOCK_PRODUCTO)))
            .andExpect(jsonPath("$.[*].idStock").value(hasItem(DEFAULT_ID_STOCK)))
            .andExpect(jsonPath("$.[*].idProducto").value(hasItem(DEFAULT_ID_PRODUCTO.toString())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }

    @Test
    @Transactional
    public void getStockProducto() throws Exception {
        // Initialize the database
        stockProductoRepository.saveAndFlush(stockProducto);

        // Get the stockProducto
        restStockProductoMockMvc.perform(get("/api/stock-productos/{id}", stockProducto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stockProducto.getId().intValue()))
            .andExpect(jsonPath("$.idStockProducto").value(DEFAULT_ID_STOCK_PRODUCTO))
            .andExpect(jsonPath("$.idStock").value(DEFAULT_ID_STOCK))
            .andExpect(jsonPath("$.idProducto").value(DEFAULT_ID_PRODUCTO.toString()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingStockProducto() throws Exception {
        // Get the stockProducto
        restStockProductoMockMvc.perform(get("/api/stock-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStockProducto() throws Exception {
        // Initialize the database
        stockProductoRepository.saveAndFlush(stockProducto);
        int databaseSizeBeforeUpdate = stockProductoRepository.findAll().size();

        // Update the stockProducto
        StockProducto updatedStockProducto = stockProductoRepository.findOne(stockProducto.getId());
        // Disconnect from session so that the updates on updatedStockProducto are not directly saved in db
        em.detach(updatedStockProducto);
        updatedStockProducto
            .idStockProducto(UPDATED_ID_STOCK_PRODUCTO)
            .idStock(UPDATED_ID_STOCK)
            .idProducto(UPDATED_ID_PRODUCTO)
            .cantidad(UPDATED_CANTIDAD);
        StockProductoDTO stockProductoDTO = stockProductoMapper.toDto(updatedStockProducto);

        restStockProductoMockMvc.perform(put("/api/stock-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockProductoDTO)))
            .andExpect(status().isOk());

        // Validate the StockProducto in the database
        List<StockProducto> stockProductoList = stockProductoRepository.findAll();
        assertThat(stockProductoList).hasSize(databaseSizeBeforeUpdate);
        StockProducto testStockProducto = stockProductoList.get(stockProductoList.size() - 1);
        assertThat(testStockProducto.getIdStockProducto()).isEqualTo(UPDATED_ID_STOCK_PRODUCTO);
        assertThat(testStockProducto.getIdStock()).isEqualTo(UPDATED_ID_STOCK);
        assertThat(testStockProducto.getIdProducto()).isEqualTo(UPDATED_ID_PRODUCTO);
        assertThat(testStockProducto.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingStockProducto() throws Exception {
        int databaseSizeBeforeUpdate = stockProductoRepository.findAll().size();

        // Create the StockProducto
        StockProductoDTO stockProductoDTO = stockProductoMapper.toDto(stockProducto);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStockProductoMockMvc.perform(put("/api/stock-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockProductoDTO)))
            .andExpect(status().isCreated());

        // Validate the StockProducto in the database
        List<StockProducto> stockProductoList = stockProductoRepository.findAll();
        assertThat(stockProductoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStockProducto() throws Exception {
        // Initialize the database
        stockProductoRepository.saveAndFlush(stockProducto);
        int databaseSizeBeforeDelete = stockProductoRepository.findAll().size();

        // Get the stockProducto
        restStockProductoMockMvc.perform(delete("/api/stock-productos/{id}", stockProducto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StockProducto> stockProductoList = stockProductoRepository.findAll();
        assertThat(stockProductoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockProducto.class);
        StockProducto stockProducto1 = new StockProducto();
        stockProducto1.setId(1L);
        StockProducto stockProducto2 = new StockProducto();
        stockProducto2.setId(stockProducto1.getId());
        assertThat(stockProducto1).isEqualTo(stockProducto2);
        stockProducto2.setId(2L);
        assertThat(stockProducto1).isNotEqualTo(stockProducto2);
        stockProducto1.setId(null);
        assertThat(stockProducto1).isNotEqualTo(stockProducto2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockProductoDTO.class);
        StockProductoDTO stockProductoDTO1 = new StockProductoDTO();
        stockProductoDTO1.setId(1L);
        StockProductoDTO stockProductoDTO2 = new StockProductoDTO();
        assertThat(stockProductoDTO1).isNotEqualTo(stockProductoDTO2);
        stockProductoDTO2.setId(stockProductoDTO1.getId());
        assertThat(stockProductoDTO1).isEqualTo(stockProductoDTO2);
        stockProductoDTO2.setId(2L);
        assertThat(stockProductoDTO1).isNotEqualTo(stockProductoDTO2);
        stockProductoDTO1.setId(null);
        assertThat(stockProductoDTO1).isNotEqualTo(stockProductoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stockProductoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stockProductoMapper.fromId(null)).isNull();
    }
}
