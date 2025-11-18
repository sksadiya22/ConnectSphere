import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case 'USER_LOADED':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Set auth token in axios headers
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    // Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            try {
                const res = await axios.get(`${API_BASE_URL}/api/auth/profile`);
                dispatch({
                    type: 'USER_LOADED',
                    payload: res.data.user
                });
            } catch (error) {
                dispatch({ type: 'AUTH_ERROR' });
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // Register user
    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });
            setAuthToken(res.data.token);
            return { success: true, data: res.data };
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR' });
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Login user
    const login = async (userData) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, userData);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
            setAuthToken(res.data.token);
            return { success: true, data: res.data };
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR' });
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Logout
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setAuthToken(null);
    };

    useEffect(() => {
        loadUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
                loadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};