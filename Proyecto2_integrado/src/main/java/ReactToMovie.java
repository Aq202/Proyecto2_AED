import java.io.IOException;
import java.io.PrintWriter;

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
@WebServlet("/reactToMovie")
public class ReactToMovie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ReactToMovie() {
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

			String userId = request.getParameter("user");
			String movieId = request.getParameter("movie");
			String option_param = request.getParameter("option");

			if (userId == null)
				throw new BadRequestException("La propiedad 'user' es requerida.");
			if (movieId == null)
				throw new BadRequestException("La propiedad 'movie' es requerida.");
			if (option_param == null)
				throw new BadRequestException("La propiedad 'like' es requerida.");
			try {
				int option = Integer.parseInt(option_param);

				if (option != 0 && option != 1 && option != 2 && option != 3)
					throw new BadRequestException(
							"La propiedad 'like' solo admite los valores 0(estado default), 1(like) y 2(dislike).");

				try (User user = new User()) {
					String result;
					if (option == 0)
						result = user.clearMovieReaction(userId, movieId);
					else
						result = user.reactToMovie(userId, movieId, option);
					
					//like: encontrar películas similares
					if(option == 1) {
						try(Movie movie = new Movie()){
							movie.findSimilarMovies(userId, movieId);
						}catch(Exception e) {
							throw new InternalErrorException(e.getMessage());
						}
					}

					myResponse.put("result", result);
					myResponse.put("userId", userId); // enviar userId

				} catch (Exception e) {

					throw new InternalErrorException(e.getMessage());
				}
			} catch (ClassCastException e) {
				throw new BadRequestException("La propiedad like debe ser 'true' o 'false'.");
			}

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
