package AccessLayer;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Session;

public class Connection {

	private final Driver driver;
	private final String user = "neo4j", password = "equipodinamita", uri = "bolt://localhost:7687";
	private final String localUser = "neo4j", localPassword = "12345";

	public Connection() throws Exception {
		driver = GraphDatabase.driver(uri, AuthTokens.basic(user, password));
		//driver = GraphDatabase.driver(uri, AuthTokens.basic(localUser, localPassword));
	}
	
	public Session startSession() {
		return driver.session();
	}
	
	public void close() throws Exception {
		driver.close();
	}

}
