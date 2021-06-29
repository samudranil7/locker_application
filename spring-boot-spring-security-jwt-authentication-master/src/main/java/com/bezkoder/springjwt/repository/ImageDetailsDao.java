package com.bezkoder.springjwt.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.ImageDetails;

@Service
public interface ImageDetailsDao extends JpaRepository<ImageDetails, Long> 
{
	List<ImageDetails> findByUid(long x);
}
