package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer guestId;
    
    private String email;
    
    private Integer surveyId;
    
    private Integer given;

    public Guest() {
    }
    public Guest(String e, Integer s, Integer g) {
    	email=e;
    	surveyId=s;
    	given = g;
    }
    
	public Integer getGiven() {
		return given;
	}
	public void setGiven(Integer given) {
		this.given = given;
	}
	public Integer getGuestId() {
		return guestId;
	}
	public void setGuestId(Integer guestId) {
		this.guestId = guestId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getSurveyId() {
		return surveyId;
	}
	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}

}
