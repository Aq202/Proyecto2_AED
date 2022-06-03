
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

import AccessLayer.Movie;
import AccessLayer.User;
import Exceptions.BadRequestException;
import Exceptions.InternalErrorException;

/**
 * Servlet implementation class SearchDirectors
 */
@WebServlet("/searchDirectors")
public class SearchDirectors extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SearchDirectors() {
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
			String max = request.getParameter("max");

			if (name == null)
				throw new BadRequestException("La propiedad 'name' es requerida.");
			
			//parse max to int
			int maxResults = 5; //default value
			try {
				maxResults = Integer.parseInt(max);
			}catch(NumberFormatException ex) {
				
			}

			JSONArray directorsList;

			try (Movie movie = new Movie()) {
				directorsList = movie.searchDirectorsByName(name, maxResults);


			} catch (Exception e) {
				throw new InternalErrorException(e.getMessage());
			}

			myResponse.put("length", directorsList.size()); // Guardo la cantidad de directores
			myResponse.put("names", directorsList);
			out.println(myResponse);
			out.flush();

		} catch (BadRequestException ex) {
			JSONObject errorResponse = new JSONObject();
			errorResponse.put("error", ex.getMessage());
			out.println(errorResponse);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} catch (InternalErrorException ex) {
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
