package com.example.xarala_backend.controller;

import com.example.xarala_backend.service.TransactionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

//import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.get;
//import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionController transactionController;

    @Test

    public void testCreateTransactionIntegration() throws Exception{
        String jsonRequest = "{ \"description\": \"Test Transaction\", \"amount\": 100.0, \"type\": \"REVENU\", \"date\": \"2024-12-05\" }";

        mockMvc.perform(post("/api/v1/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Test Transaction"))
                .andExpect(jsonPath("$.amount").value(100.0));

    }

    @Test
    public void testGetTransactionById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/transactions/9"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Test Transaction"));
    }

    @Test
    public void testDeleteTransaction() throws Exception {
        mockMvc.perform(delete("/api/v1/transactions/10"))
                .andExpect(status().isOk())
                .andExpect(content().string("Transaction supprimee avec success"));
    }


}
