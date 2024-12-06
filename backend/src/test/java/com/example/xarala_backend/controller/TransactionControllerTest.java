package com.example.xarala_backend.controller;


import com.example.xarala_backend.model.Transaction;
import com.example.xarala_backend.service.TransactionService;
import com.mysql.cj.x.protobuf.Mysqlx;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TransactionControllerTest {

    @Mock
    TransactionService transactionService;
    @InjectMocks
    TransactionController transactionController;

    @Test

    public void testListTransaction(){
        Transaction transaction1 = new Transaction(1L, "Description 1", 100.0, null, null);
        Transaction transaction2 = new Transaction(2L, "Description 2", 150.0, null, null);
        List<Transaction> transactionList = Arrays.asList(transaction1,transaction2);

        when(transactionService.getAll()).thenReturn(transactionList);
        ResponseEntity<List<Transaction>> response = transactionController.list();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(transactionList);


    }

    @Test
    public void testCreateTransaction() {
        Transaction transaction = new Transaction(1L, "Test Description", 250.0, null, null);
        when(transactionService.save(transaction)).thenReturn(transaction);

        Transaction createdTransaction = transactionController.create(transaction);

        assertThat(createdTransaction).isNotNull();
        assertThat(createdTransaction.getDescription()).isEqualTo("Test Description");
    }

    public void testDeleteTransaction(){
        Long id = 1L;
        when(transactionService.deleteById(id)).thenReturn(true);

        ResponseEntity<String> resp = transactionController.delete(id);

        assertThat(resp.getStatusCodeValue()).isEqualTo(200);
        assertThat(resp.getBody()).isEqualTo("Transaction supprimee avec succes");
    }



}
