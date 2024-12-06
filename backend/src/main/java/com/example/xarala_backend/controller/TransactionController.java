    package com.example.xarala_backend.controller;

    import com.example.xarala_backend.exception.ResourceNotFound;
    import com.example.xarala_backend.model.Transaction;
    import com.example.xarala_backend.model.TransactionType;
    import com.example.xarala_backend.service.TransactionService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @CrossOrigin
    @RequestMapping("api/v1/transactions")
    public class TransactionController {

        @Autowired
        TransactionService transacService;
        Transaction transaction;

        @GetMapping
        public ResponseEntity<List<Transaction>> list(){
            List<Transaction> transactions = transacService.getAll();
            return ResponseEntity.ok(transactions);
        }

        @GetMapping("/{id}")

        public  ResponseEntity<Transaction> getById(@PathVariable(value="id") Long id){
            Transaction transaction = transacService.findById(id).orElseThrow(()->new ResourceNotFound("Transcaction avec id: "+id+" non trouvee"));
            return ResponseEntity.ok(transaction);

        }

        @PostMapping
        public Transaction create(@RequestBody Transaction transac){
            return transacService.save(transac);
        }

        @PutMapping("/{id}")

        public ResponseEntity<Transaction> update(@PathVariable(value="id") Long id, @RequestBody Transaction transac){
            Transaction tr = transacService.update(id, transac);
            return ResponseEntity.ok(tr);
        }

        @DeleteMapping("/{id}")

        public ResponseEntity<String> delete(@PathVariable Long id){
            boolean deleted = transacService.deleteById(id);
            if(deleted){
                return ResponseEntity.ok("Transaction supprimee avec success");

            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction non trouvee");
        }


    }
