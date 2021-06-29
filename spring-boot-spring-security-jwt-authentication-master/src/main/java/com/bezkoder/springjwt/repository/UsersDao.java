package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Usersnew;


@Service
public interface UsersDao extends JpaRepository<Usersnew,Long>
{
	List<Usersnew> findByUid(long x);
}
