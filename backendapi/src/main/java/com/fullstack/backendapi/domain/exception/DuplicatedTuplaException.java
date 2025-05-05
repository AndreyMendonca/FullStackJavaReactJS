package com.fullstack.backendapi.domain.exception;

public class DuplicatedTuplaException extends RuntimeException{
    public DuplicatedTuplaException(String message) {
        super(message);
    }
}
