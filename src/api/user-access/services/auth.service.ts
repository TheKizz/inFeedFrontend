import { IResponse } from "../../common/interfaces/response.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { IAuthResult } from "../interfaces/auth-result.interface";

export class AuthService {
  private static readonly baseUrl = `${import.meta.env.VITE_APP_API_URL}/auth`;

  static async login(
    loginUserDto: LoginUserDto
  ): Promise<IResponse<IAuthResult> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUserDto)
      });
      return (await response.json()) as IResponse<IAuthResult>;
    } catch (error) {
      console.error(error);
    }
  }

  static async register(
    registerUserDto: RegisterUserDto
  ): Promise<IResponse<IAuthResult> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerUserDto)
      });
      return (await response.json()) as IResponse<IAuthResult>;
    } catch (error) {
      console.error(error);
    }
  }

  static async logout(
    userEmail: string
  ): Promise<IResponse<IAuthResult> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/logout/${userEmail}`, {
        method: "POST"
      });
      return (await response.json()) as IResponse<IAuthResult>;
    } catch (error) {
      console.error(error);
    }
  }
}
