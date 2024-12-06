package com.example.xarala_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public ResourceNotFound() {
        super();
    }
    public ResourceNotFound(String message) {super(message);}
    public ResourceNotFound(String message, Throwable cause){super(message, cause);}
}
