package com.example.quizonline.controller;

import com.example.quizonline.exception.UserAlreadyExistsException;
import com.example.quizonline.model.User;
import com.example.quizonline.request.LoginRequest;
import com.example.quizonline.response.JwtResponse;
import com.example.quizonline.security.jwt.JwtUtils;
import com.example.quizonline.security.user.QuizUserDetails;
import com.example.quizonline.service.IUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private IUserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ---------- register-user ----------
    @Test
    void testRegisterUser_Success() {
        User user = new User();
        doNothing().when(userService).registerUser(user);

        ResponseEntity<?> response = authController.registerUser(user);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Registration successful!", response.getBody());
        verify(userService, times(1)).registerUser(user);
    }

    @Test
    void testRegisterUser_UserAlreadyExists() {
        User user = new User();
        doThrow(new UserAlreadyExistsException("User already exists"))
                .when(userService).registerUser(user);

        ResponseEntity<?> response = authController.registerUser(user);

        assertEquals(409, response.getStatusCodeValue());
        assertEquals("User already exists", response.getBody());
        verify(userService, times(1)).registerUser(user);
    }

    // ---------- login ----------
    @Test
    void testLogin_Success() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        QuizUserDetails userDetails = new QuizUserDetails(
                1L,
                "test@example.com",
                "password",
                Collections.singletonList(() -> "ROLE_USER")
        );

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtils.generateJwtTokenForUser(authentication)).thenReturn("mockJwt");

        ResponseEntity<?> response = authController.authenticateUser(loginRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof JwtResponse);

        JwtResponse jwtResponse = (JwtResponse) response.getBody();
        assertEquals(1L, jwtResponse.getId());
        assertEquals("test@example.com", jwtResponse.getEmail());
        assertEquals("mockJwt", jwtResponse.getToken());
        assertEquals(List.of("ROLE_USER"), jwtResponse.getRoles());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtils, times(1)).generateJwtTokenForUser(authentication);
    }
}
