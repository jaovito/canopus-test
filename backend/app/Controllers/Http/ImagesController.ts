import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Image from 'App/Models/Image'
import fs from 'fs'

export default class ImagesController {
  public async index({ response }: HttpContextContract) {
    const images = await Image.all()

    return response.json(images)
  }

  public async store({ request, response }: HttpContextContract) {
    // pega a imagem anexada
    const images = request.files('image', {
      extnames: ['image', 'png', 'jpg', 'jpeg', 'gif'],
    })
    const { name, description } = request.only(['name', 'description'])

    // validação forçada dos dados (poucos dados)
    if (!images || !name || !description) {
      throw new UnAuthorizedException('Any data is missing', 400, 'MISSING')
    }

    let allImages = [] as Image[]

    // pega cada imagem anexada e coloca seu nome na coluna do db
    for (let image of images) {
      await image.move(Application.tmpPath('uploads'), {
        name: `${Date.now()}-image.${image.extname}`,
        overwrite: true,
      })

      const singleImage = await Image.create({
        path: image.fileName,
        name,
        description,
      })

      allImages.push(singleImage)

      if (!image.isValid) {
        return image.errors
      }
    }

    return response.json(allImages)
  }

  public async show({ params, response }: HttpContextContract) {
    //lista a imagem se aperta o path na rota
    return response.download(Application.tmpPath('uploads', params.filename))
  }

  public async update({ request, response, params }: HttpContextContract) {
    const id = params.id
    const { name, description } = request.only(['name', 'description'])

    const image = await Image.find(id)

    if (!image) {
      throw new UnAuthorizedException('Image does not exists', 400, 'NOT EXISTS')
    }

    // se não estiver informando o nome e descrição disparará o erro
    if (!name || !description) {
      throw new UnAuthorizedException('Data is missing', 400, 'MISSING')
    }

    image.name = name
    image.description = description

    const coverImage = request.file('image', {
      extnames: ['image', 'png', 'jpg', 'jpeg', 'gif'],
    })

    if (coverImage) {
      // aqui caso o usuário envie uma imagem, a antiga será substituida pela nova
      await coverImage.move(Application.tmpPath('uploads'), {
        name: image.path,
        overwrite: true,
      })
    }

    await image.save()
    return response.json(image)
  }

  public async destroy({ params }: HttpContextContract) {
    const id = params.id

    const image = await Image.find(id)

    if (!image) {
      throw new UnAuthorizedException('Image does not exists', 400, 'NOT EXISTS')
    }

    // deleta o arquivo da imagem
    fs.unlink(Application.tmpPath('uploads', image.path), () => {})

    await image.delete()
  }
}
