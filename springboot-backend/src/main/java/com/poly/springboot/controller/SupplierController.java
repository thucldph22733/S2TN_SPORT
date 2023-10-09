package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Size;
import com.poly.springboot.entity.Supplier;
import com.poly.springboot.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class SupplierController {

    @Autowired
    private SupplierService supplier;

    @GetMapping("supplier")
    public ResponseEntity<List<Supplier>> getAll() {
        List<Supplier> a = supplier.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("supplier/{id}")
    public ResponseEntity<Supplier> findById(@PathVariable Long id){
        Supplier a = supplier.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-supplier")
    public ResponseEntity<Supplier>crate(@RequestBody SupplierRequestDto supplierRequestDto){
        Supplier a = supplier.save(supplierRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-supplier/{id}")
    public ResponseEntity<Supplier> update(@RequestBody SupplierRequestDto supplierRequestDto,@PathVariable Long id){
        Supplier a = supplier.update(supplierRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-supplier/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = supplier.delete(id);
        return ResponseEntity.ok(mes);
    }

}
