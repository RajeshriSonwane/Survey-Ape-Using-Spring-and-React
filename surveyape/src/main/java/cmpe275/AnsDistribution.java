package cmpe275;

public class AnsDistribution {
	private String question;
	private String[] options;
	private int[] answerCount;
	
	
	public AnsDistribution() {		
	}
	
	public AnsDistribution(String q, String[] o, int[] c) {
		question=q;
		options=o;
		answerCount=c;
	}

	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String[] getOptions() {
		return options;
	}
	public void setOptions(String[] options) {
		this.options = options;
	}
	public int[] getAnswerCount() {
		return answerCount;
	}
	public void setAnswerCount(int[] answerCount) {
		this.answerCount = answerCount;
	}

}
