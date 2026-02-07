package com.example.taxVerification.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.taxVerification.Entity.Formdata;
import com.example.taxVerification.Entity.User;

@Repository
public interface FormDataRepository extends CrudRepository<Formdata,Long> {
	
    Formdata findByUsername(String username);
    
    List<Formdata> findAll();
    
    Formdata findByAccnumberAndFnameAndTaxnoAndUsername(String accnumber, String fname, String taxno, String username);
    
    @Modifying
    @Transactional
    @Query("UPDATE Formdata v SET v.transactionid = :transactionid WHERE v.username = :username AND v.fname = :fname AND v.taxno = :taxno")
    int updateTransactionidByUsernameAndFnameAndTaxno(
            @Param("transactionid") String transactionid,
            @Param("username") String username,
            @Param("fname") String fname,
            @Param("taxno") String taxno);

    @Modifying
    @Transactional
    @Query("UPDATE Formdata v SET v.qrpath = :qrpath WHERE v.username = :username AND v.fname = :fname AND v.taxno = :taxno")
    int updateQrpathByUsernameAndFnameAndTaxno(
            @Param("qrpath") String qrpath,
            @Param("username") String username,
            @Param("fname") String fname,
            @Param("taxno") String taxno);

    @Modifying
    @Transactional
    @Query("UPDATE Formdata v SET v.status = :status, v.taxamount = :taxamount, v.duedate = :duedate WHERE v.username = :username AND v.fname = :fname AND v.taxno = :taxno")
    int updateData(
            @Param("status") String status,
            @Param("taxamount") String taxamount,
            @Param("duedate") String duedate,
            @Param("username") String username,
            @Param("fname") String fname,
            @Param("taxno") String taxno);
}
