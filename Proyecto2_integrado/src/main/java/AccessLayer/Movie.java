package AccessLayer;

import java.util.LinkedList;
import java.util.List;
import org.neo4j.driver.Session;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;

import org.neo4j.driver.Transaction;
import org.neo4j.driver.TransactionWork;

public class Movie implements AutoCloseable {

	private final Connection connection;

	public Movie() throws Exception {
		connection = new Connection();
	}

	/**
	 * Metodo para agregar una nueva pelicula en la base de datos.
	 * 
	 * @param title
	 * @param duration
	 * @param director
	 * @param country
	 * @param mainCharacter
	 * @param releaseYear
	 * @param language
	 * @param genre
	 * @return
	 * @throws Exception
	 */
	public String createMovie(String id, String title, String duration, String director, String country,
			String mainCharacter, int releaseYear, String language, String genre, String imgUrl) throws Exception {

		try (Session session = connection.startSession()) {

			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {

					tx.run(String.format(
							"CREATE (m:movie {id:'%s', title:'%s', image:'%s'})" + "MERGE (dn:duration {val:'%s'})"
									+ "MERGE (d:director {val:'%s'})" + "MERGE (c:country {val:'%s'})"
									+ "MERGE (mc:mainCharacter {val:'%s'})" + "MERGE (y:releaseYear {val:'%d'})"
									+ "MERGE (l:language {val:'%s'})" + "MERGE (g:genre {val:'%s'})"
									+ "CREATE (m)-[:DURATION]->(dn)" + "CREATE (m)-[:DIRECTOR]->(d)"
									+ "CREATE (m)-[:COUNTRY]->(c)" + "CREATE (m)-[:MAIN_CHARACTER]->(mc)"
									+ "CREATE (m)-[:RELEASE_YEAR]->(y)" + "CREATE (m)-[:LANGUAGE]->(l)"
									+ "CREATE (m)-[:GENRE]->(g)",
							id, title, imgUrl, duration, director, country.toUpperCase(), mainCharacter, releaseYear,
							language.toUpperCase(), genre.toUpperCase()));

					return "Película registrada exitosamente";
				}
			}

			);

