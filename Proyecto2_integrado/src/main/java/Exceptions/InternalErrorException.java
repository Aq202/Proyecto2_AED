package Exceptions;

public class InternalErrorException extends Exception{
	public InternalErrorException(String message) {
		super(message);
	}
	
	public InternalErrorException() {
		super("Error interno del servidor.");
	}
}
