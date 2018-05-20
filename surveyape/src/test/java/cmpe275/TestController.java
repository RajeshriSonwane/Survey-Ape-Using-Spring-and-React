package cmpe275;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.Matchers.*;
import org.springframework.http.MediaType;

import org.junit.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

public class TestController extends AppTest{
	
	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}

	// test success login
	@Test
	public void successLogin() throws Exception {
		String jsonString="{\"email\": \"anjanap1308@gmail.com\", \"password\": \"111111\" } ";
		mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
		}
	
	// test failed login
	@Test
	public void failedLogin() throws Exception {
		String jsonString="{\"email\": \"anjanap1308@gmail.com\", \"password\": \"111100\" } ";
		mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isForbidden());
		}
	
	// test sign up
	@Test
	public void signupTest() throws Exception {
		String jsonString="{\"firstname\" : \"TestFirst\", \"lastname\" : \"TestLast\",\"phoneNo\" :\"211-211-3211\",\"username\" : \"test@test.com\", \"password\" : \"test123\" }";
		mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	
	// test logout
	@Test
	public void logoutTest() throws Exception {
		mockMvc.perform(post("/user/logout"))
				.andExpect(status().isOk());
	}
	
	// test stats
	@Test
	public void statsTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/getsurveydetails/962")
		        .contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound());
	}
	
	// test publish survey
	@Test
	public void publishTest() throws Exception {
		String jsonString="962";
		mockMvc.perform(MockMvcRequestBuilders.post("/publish")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	
	// test unpublish survey
	@Test
	public void unpublishTest() throws Exception {
		String jsonString="962";
		mockMvc.perform(MockMvcRequestBuilders.post("/unpublish")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	
	// test close survey
	@Test
	public void closeTest() throws Exception {
		String jsonString="962";
		mockMvc.perform(MockMvcRequestBuilders.post("/close")
		        .contentType(MediaType.APPLICATION_JSON)
		        .content(jsonString)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	
	// test get all surveys created by surveyor
	@Test
	public void getSurveysTest() throws Exception {
		    mockMvc.perform(get("/getallsurveys"))
		            .andExpect(status().isFound())
		            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		            .andExpect(jsonPath("$", hasSize(2)));
	}
	
	// test get survey by id
	@Test
	public void getSurveyIdTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/getsurveybyid/962")
		        .contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound());
	}
}



