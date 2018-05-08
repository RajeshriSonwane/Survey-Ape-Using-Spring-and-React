package cmpe275;

import java.time.LocalDateTime;

public class StatDetails {
	String title;
	LocalDateTime starttime;
	LocalDateTime endtime;
	int numParticipants;
	int submissions;
	int invited;
	int registered;
	AnsDistribution[] distribution;
	
	public StatDetails(){		
	}
	
	public StatDetails(String t,LocalDateTime st,LocalDateTime et,int p,int s,int i, int r, AnsDistribution[] d){
		title=t;
		starttime=st;
		endtime=et;
		numParticipants=p;
		submissions=s;
		invited=i;
		registered=r;
		distribution=d;
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
	public int getInvited() {
		return invited;
	}
	public void setInvited(int invited) {
		this.invited = invited;
	}
	public int getRegistered() {
		return registered;
	}
	public void setRegistered(int registered) {
		this.registered = registered;
	}
	public AnsDistribution[] getDistribution() {
		return distribution;
	}
	public void setDistribution(AnsDistribution[] distribution) {
		this.distribution = distribution;
	}
	
}
