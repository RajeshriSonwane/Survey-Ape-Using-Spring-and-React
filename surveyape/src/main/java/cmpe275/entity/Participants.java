package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Participants {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer participantsId;
    
    private Integer surveyId;
    
    private Integer userId;
    
    public Participants() {
    }
    
    public Participants(Integer d, Integer sid) {
    	userId=d;
    	surveyId=sid;
    }
    
	public Integer getParticipantsId() {
		return participantsId;
	}
	public void setParticipantsId(Integer participantsId) {
		this.participantsId = participantsId;
	}
	public Integer getSurveyId() {
		return surveyId;
	}
	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
}
