package com.bezkoder.springjwt.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.springjwt.models.EmailDetails;
import com.bezkoder.springjwt.models.ImageDetails;
import com.bezkoder.springjwt.models.Usersnew;
import com.bezkoder.springjwt.repository.EmailDetailsDao;
import com.bezkoder.springjwt.repository.ImageDetailsDao;
import com.bezkoder.springjwt.repository.UsersDao;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/app")
public class MyController 
{
	@Autowired
	UsersDao ud;
	
	@Autowired
	ImageDetailsDao idd;
	
	@Autowired
	EmailDetailsDao edd;
	
	@PostMapping("/add_bank")
	@PreAuthorize("hasRole('USER')")
	public String add_resource(@RequestBody Usersnew obj)
	{
		ud.save(obj);
		return "True";
	}
	@GetMapping("/show_usersub/{id}")
	@PreAuthorize("hasRole('USER')")
	public List<Usersnew> getResources(@PathVariable("id") long x)
	{
		List<Usersnew> lis = ud.findByUid(x);
		return lis;
	}
	
	@PostMapping("/add_image")
	@PreAuthorize("hasRole('USER')")
	public String add_image(@RequestBody ImageDetails obj)
	{
		idd.save(obj);
		return "True";
	}
	
	@GetMapping("/show_image/{id}")
	@PreAuthorize("hasRole('USER')")
	public List<ImageDetails> getImdDetails(@PathVariable("id") long x)
	{
		List<ImageDetails> lis = idd.findByUid(x);
		return lis;
	}
	
	@PostMapping("/add_email")
	@PreAuthorize("hasRole('USER')")
	public String add_email(@RequestBody EmailDetails obj)
	{
		edd.save(obj);
		return "True";
	}
	
	@GetMapping("/show_email/{id}")
	@PreAuthorize("hasRole('USER')")
	public List<EmailDetails> getEmailDetails(@PathVariable("id") long x)
	{
		List<EmailDetails> lis = edd.findByUid(x);
		return lis;
	}
}
