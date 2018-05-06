package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Answer {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer answerId;
    
    private String answer;
    
    private Integer questionId;
    
    private Integer responseId;
    
    public Answer() {
    	
    }

    public Answer(Integer responseId, Integer questionId) {
    	this.setResponseId(responseId);
    	this.questionId = questionId;
    	
    }
	public Answer( Integer responseId, Integer questionId, String answer) {
		this.setResponseId(responseId);
		this.answer = answer;
		this.questionId = questionId;
	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public Integer getResponseId() {
		return responseId;
	}

	public void setResponseId(Integer responseId) {
		this.responseId = responseId;
	}
    
    

}
