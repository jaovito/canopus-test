import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Carrossel from 'App/Models/Carrossel'
import Image from 'App/Models/Image'

export default class CarrosselsController {
  public async index({ response }: HttpContextContract) {
    const carrossels = await Carrossel.query().preload('image1').preload('image2').preload('image3')

    return response.json(carrossels)
  }

  public async store({ request, response }: HttpContextContract) {
    const { image1Id, image2Id, image3Id } = request.all()

    const image1 = await Image.find(image1Id)
    const image2 = await Image.find(image2Id)
    const image3 = await Image.find(image3Id)

    if (!image1 || !image2 || !image3) {
      throw new UnAuthorizedException('Image does not exists', 400, 'Error')
    }

    const image = await Carrossel.create({
      image1Id,
      image2Id,
      image3Id,
    })

    return response.json(image)
  }

  public async show({ params, response }: HttpContextContract) {
    const id = params.id

    const carrossel = await Carrossel.find(id)

    if (!carrossel) {
      throw new UnAuthorizedException('Carrossel does not exists', 400, 'NOT EXISTS')
    }

    await carrossel.load('image1')
    await carrossel.load('image2')
    await carrossel.load('image3')

    return response.json(carrossel)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = params.id
    const { image1, image2, image3 } = request.only(['image1', 'image2', 'image3'])

    const carrossel = await Carrossel.find(id)

    if (!carrossel) {
      throw new UnAuthorizedException('Carrossel does not exists', 400, 'NOT EXISTS')
    }

    carrossel.image1Id = image1
    carrossel.image2Id = image2
    carrossel.image3Id = image3

    await carrossel.save()

    return response.json(carrossel)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id

    const carrossel = await Carrossel.find(id)

    if (!carrossel) {
      throw new UnAuthorizedException('Carrossel does not exists', 400, 'NOT EXISTS')
    }

    await carrossel.delete()

    return response.status(200)
  }
}
