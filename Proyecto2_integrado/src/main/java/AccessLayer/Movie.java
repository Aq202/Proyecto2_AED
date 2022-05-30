package AccessLayer;

import java.util.LinkedList;
import java.util.List;

import org.json.simple.JSONArray;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
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
	public String createMovie(String title, String duration, String director, String country, String mainCharacter, int releaseYear, String language, String genre) throws Exception{

		try (Session session = connection.startSession()) {


			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {
					tx.run(String.format(
							"CREATE (m:movie {title:'%s'})"
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
							title,duration,director,country,mainCharacter,releaseYear,language,genre));

					return "OK";
				}
			}

			);

			return result;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}
	
	@Override
	public void close() throws Exception {
		connection.close();

	}
}
