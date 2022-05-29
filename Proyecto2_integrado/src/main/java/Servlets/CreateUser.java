package Servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import AccessLayer.User;
import Exceptions.BadRequestException;
import Exceptions.BadRequestException;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/createUser")
public class CreateUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CreateUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		JSONObject myResponse = new JSONObject();

		try {

			JSONArray insertionResult = new JSONArray();

			String name = request.getParameter("name");
			String age_param = request.getParameter("age");

			if (name == null || age_param == null)
				throw new BadRequestException("Las propiedades name y age son requeridas.");

			try {

				int age = Integer.parseInt(age_param);

				System.out.println("Name: " + name + " Age: " + age);

				try (User user = new User()) {
					String myResultTx = user.createUser(name, age);
					myResponse.put("resultado", myResultTx);

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					myResponse.put("resultado", "Error: " + e.getMessage());
				}

				myResponse.put("Parametros", "Name: " + name + " Age: " + age);
				out.println(myResponse);
				out.flush();

			} catch (NumberFormatException ex) {
				throw new BadRequestException("La propiedad age debe ser un número entero.");
			}

		} catch (BadRequestException ex) {
			JSONObject errorResponse = new JSONObject();
			errorResponse.put("error", ex.getMessage());
			out.println(errorResponse);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
