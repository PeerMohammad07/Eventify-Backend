import { Request, Response } from "express"
import { HttpStatusEnum } from "../../enums/statusCodeEnum"
import IUserUseCase from "../../interfaces/IUserUseCase"

export default class UserController {

  private userUseCase: IUserUseCase

  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  async register(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const { name, email, password } = req.body
      const response = await this.userUseCase.register({ name, email, password })
      if (!response.status) {
        res.status(HttpStatusEnum.CONFLICT).json(response)
        return
      }
      res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
      res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async login(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const { email, password } = req.body
      const response = await this.userUseCase.login(email, password)
      if (!response?.status) {
        if (response.message.email) {
          res.status(404).json(response);
          return
        } else if (response.message.password) {
          res.status(HttpStatusEnum.NOT_FOUND).json(response);
          return
        }
      }
      res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
      res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
      res.status(200).json({ status: true, message: response.message, data: response.data.user })
    } catch (error) {
      console.log(error)
    }
  }

  async logout(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      res.cookie("userToken", "", { maxAge: 0 });
      res.cookie("userRefreshToken", "", { maxAge: 0 });
      res.status(HttpStatusEnum.OK).json({ status: true, message: "User logout successfully" })
    } catch (error) {
      console.log(error)
    }
  }

}