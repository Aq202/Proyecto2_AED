package Servlets;

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

import AccessLayer.Movie;
import AccessLayer.User;
import Exceptions.BadRequestException;
import Exceptions.InternalErrorException;


/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/createMovie")
public class CreateMovie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CreateMovie() {
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

			String title = request.getParameter("title");
			String duration_param = request.getParameter("duration");
			String director = request.getParameter("director");
			String country = request.getParameter("country");
			String mainCharacter = request.getParameter("mainCharacter");
			String releaseYear_param = request.getParameter("releaseYear");
			String language = request.getParameter("language");
			String genre = request.getParameter("genre");

			if (title == null)
				throw new BadRequestException("La propiedad 'title' es requerida.");
			if (duration_param == null)
				throw new BadRequestException("La propiedad 'duration' es requerida.");
			if (director == null)
				throw new BadRequestException("La propiedad 'director' es requerida.");
			if (country == null)
				throw new BadRequestException("La propiedad 'country' es requerida.");
			if (mainCharacter == null)
				throw new BadRequestException("La propiedad 'mainCharacter' es requerida.");
			if (releaseYear_param == null)
				throw new BadRequestException("La propiedad 'releaseYear' es requerida.");
			if (language == null)
				throw new BadRequestException("La propiedad 'language' es requerida.");
			if (genre == null)
				throw new BadRequestException("La propiedad 'genre' es requerida.");
			try {
				
				//Validar que la duracion como entero
				int duration = Integer.parseInt(duration_param);
				
				String s_duration = "";
				if (duration > 120) {
					s_duration = "> 120 min";
				}
				else if (duration <= 120 && duration > 90) {
					s_duration = "> 90 min";
				}
				else if (duration <= 90 && duration > 60) {
					s_duration = "> 60 min";
				}
				else if (duration <= 60) {
					s_duration = "<= 60 min";
				}
				
				try {
					
					//Validar año de lanzamiento como entero
					int releaseYear = Integer.parseInt(releaseYear_param);
					
					try (Movie movie = new Movie()) {
						String result = movie.createMovie(title.trim(), s_duration, director.trim(), country.trim(), mainCharacter.trim(), releaseYear, language.trim(), genre.trim());
						
						myResponse.put("result", result);
	
					} catch (Exception e) {
	
						throw new InternalErrorException(e.getMessage());
					}
	
					out.println(myResponse);
					out.flush();
	
				} catch (NumberFormatException ex) {
					throw new BadRequestException("La propiedad release year debe ser un número entero.");
				}
			} catch (NumberFormatException ex) {
				throw new BadRequestException("La propiedad duration debe ser un número entero.");
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
