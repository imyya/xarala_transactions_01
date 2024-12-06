package com.example.xarala_backend.service;

import com.example.xarala_backend.exception.ResourceNotFound;
import com.example.xarala_backend.model.Transaction;
import com.example.xarala_backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TransactionService {
    @Autowired
    TransactionRepository transacRepo;

    public List<Transaction> getAll(){return transacRepo.findAll();}

    public Optional<Transaction> findById(Long id){return transacRepo.findById(id);}

    public Transaction save(Transaction transaction){return  transacRepo.save(transaction);}

    public boolean deleteById(Long id){

        if(transacRepo.existsById(id)){
            transacRepo.deleteById(id);
            return true;
        }
        return false;

    }

    public  Transaction update(Long id, Transaction tr){
        return transacRepo.findById(id).map(t->{
            if(tr.getAmount()!=null){
                t.setAmount(tr.getAmount());
            }
            if(tr.getDescription()!=null){
                t.setDescription(tr.getDescription());
            }
            if(tr.getDate()!=null){
                t.setDate(tr.getDate());
            }
            if(tr.getType()!=null){
                t.setType(tr.getType());

            }

            return transacRepo.save(t);

        }).orElseThrow(()->new ResourceNotFound("Transaction not found"));
    }


}
