package com.example.taxVerification.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taxVerification.Entity.CombinedDataDTO;
import com.example.taxVerification.Entity.Formdata;
import com.example.taxVerification.Entity.User;
import com.example.taxVerification.Repository.FormDataRepository;
import com.example.taxVerification.Repository.UserRepository;
import com.google.zxing.WriterException;

@ComponentScan(basePackages = { "com.example.taxVerification.Controller" })
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class adminController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FormDataRepository formdataRepository;
    @Autowired
    private EmailService emailService;

	@GetMapping("/admin/getAllApplication")
	public List<CombinedDataDTO> getAllData() {
		List<Formdata> table1DataList = formdataRepository.findAll();

		List<CombinedDataDTO> combinedDataList = new ArrayList<>();

		for (Formdata table1Data : table1DataList) {
			CombinedDataDTO combinedDataDTO = new CombinedDataDTO();
			combinedDataDTO.setFormdata(table1Data);

			User table2Data = userRepository.findByUsername(table1Data.getUsername());
			if (table2Data != null) {
				combinedDataDTO.setEmail(table2Data.getEmail());
				combinedDataDTO.setMobileNumber(table2Data.getMobile());
			}

			combinedDataList.add(combinedDataDTO);
		}

		return combinedDataList;
	}

	@PostMapping("/admin/verifyUser")
	public String VerifyUser(@RequestBody Formdata verifiedData) {

		System.out.print(verifiedData.getUsername() + '\n');
		
		int updatedRows = formdataRepository.updateData("Verify",verifiedData.getTaxamount(),verifiedData.getDuedate(), verifiedData.getUsername(), verifiedData.getFname(), verifiedData.getTaxno());

		if (updatedRows > 0) {
			User table2Data = userRepository.findByUsername(verifiedData.getUsername());
			if (table2Data != null) {
		        emailService.sendSimpleMessage(table2Data.getEmail(), "Tax verification status", "Your application has been verified. And the calculated tax is RS."+verifiedData.getTaxamount()+", with a due date of "+verifiedData.getDuedate()+".");
				System.out.print("Record inserted");
			}
			return "success";
		} else {
			return "fail";
		}

	}

	@GetMapping("/admin/doesUserExist/{username}")
	public boolean doesUserExist(@PathVariable("username") String username) {
	    Formdata verifiedData = formdataRepository.findByUsername(username);

	    // Check for null to avoid NullPointerException
	    if (verifiedData != null && "Verify".equalsIgnoreCase(verifiedData.getStatus())) {
	        return true;
	    } else {
	        return false;
	    }
	}

	@PostMapping("/admin/generateQR")
	public String GenrateQR(@RequestBody Formdata formdata) throws WriterException, IOException {

		System.out.print(formdata.getUsername() + '\n');

		Formdata user = formdataRepository.findByAccnumberAndFnameAndTaxnoAndUsername(formdata.getAccnumber(),
				formdata.getFname(), formdata.getTaxno(), formdata.getUsername());

		String qrpath = UserService.generateQRCodeImage(user.getFname() + "|" + user.getTaxno() + "|" + user.getIncome()
				+ "|" + user.getDuedate() + "|" + user.getTaxamount());
		
		int updatedRows = formdataRepository.updateQrpathByUsernameAndFnameAndTaxno(qrpath, user.getUsername(), user.getFname(), user.getTaxno());
		
        if (updatedRows > 0) {
        	User table2Data = userRepository.findByUsername(user.getUsername());
			if (table2Data != null) {
		        emailService.sendSimpleMessage(table2Data.getEmail(), "Tax verification status", "Your payment method with the QR code is to initialise and make payment before the due date.");
				System.out.print("Record inserted");
			}
			return "success";
        } else {
    		return "fail";
        }

	}
	

	
	@GetMapping("/admin/getPaymentData")
	public List<Formdata> getPaymentData() {
		List<Formdata> table1DataList = formdataRepository.findAll();
		return table1DataList;
	}

}