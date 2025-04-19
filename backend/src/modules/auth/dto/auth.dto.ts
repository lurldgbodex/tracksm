interface TokenType {
    access_token: string;
    refresh_token: string;
}

export class AuthResponse {
    message: string;
    tokens: TokenType;
}