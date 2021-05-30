import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Adm from'App/Models/Adm'

export default class AdmMiddleware {
  public async handle ({ auth, request }: HttpContextContract, next: () => Promise<void>) {
    const id = auth.user?.id
    const user = auth.user

    if (!id) {
      throw new UnAuthorizedException("You aren't the admin", 401, 'UNAUTHORIZED')
    }

    const admUser = await Adm.findBy('userId', id)

    if (user?.email !==  Env.get('ADM_USER') && !admUser) {
      throw new UnAuthorizedException("You aren't the admin", 401, 'UNAUTHORIZED')
    }

    if (admUser) {
      request.admin = true
    }

    await next()
  }
}
