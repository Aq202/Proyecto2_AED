package AccessLayer;

import java.util.LinkedList;
import java.util.List;

import org.json.simple.JSONArray;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import org.neo4j.driver.TransactionWork;

public class User implements AutoCloseable {

	private final Connection connection;

	public User() throws Exception {
		connection = new Connection();
	}

	/**
	 * Metodo para agregar un nuevo usuario en la base de datos.
	 * @param id
	 * @param userName
	 * @param sex
	 * @param nationality
	 * @param language
	 * @param birthYear
	 * @return
	 * @throws Exception
	 */
	public String createUser(String id, String userName, String sex, String nationality, String language, int birthYear) throws Exception{

		try (Session session = connection.startSession()) {


			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {
					tx.run(String.format(
							"CREATE (u:user {id:'%s', name:'%s'})"
							+ "MERGE (s:sex {val:'%s'})"
							+ "MERGE (n:nationality {val:'%s'})"
							+ "MERGE (l:language {val:'%s'})"
							+ "MERGE (b:birth_year {val:'%s'})"
							+ "CREATE (u)-[:SEX]->(s)"
							+ "CREATE (u)-[:NATIONALITY]->(n)"
							+ "CREATE (u)-[:LANGUAGE]->(l)"
							+ "CREATE (u)-[:BIRTH_YEAR]->(b)",
							id,userName,sex, nationality, language,birthYear));

					return "Usuario registrado exitosamente";
				}
			}

			);

			return result;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}
	
	public String updateUser(String id, String userName, String sex, String nationality, String language, int birthYear) throws Exception{

		try (Session session = connection.startSession()) {


			String result = session.writeTransaction(new TransactionWork<String>()

			{
				@Override
				public String execute(Transaction tx) {
					tx.run(String.format(
							"MATCH (u:user {id:'%s'})"
							+ "SET u.name = '%s'"
							+ "WITH u MATCH (u)-[s_r:SEX]->() DELETE s_r "
							+ "WITH u MATCH (u)-[n_r:NATIONALITY]->() DELETE n_r "
							+ "WITH u MATCH (u)-[b_r:BIRTH_YEAR]->() DELETE b_r "
							+ "WITH u MATCH (u)-[l_r:LANGUAGE]->() DELETE l_r "
							+ "MERGE (s:sex {val:'%s'}) "
							+ "MERGE (n:country {val:'%s'}) "
							+ "MERGE (l:language {val:'%s'}) "
							+ "MERGE (b:birth_year {val:'%s'}) "
							+ "CREATE (u)-[:SEX]->(s) "
							+ "CREATE (u)-[:NATIONALITY]->(n) "
							+ "CREATE (u)-[:LANGUAGE]->(l) "
							+ "CREATE (u)-[:BIRTH_YEAR]->(b) ",
							id,userName,sex.toUpperCase(), nationality.toUpperCase(), language.toUpperCase(),birthYear));

					return "OK";
				}
			}

			);

			return result;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}

	public LinkedList<String> getUsersList() {

		try (Session session = connection.startSession()) {
			LinkedList<String> usersList = session.readTransaction(new TransactionWork<LinkedList<String>>() {
				@Override
				public LinkedList<String> execute(Transaction tx) {
					Result result = tx.run("MATCH (u:User) RETURN u.name as name, u.age as age");
					LinkedList<String> myUsers = new LinkedList<String>();
					List<Record> registros = result.list();
					for (int i = 0; i < registros.size(); i++) {

						var registersData = registros.get(i).values();
						JSONArray userData = new JSONArray();

						userData.add(registersData.get(0).asString());
						userData.add(String.valueOf(registersData.get(1).asInt()));

						myUsers.add(userData.toJSONString());
					}

					return myUsers;
				}
			});

			return usersList;
		}
	}

	@Override
	public void close() throws Exception {
		connection.close();

	}

}
