package com.example.taxVerification.Controller;

import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.taxVerification.TaxVerificationApplication;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;

import javax.imageio.ImageIO;

@Service
public class UserService {
	
    private final static String FOLDER_PATH="D:/Yash/Projects23-24/TaxVerification/Tax/taxVerification/";

    public static String uploadFile(MultipartFile file) {
        String path = "";

        try {
            path = FOLDER_PATH + "static/FormSign/" + file.getOriginalFilename();
            File newFile = new File(path);
            newFile.createNewFile();

            try (FileOutputStream myfile = new FileOutputStream(newFile)) {
                myfile.write(file.getBytes());
            }

            path = "FormSign/" + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return path;
    }
    
    public static String generateQRCodeImage(String text) throws WriterException, IOException {
    	
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int length = 10;
        StringBuilder randomStringBuilder = new StringBuilder(length);
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            randomStringBuilder.append(randomChar);
        }
        String randomString = randomStringBuilder.toString();
        System.out.println("Received file: " + randomString);

        String folderpath = FOLDER_PATH + "static/QR/" + randomString+".png";
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250);

        Path path = Paths.get(folderpath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

        return "QR/" + randomString+".png";
    }
    
    public static String readQRCode(String imagePath) throws IOException, NotFoundException {

    	String path = FOLDER_PATH + "static/" + imagePath;
        File file = new File(path);
        BufferedImage bufferedImage = ImageIO.read(file);

        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(bufferedImage)));
        Result result = new MultiFormatReader().decode(binaryBitmap);

		System.out.print(result.getText()+"\n");
        return result.getText();
    }
    
//	public static void main(String[] args) throws NotFoundException, IOException {
//		SpringApplication.run(TaxVerificationApplication.class, args);
//		
//		System.out.print("Project started ....\n");
//		
//		String text = readQRCode(FOLDER_PATH + "static/QR/2QotCrtHZ9.png");
//		System.out.print(text+"\n");
//	}

}