			return result;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}

	/**
	 * Método que permite obtener los nombres de directores que al menos contengan
	 * la cadena ingresada.
	 * 
	 * @param name. Nombre completo o fragmento del director.
	 * @return
	 */
	public JSONArray searchDirectorsByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {

				@Override
				public JSONArray execute(Transaction tx) {

					Result result = tx.run(String.format(
							"MATCH (d:director) WHERE d.val CONTAINS '%s' RETURN d.val AS director LIMIT %s", name,
							max));

					List<Record> registers = result.list();
					JSONArray directorsList = new JSONArray();

					for (int i = 0; i < registers.size(); i++) {

						var registersData = registers.get(i).values();
						String directorName = registersData.get(0).asString();

						directorsList.add(directorName);
					}
					return directorsList;
				}
			});

		}
	}

	/**
	 * Método que permite obtener los nombres de los personajes principales que al
	 * menos contengan la cadena ingresada.
	 * 
	 * @param name. Nombre completo o fragmento
	 * @return
	 */
	public JSONArray searchMainCharacterByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {

				@Override
				public JSONArray execute(Transaction tx) {

					Result result = tx.run(String.format(
							"MATCH (d:mainCharacter) WHERE d.val CONTAINS '%s' RETURN d.val LIMIT %s", name, max));

					List<Record> registers = result.list();
					JSONArray resultList = new JSONArray();

					for (int i = 0; i < registers.size(); i++) {

						var registersData = registers.get(i).values();
						String name = registersData.get(0).asString();

						resultList.add(name);
					}
					return resultList;
				}
			});

		}
	}

	/**
	 * Método que permite obtener los nombres de generos de películas que al menos
	 * contengan la cadena ingresada.
	 * 
	 * @param name. Nombre completo o fragmento
	 * @return
	 */
	public JSONArray searchGenreByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {

				@Override
				public JSONArray execute(Transaction tx) {

					Result result = tx
							.run(String.format("MATCH (d:genre) WHERE d.val CONTAINS '%s' RETURN d.val LIMIT %s",
									name.toUpperCase(), max));

					List<Record> registers = result.list();
					JSONArray resultList = new JSONArray();

					for (int i = 0; i < registers.size(); i++) {

						var registersData = registers.get(i).values();
						String name = registersData.get(0).asString();

						resultList.add(name);
					}
					return resultList;
				}
			});

		}
	}

	/**
	 * Permite obtener la lista de películas a la que el usuario no ha calificado.
	 * 
	 * @param max
	 * @return
	 */
	public JSONArray getMoviesList(String userId, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {

				@Override
				public JSONArray execute(Transaction tx) {

					Result result = tx.run(String.format("MATCH (u:user) WHERE u.id = '%s'"
							+ "MATCH (m:movie) WHERE NOT (u)-[:like]->(m) AND NOT (u)-[:dislike]->(m)"
							+ "RETURN m.id as id, m.title as title, m.image as image LIMIT %s", userId, max));

					List<Record> registers = result.list();
					JSONArray resultList = new JSONArray();

					for (int i = 0; i < registers.size(); i++) {

						JSONObject movieData = new JSONObject();

						var registerData = registers.get(i).values();

						// anadir info de la pelicula a un objeto JSON
						movieData.put("id", registerData.get(0).asString());
						movieData.put("title", registerData.get(1).asString());
						movieData.put("image", registerData.get(2).asString());

						resultList.add(movieData);
					}
					return resultList;
				}
			});

		}
	}

	public String findSimilarMovies(String userId, String likedMovie) throws Exception {

		try (Session session = connection.startSession()) {

			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {

					tx.run(String.format(
							"CALL {\r\n" + "MATCH (liked_movie:movie) WHERE liked_movie.id = '%s' \r\n"
									+ "MATCH (m:movie)\r\n" + "MATCH p = SHORTESTPATH((liked_movie)-[*..2]-(m)) \r\n"
									+ "MATCH (liked_movie)--(com_nodes)--(m) \r\n"
									+ "WHERE NOT com_nodes:movie AND NOT (liked_movie) = (m) \r\n"
									+ "RETURN m AS movie, COUNT(com_nodes) AS common_nodes\r\n" + "} \r\n"
									+ "CALL { \r\n" + "MATCH (liked_movie:movie) WHERE liked_movie.id = '%s' \r\n"
									+ "MATCH (liked_movie)--(nodes) WHERE NOT nodes:movie AND NOT nodes:user \r\n"
									+ "RETURN COUNT(nodes) AS total_nodes \r\n" + "} \r\n"
									+ "WITH  movie AS movie,  (1 - toFloat(common_nodes)/total_nodes) AS sim_score \r\n"
									+ "MATCH (liked_movie:movie) WHERE liked_movie.id = '%s' \r\n"
									+ "MERGE (liked_movie)-[:SCORE {score:sim_score}]->(movie) ",
							likedMovie, likedMovie, likedMovie));

					return "Peliculas similares establecidas.";
				}
			}

			);

			return result;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}

	private void runMoviesGraph(Session session) {
		session.readTransaction(new TransactionWork<String>() {

			@Override
			public String execute(Transaction tx) {

				tx.run("CALL gds.graph.drop('moviesGraph', false) ");

				return null;
			}
		});

		session.readTransaction(new TransactionWork<String>() {

			@Override
			public String execute(Transaction tx) {

				tx.run("CALL gds.graph.create( 'moviesGraph','movie','SCORE', {relationshipProperties: 'score' } )");

				return null;
			}
		});

	}

	public JSONObject getRecommendation(String userId) {

		try (Session session = connection.startSession()) {

			runMoviesGraph(session);

			return session.readTransaction(new TransactionWork<JSONObject>() {

				@Override
				public JSONObject execute(Transaction tx) {

					Result result = tx.run(String.format("MATCH (u:user) WHERE u.id = '%s' \r\n"
							+ "MATCH (source:movie) WHERE (u)-[:LIKE]->(source) \r\n"
							+ "MATCH (target:movie) WHERE NOT (u)-[:LIKE]->(target) AND NOT (u)-[:DISLIKE]->(target)\r\n"
							+ "  \r\n" + "CALL gds.shortestPath.yens.stream('moviesGraph', {\r\n"
							+ "    sourceNode: source,\r\n" + "    targetNode: target,\r\n" + "    k: 25,\r\n"
							+ "    relationshipWeightProperty: 'score'\r\n" + "})\r\n"
							+ "YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path\r\n"
							+ "WHERE totalCost > 0\r\n" + "RETURN\r\n" + "    DISTINCT index,\r\n"
							+ "    gds.util.asNode(targetNode).id AS id,\r\n"
							+ "    gds.util.asNode(targetNode).title AS title,\r\n"
							+ "    gds.util.asNode(targetNode).image AS image,\r\n" + "    totalCost\r\n"
							+ "ORDER BY totalCost\r\n" + "LIMIT 1", userId));

					List<Record> registers = result.list();
					JSONObject movieData = new JSONObject();

					for (int i = 0; i < registers.size(); i++) {

						

						var registerData = registers.get(i).values();

						// anadir info de la pelicula a un objeto JSON
						movieData.put("id", registerData.get(1).asString());
						movieData.put("title", registerData.get(2).asString());
						movieData.put("image", registerData.get(3).asString());
						movieData.put("totalCost", registerData.get(4).asDouble());

						
					}
					return movieData;
				}
			});

		}
	}

	@Override
	public void close() throws Exception {
		connection.close();

	}
}
