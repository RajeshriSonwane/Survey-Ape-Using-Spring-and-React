package cmpe275;

public class SurveyResponse {
	
	    String surveyId;
	    String questions;
	    String response;
	    Integer guestid;

	    public Integer getGuestid() {
	        return guestid;
	    }

	    public void setGuestid(Integer guestid) {
	        this.guestid = guestid;
	    }

	    public String getSurveyId() {
	        return surveyId;
	    }

	    public void setSurveyId(String surveyId) {
	        this.surveyId = surveyId;
	    }

	    public String getQuestions() {
	        return questions;
	    }

	    public void setQuestions(String questions) {
	        this.questions = questions;
	    }

	    public String getResponse() {
	        return response;
	    }

	    public void setResponse(String response) {
	        this.response = response;
	    }
}
