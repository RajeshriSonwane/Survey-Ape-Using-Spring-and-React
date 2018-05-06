package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;
import javax.persistence.FetchType;

@Entity
public class Response {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer responseId;
     
    private Integer surveyId;
    
    private Integer userId;
    
    private boolean completedStatus;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "responseId")
    private List<Answer> answers;

    public Response() {
    	
    }
	public Response(Integer surveyId, Integer userId, boolean completedStatus) {
		
		this.surveyId = surveyId;
		this.userId = userId;
		this.completedStatus = completedStatus;
	}

	public Integer getResponseId() {
		return responseId;
	}

	public void setResponseId(Integer responseId) {
		this.responseId = responseId;
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

	public boolean isCompletedStatus() {
		return completedStatus;
	}

	public void setCompletedStatus(boolean completedStatus) {
		this.completedStatus = completedStatus;
	}
    
	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
    

}
