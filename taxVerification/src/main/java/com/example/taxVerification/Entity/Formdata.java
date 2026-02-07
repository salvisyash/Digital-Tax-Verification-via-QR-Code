package com.example.taxVerification.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usertaxdata")
public class Formdata {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name="fname")
    private String fname;
	
	@Column(name="taxno")
    private String taxno;
	
	@Column(name="dob")
    private String dob;

	@Column(name="address")
    private String address;
	
	@Column(name="sdate")
    private String sdate;
	
	@Column(name="edate")
    private String edate;
	
	@Column(name="income")
    private String income;
	
	@Column(name="accnumber")
    private String accnumber;
	
	@Column(name="credits")
    private String credits;
	
	@Column(name="fillingstatus")
    private String fillingstatus;
	
	@Column(name="File")
    private String File;
	
	@Column(name="username")
    private String username;
	
	@Column(name="transactionid")
    private String transactionid;
	
	@Column(name="status")
    private String status;
	
	@Column(name="qrpath")
    private String qrpath;
	
	@Column(name="taxamount")
    private String taxamount;
	
	@Column(name="duedate")
    private String duedate;

	public String getTaxamount() {
		return taxamount;
	}

	public void setTaxamount(String taxamount) {
		this.taxamount = taxamount;
	}

	public String getDuedate() {
		return duedate;
	}

	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}

	public String getQrpath() {
		return qrpath;
	}

	public void setQrpath(String qrpath) {
		this.qrpath = qrpath;
	}

	public String getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getTaxno() {
		return taxno;
	}

	public void setTaxno(String taxno) {
		this.taxno = taxno;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getSdate() {
		return sdate;
	}

	public void setSdate(String sdate) {
		this.sdate = sdate;
	}

	public String getEdate() {
		return edate;
	}

	public void setEdate(String edate) {
		this.edate = edate;
	}

	public String getIncome() {
		return income;
	}

	public void setIncome(String income) {
		this.income = income;
	}

	public String getAccnumber() {
		return accnumber;
	}

	public void setAccnumber(String accnumber) {
		this.accnumber = accnumber;
	}

	public String getCredits() {
		return credits;
	}

	public void setCredits(String credits) {
		this.credits = credits;
	}

	public String getFillingstatus() {
		return fillingstatus;
	}

	public void setFillingstatus(String fillingstatus) {
		this.fillingstatus = fillingstatus;
	}

	public String getFile() {
		return File;
	}

	public void setFile(String file) {
		File = file;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}