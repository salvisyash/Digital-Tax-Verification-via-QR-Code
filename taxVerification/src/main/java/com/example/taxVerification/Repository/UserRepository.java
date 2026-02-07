package com.example.taxVerification.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.taxVerification.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {	
	
    boolean existsByUsername(String username);
    
    User findByUsername(String username);
}
