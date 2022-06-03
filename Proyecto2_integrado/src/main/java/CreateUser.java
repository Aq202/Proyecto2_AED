
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import AccessLayer.User;
import Exceptions.BadRequestException;
import Exceptions.InternalErrorException;


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

			String name = request.getParameter("name");
			String birthYear_param = request.getParameter("birthYear");
			String sex = request.getParameter("sex");
			String nationality = request.getParameter("nationality");
			String language = request.getParameter("language");

			if (name == null)
				throw new BadRequestException("La propiedad 'name' es requerida.");
			if (birthYear_param == null)
				throw new BadRequestException("La propiedad 'birthYear' es requerida.");
			if (sex == null)
				throw new BadRequestException("La propiedad 'sex' es requerida.");
			if( !"M".equalsIgnoreCase(sex.trim()) && !"F".equalsIgnoreCase(sex.trim()) && !"X".equalsIgnoreCase(sex.trim()))
				throw new BadRequestException("La propiedad 'sex' es invalida. Valor 'M', 'F' o 'X' requerido.");
			if (nationality == null)
				throw new BadRequestException("La propiedad 'nationality' es requerida.");
			if (language == null)
				throw new BadRequestException("La propiedad 'language' es requerida.");

			try {
				
				//Validar año de nacimiento como entero
				int birthYear = Integer.parseInt(birthYear_param);
				
				//generar id unico
				String userId = UUID.randomUUID().toString();

				
				try (User user = new User()) {
					String result = user.createUser(userId, name.trim(), sex.toUpperCase().trim(), nationality.toUpperCase().trim(), language.toUpperCase().trim(), birthYear);
					
					myResponse.put("result", result);
					myResponse.put("userId", userId); //enviar userId

				} catch (Exception e) {

					throw new InternalErrorException(e.getMessage());
				}

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
		catch (InternalErrorException ex) {
			JSONObject errorResponse = new JSONObject();
			errorResponse.put("error", ex.getMessage());
			out.println(errorResponse);
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
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
