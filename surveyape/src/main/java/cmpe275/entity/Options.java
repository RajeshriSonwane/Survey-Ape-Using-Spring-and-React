package cmpe275.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Options {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer optionId;
    
    private String description;
    
    private Integer questionId;
    
    
    public Options() {
    	
    }
    
	public Options(String description, Integer questionId) {
		this.description = description;
		this.questionId = questionId;
	}

	public Integer getOptionId() {
		return optionId;
	}

	public void setOptionId(Integer optionId) {
		this.optionId = optionId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}  

}
