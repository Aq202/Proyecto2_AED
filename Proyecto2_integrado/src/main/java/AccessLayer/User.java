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
	
	public String createUser(String name, int age) {
		
		try ( Session session = connection.startSession())
        {
   		 
   		 String result = session.writeTransaction( new TransactionWork<String>()
   		 
            {
                @Override
                public String execute( Transaction tx )
                {
                    tx.run( "CREATE ("+name+":User {name:'" + name + "', age:"+ age +"})");
                    
                    return "OK";
                }
            }
   		 
   		 );
            
            return result;
        } catch (Exception e) {
        	return e.getMessage();
        }
			
	}
	
	public LinkedList<String> getUsersList(){
		
		try(Session session = connection.startSession()){
			 LinkedList<String> usersList = session.readTransaction( new TransactionWork<LinkedList<String>>()
             {
                 @Override
                 public LinkedList<String> execute( Transaction tx )
                 {
                     Result result = tx.run( "MATCH (u:User) RETURN u.name as name, u.age as age");
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
             } );
             
             return usersList;
         }
		}


	@Override
	public void close() throws Exception {
		connection.close();
		
	}

}
