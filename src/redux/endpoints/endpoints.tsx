const API_BASE_URL = import.meta.env.VITE_KNOWLEDGE_PRESERVATION || 'http://localhost:8080/api';

export const AUTH = {
    USER_LOGIN: `${API_BASE_URL}/auth/login`,
    USER_LOGOUT: `${API_BASE_URL}/auth/logout`,
    CREATE_USER: `${API_BASE_URL}/auth/create-user`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forget-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    GITHUB_CONNECT: `${API_BASE_URL}/github/connect`,
    GITHUB_CALLBACK: `${API_BASE_URL}/github/callback`,
    GITHUB_SYNC: `${API_BASE_URL}/github/sync`,
    GITHUB_HISTORY: `${API_BASE_URL}/github/history`,
    DASHBOARD_SUMMARY: `${API_BASE_URL}/dashboard/summary`,
    GITHUB_STATUS: `${API_BASE_URL}/github/status`,
    GITHUB_DISCONNECT: `${API_BASE_URL}/github/disconnect`,
    GITHUB_REPOSITORIES: `${API_BASE_URL}/github/repositories`,
    GITHUB_REPOSITORY_SYNC: `${API_BASE_URL}/github/repositories/sync`,

};