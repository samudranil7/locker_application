package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Usersnew 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private long uid;
	private String accName;
	private String accNum;
	private String bank_name;
	private String ifsc;
	private String passcode;
	public Usersnew() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Usersnew(long id, long uid, String accName, String accNum, String bank_name, String ifsc, String passcode) {
		super();
		this.id = id;
		this.uid = uid;
		this.accName = accName;
		this.accNum = accNum;
		this.bank_name = bank_name;
		this.ifsc = ifsc;
		this.passcode = passcode;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public String getAccName() {
		return accName;
	}
	public void setAccName(String accName) {
		this.accName = accName;
	}
	public String getAccNum() {
		return accNum;
	}
	public void setAccNum(String accNum) {
		this.accNum = accNum;
	}
	public String getBank_name() {
		return bank_name;
	}
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	public String getIfsc() {
		return ifsc;
	}
	public void setIfsc(String ifsc) {
		this.ifsc = ifsc;
	}
	public String getPasscode() {
		return passcode;
	}
	public void setPasscode(String passcode) {
		this.passcode = passcode;
	}
}
