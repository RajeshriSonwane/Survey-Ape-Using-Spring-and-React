package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer questionId;
    
    private String description;
    
    private String type;
    
    private Integer surveyId;
    
    public Question() {
    }
    
    public Question(String d, Integer sid) {
    	description=d;
    	surveyId=sid;
    }
    
    public Question(String d, String t,Integer sid) {
    	description=d;
    	type=t;
    	surveyId=sid;
    }
    
	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	
	}
}
