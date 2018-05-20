package cmpe275;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class StatDetails {
	String title;
	LocalDateTime starttime;
	LocalDateTime endtime;
	int numParticipants;
	int submissions;
	int registered;
	ArrayList<AnsDistribution> distribution;
	
	public StatDetails(){		
	}
	
	public StatDetails(String t,LocalDateTime st,LocalDateTime et,int p,int s, int r, ArrayList<AnsDistribution> dist){
		title=t;
		starttime=st;
		endtime=et;
		numParticipants=p;
		submissions=s;
		registered=r;
		distribution=dist;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public LocalDateTime getStarttime() {
		return starttime;
	}
	public void setStarttime(LocalDateTime starttime) {
		this.starttime = starttime;
	}
	public LocalDateTime getEndtime() {
		return endtime;
	}
	public void setEndtime(LocalDateTime endtime) {
		this.endtime = endtime;
	}
	public int getNumParticipants() {
		return numParticipants;
	}
	public void setNumParticipants(int numParticipants) {
		this.numParticipants = numParticipants;
	}
	public int getSubmissions() {
		return submissions;
	}
	public void setSubmissions(int submissions) {
		this.submissions = submissions;
	}
	public int getRegistered() {
		return registered;
	}
	public void setRegistered(int registered) {
		this.registered = registered;
	}
	public ArrayList<AnsDistribution> getDistribution() {
		return distribution;
	}
	public void setDistribution(ArrayList<AnsDistribution> distribution) {
		this.distribution = distribution;
	}
	
}
