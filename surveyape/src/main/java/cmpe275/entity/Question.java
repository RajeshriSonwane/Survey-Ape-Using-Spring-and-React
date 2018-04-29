package cmpe275.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer questionId;
    
    private String description;
    
    // text check radio
    private String type;
    
    private Integer surveyId;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "questionId")
    private List<Answer> answerss;
    
    public Question() {
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
