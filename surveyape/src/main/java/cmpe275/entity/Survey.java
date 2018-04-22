package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Survey {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer surveyId;
    
    private Integer userID;
    
    private String surveyTitle;
    // 1-general 2-closed 3-open
    private Integer type;
    
    public Survey(){  	
    }
    
    public Survey(Integer uid,String stitle,Integer t){
    	userID=uid;
    	surveyTitle=stitle;
    	type=t;
    }
    
	public Integer getSurveyId() {
		return surveyId;
	}
	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}
	public Integer getUserID() {
		return userID;
	}
	public void setUserID(Integer userID) {
		this.userID = userID;
	}
	public String getSurveyTitle() {
		return surveyTitle;
	}
	public void setSurveyTitle(String surveyTitle) {
		this.surveyTitle = surveyTitle;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
}
