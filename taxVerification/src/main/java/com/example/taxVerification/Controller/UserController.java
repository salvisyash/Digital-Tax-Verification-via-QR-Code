package com.example.taxVerification.Controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.taxVerification.Entity.Formdata;
import com.example.taxVerification.Entity.User;
import com.example.taxVerification.Repository.FormDataRepository;
import com.example.taxVerification.Repository.UserRepository;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;

@ComponentScan(basePackages = {"com.example.taxVerification.Controller"})
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController{
    
    @Autowired
    private UserRepository userRepository; 
    @Autowired
    private FormDataRepository formdataRepository; 

    @Autowired
    private EmailService emailService;
    
    @PostMapping("/users/userRegister")
    public String PostUser(@RequestBody User user) {
    	
    	System.out.print(user.getUsername()+'\n'); 
        User checkUser = userRepository.findByUsername(user.getUsername());
		if(checkUser != null) {
	    	System.out.print("Fail"+'\n');
	        return "fail";
		}
		else {
	    	System.out.print("Pass"+'\n');
	    	User n = new User();
	    	
	        n.setFname(user.getFname());
	        n.setUsername(user.getUsername());
	        n.setEmail(user.getEmail());
	        n.setMobile(user.getMobile());
	        n.setPassword(user.getPassword());
	        
	        User result = userRepository.save(n); 
	        
			if(result != null) {
				System.out.print("Record inserted");
				return "success";		
			}  
			else {
		        return "fail";
			}
			
		}
    }
    
    @PostMapping("/users/userLogin")
    public String LoginUser(@RequestBody User user) {
    	
    	System.out.print(user.getUsername()+'\n');    	
        User checkUser = userRepository.findByUsername(user.getUsername());
    	
        if(checkUser == null) {
	        return "fail";
        }
        else if(!checkUser.getPassword().equals(user.getPassword())){
	        return "fail";
        }
        else {
	        return "success";
        }
		
    }
    
    @PostMapping("/users/applyForm")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("fname") String fname,
            @RequestParam("taxno") String taxno,
            @RequestParam("dob") String dob,
            @RequestParam("address") String address,
            @RequestParam("sdate") String sdate,
            @RequestParam("edate") String edate,
            @RequestParam("income") String income,
            @RequestParam("accnumber") String accnumber,
            @RequestParam("credits") String credits,
            @RequestParam("fillingstatus") String fillingstatus,
            @RequestParam("File") MultipartFile file,
            @RequestParam("username") String username
    ) throws WriterException, IOException {
    	
        System.out.println("Received file: " + file.getOriginalFilename());
        
        String path = UserService.uploadFile(file);
        
//        String qrpath = UserService.generateQRCodeImage(fname+"|"+taxno+"|"+dob+"|"+income+"|"+username);
        
        Formdata n = new Formdata();
    	
        n.setFname(fname);
        n.setTaxno(taxno);
        n.setDob(dob);
        n.setAddress(address);
        n.setSdate(sdate);
        n.setEdate(edate);
        n.setIncome(income);
        n.setAccnumber(accnumber);
        n.setCredits(credits);
        n.setFillingstatus(fillingstatus);
        n.setFile(path);
        n.setUsername(username);
        n.setTransactionid("None");
        n.setStatus("None");
        n.setQrpath("None");
        n.setTaxamount("0");;
        n.setDuedate("None");
        
        Formdata result = formdataRepository.save(n); 
        
		if(result != null) {
			System.out.print("Record inserted");
	        return ResponseEntity.ok("success");	
		}  
		else {
	        return ResponseEntity.ok("fail");
		}
    }
    
    @GetMapping("/users/getTaxInfoFromUsername/{username}")
    public ResponseEntity<Formdata> getUserByUsername(@PathVariable("username") String username) {
        Formdata verifiedData = formdataRepository.findByUsername(username);

        if (verifiedData == null || "None".equals(verifiedData.getStatus())) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(verifiedData);
        }
    }
    
    @PostMapping("/users/readQRCode")
    public String readQRCode1(@RequestParam("qrpath") String qrpath) throws NotFoundException, IOException {
    	return UserService.readQRCode(qrpath);
    }
    
    @PostMapping("/users/updatePayment")
    public String updatePayment(@RequestParam("tokenid") String tokenid,
    		@RequestParam("username") String username,
    		@RequestParam("fname") String fname,
    		@RequestParam("taxno") String taxno){    	
    	
		int updatedRows = formdataRepository.updateTransactionidByUsernameAndFnameAndTaxno(tokenid, username, fname,taxno);
		
        if (updatedRows > 0) {
        	User table2Data = userRepository.findByUsername(username);
			if (table2Data != null) {
		        emailService.sendSimpleMessage(table2Data.getEmail(), "Tax verification status", "Your payment is done with this transaction ID: "+tokenid+".");
				System.out.print("Record inserted");
			}
    		return "success";
        } else {
    		return "fail";
        }
    }
    
    @GetMapping("/users/getProfile/{username}")
    public User getProfile(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }
    
    @GetMapping("/users/sendEmail")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
    	
    	System.out.print("------------------------------------");
    	System.out.print(to);
    	System.out.print(subject);
    	System.out.print(text);
    	System.out.print("------------------------------------");
        emailService.sendSimpleMessage(to, subject, text);
        return "Email sent successfully!";
    }


}