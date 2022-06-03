

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import AccessLayer.User;


/**
 * Servlet implementation class GetUsersList
 */
@WebServlet("/getUsersList")
public class GetUsersList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUsersList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		
	 	response.setContentType("application/json");
	 	response.setCharacterEncoding("UTF-8");
	 	
	 	JSONObject myResponse = new JSONObject();
	 	JSONArray usersData = new JSONArray();
	 	
	 	 try ( User user = new User() )
	        {
			 	LinkedList<String> myactors = user.getUsersList();
			 	
			 	for (int i = 0; i < myactors.size(); i++) {
			 		usersData.add(myactors.get(i));
			 	}
	        	
	        } catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	 	
	 	myResponse.put("conteo", usersData.size()); //Guardo la cantidad de actores
	 	myResponse.put("Usuarios", usersData);
	 	out.println(myResponse);
	 	out.flush();  
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
