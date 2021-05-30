import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Adm from 'App/Models/Adm'

export default class AdmsController {
  public async index({ response, auth }: HttpContextContract) {
    //lista os adms (somente adms podem usar isso)
    const id = auth.user?.id

    if (!id) {
      throw new UnAuthorizedException('This user does not exists', 401, 'UNAUTORIZED')
    }

    const userAdm = await Adm.findBy('userId', id)

    const message = 'You are not authorized'
    const status = 401
    const errorCode = 'UNAUTORIZED'

    if (!userAdm) {
      throw new UnAuthorizedException(message, status, errorCode)
    }

    const adms = await Adm.query().preload('user')

    return response.json(adms)
  }

  public async store({ auth, response, request }: HttpContextContract) {
    const id = auth.user?.id
    const { userId } = request.all()

    if (!id || !userId) {
      throw new UnAuthorizedException('This user does not exists', 401, 'UNAUTORIZED')
    }

    const admExists = await Adm.findBy('userId', userId)

    const message = 'This ADM already exists'
    const status = 403
    const errorCode = 'UNAUTORIZED'

    if (admExists) {
      throw new UnAuthorizedException(message, status, errorCode)
    }

    const adm = await Adm.create({
      userId: userId,
    })

    return response.json(adm)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const adm = await Adm.find(id)

    if (!adm) {
      throw new UnAuthorizedException('Adm does not exist', 400, 'NONEXISTENT')
    }

    await adm.load('user')

    return response.json(adm)
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')

    const adm = await Adm.find(id)

    if (!adm) {
      throw new UnAuthorizedException('Adm does not exist', 400, 'NONEXISTENT')
    }

    await adm.delete()

    return
  }
}
