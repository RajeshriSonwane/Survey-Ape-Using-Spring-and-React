package cmpe275.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Survey {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer surveyId;
    
    private Integer userID;
    
    private String surveyTitle;
    
    // 1-general 2-closed 3-open
    private Integer type;
    
    // 0-unpublished 1-published
    private Integer status;
    
    // 0-not closed 1-closed
    private Integer closed;

    private LocalDateTime startDate;
    
    private LocalDateTime endDate;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "surveyId")
    //@JoinColumn(name = "post_id");
    private List<Question> questions;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "surveyId")
    //@JoinColumn(name = "post_id");
    private List<Response> responses;
    
    public Survey(){  	
    }
    
    public Survey(Integer uid,String stitle,Integer t, Integer s, Integer c, LocalDateTime ed){
    	userID=uid;
    	surveyTitle=stitle;
    	type=t;
    	status=s;
    	closed=c;
    	endDate = ed;
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
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	public Integer getClosed() {
		return closed;
	}
	public void setClosed(Integer closed) {
		this.closed = closed;
	}

	public List<Response> getResponses() {
		return responses;
	}

	public void setResponses(List<Response> responses) {
		this.responses = responses;
	}	
	
	
	
}
