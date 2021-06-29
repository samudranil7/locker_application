package com.bezkoder.springjwt.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.EmailDetails;


@Service
public interface EmailDetailsDao extends JpaRepository<EmailDetails, Long> 
{
	List<EmailDetails> findByUid(long x);
}
