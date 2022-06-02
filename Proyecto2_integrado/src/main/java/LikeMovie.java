import java.io.IOException;
import java.io.PrintWriter;

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
public class LikeMovie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LikeMovie() {
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
			String like_param = request.getParameter("like");

			if (userId == null)
				throw new BadRequestException("La propiedad 'user' es requerida.");
			if (movieId == null)
				throw new BadRequestException("La propiedad 'movie' es requerida.");
			if(like_param == null)
				throw new BadRequestException("La propiedad 'like' es requerida.");
			try {
				boolean like = Boolean.getBoolean(like_param);
				
				try (User user = new User()) {
					String result = user.likeMovie(userId, movieId, like);
					
					myResponse.put("result", result);
					myResponse.put("userId", userId); //enviar userId

				} catch (Exception e) {

					throw new InternalErrorException(e.getMessage());
				}
			}catch(ClassCastException e) {
				throw new BadRequestException("La propiedad like debe ser 'true' o 'false'.");
			}

				out.println(myResponse);
				out.flush();

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
