import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Adm from 'App/Models/Adm'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response, request }: HttpContextContract) {
    const user = await User.all()

    return response.json({ user, admin: request.admin })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    const usersExists = await User.findBy('email', email)

    const message = 'You are not authorized'
    const status = 403
    const errorCode = 'E_UNAUTHORIZED'

    if (usersExists) {
      throw new UnAuthorizedException(message, status, errorCode)
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    return response.json(user)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.find(id)

    if (!user) {
      throw new UnAuthorizedException('User does not exists')
    }
    await user.load('adm')

    const admin = user.adm ? true : false

    return response.json({ user, admin })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const id = request.param('id')
    const userId = auth.user?.id
    const { name, password } = request.only(['name', 'email', 'password'])

    const admin = await Adm.findBy('userId', userId)
    const user = await User.find(id)

    if (!user) {
      throw new UnAuthorizedException('User does not exists')
    }

    if (userId !== user?.id && !admin) {
      throw new UnAuthorizedException('This user are not you', 401, 'UNAUTHORIZED')
    }

    user.name = name
    user.password = password

    await user.save()

    return response.json(user)
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const id = request.param('id')
    const userId = auth.user?.id

    const admin = await Adm.findBy('userId', userId)
    const user = await User.find(id)

    if (!user) {
      throw new UnAuthorizedException('User does not exists')
    }

    if (userId !== user?.id && !admin) {
      throw new UnAuthorizedException('This user are not you', 401, 'UNAUTHORIZED')
    }

    await user.delete()
  }
}
