import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import User from 'App/Models/User'

export default class AuthController {
  public async authenticate({ auth, response, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.findBy('email', email)

    const token = await auth.use('api').attempt(email, password)

    if (!user || !token) {
      throw new UnAuthorizedException('Error in login, verify your credentials', 400, 'Error')
    }

    await user.load('adm')

    return response.json({ token, user, admin: !!user.adm })
  }
}
