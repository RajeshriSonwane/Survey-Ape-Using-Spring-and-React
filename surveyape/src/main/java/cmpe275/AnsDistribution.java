package cmpe275;

import java.util.ArrayList;

public class AnsDistribution {
	private String question;
	private String type;
	private ArrayList<String> options;
	private ArrayList<Integer> answerCount;
	
	
	public AnsDistribution() {		
	}
	
	public AnsDistribution(String q, String t, ArrayList<String> optionname, ArrayList<Integer> anscount) {
		question=q;
		type = t;
		options=optionname;
		answerCount=anscount;
	}

	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public ArrayList<String> getOptions() {
		return options;
	}
	public void setOptions(ArrayList<String> options) {
		this.options = options;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ArrayList<Integer> getAnswerCount() {
		return answerCount;
	}
	public void setAnswerCount(ArrayList<Integer> answerCount) {
		this.answerCount = answerCount;
	}

}
