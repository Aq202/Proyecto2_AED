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
	public String createMovie(String title, String duration, String director, String country, String mainCharacter, int releaseYear, String language, String genre, String imgUrl) throws Exception{

		try (Session session = connection.startSession()) {
			
			

			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {
					
					
					tx.run(String.format(
							"CREATE (m:movie {title:'%s', image:'%s'})"
							+ "MERGE (dn:duration {val:'%s'})"
							+ "MERGE (d:director {val:'%s'})"
							+ "MERGE (c:country {val:'%s'})"
							+ "MERGE (mc:mainCharacter {val:'%s'})"
							+ "MERGE (y:releaseYear {val:'%d'})"
							+ "MERGE (l:language {val:'%s'})"
							+ "MERGE (g:genre {val:'%s'})"
							+ "CREATE (m)-[:DURATION]->(dn)"
							+ "CREATE (m)-[:DIRECTOR]->(d)"
							+ "CREATE (m)-[:COUNTRY]->(c)"
							+ "CREATE (m)-[:MAIN_CHARACTER]->(mc)"
							+ "CREATE (m)-[:RELEASE_YEAR]->(y)"
							+ "CREATE (m)-[:LANGUAGE]->(l)"
							+ "CREATE (m)-[:GENRE]->(g)",
							title,imgUrl,duration,director,country.toUpperCase(),mainCharacter,releaseYear,language.toUpperCase(),genre.toUpperCase()));

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
	 * Método que permite obtener los nombres de directores que al menos contengan la cadena ingresada.
	 * @param name. Nombre completo o fragmento del director.
	 * @return
	 */
	public JSONArray searchDirectorsByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {
				
				@Override
				public JSONArray execute(Transaction tx) {
					
					Result result = tx.run(String.format("MATCH (d:director) WHERE d.val CONTAINS '%s' RETURN d.val AS director LIMIT %s", name,max));

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
	 * Método que permite obtener los nombres de los personajes principales que al menos contengan la cadena ingresada.
	 * @param name. Nombre completo o fragmento
	 * @return
	 */
	public JSONArray searchMainCharacterByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {
				
				@Override
				public JSONArray execute(Transaction tx) {
					
					Result result = tx.run(String.format("MATCH (d:mainCharacter) WHERE d.val CONTAINS '%s' RETURN d.val LIMIT %s", name,max));

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
	 * Método que permite obtener los nombres de generos de películas que al menos contengan la cadena ingresada.
	 * @param name. Nombre completo o fragmento
	 * @return
	 */
	public JSONArray searchGenreByName(String name, int max) {

		try (Session session = connection.startSession()) {
			return session.readTransaction(new TransactionWork<JSONArray>() {
				
				@Override
				public JSONArray execute(Transaction tx) {
					
					Result result = tx.run(String.format("MATCH (d:genre) WHERE d.val CONTAINS '%s' RETURN d.val LIMIT %s", name.toUpperCase(),max));

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
	
	@Override
	public void close() throws Exception {
		connection.close();

	}
}
