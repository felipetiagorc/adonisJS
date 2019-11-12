'use strict'

// Helpers do Adonis da acesso ao caminho da pasta de uploads chamada tmp.
const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const Property = use('App/Models/Property')

class ImageController {

    // mostrar a imagem pela rota
    async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
        }

        //salvar 
    async store ({ params, request }) {
        const property = await Property.findOrFail(params.id)

// request.file trás um ou mais arquivos com o nome do primeiro parâmetro
        const images = request.file('image', {
            types:['image'],
            size: '8mb'
        })

        // salva as imagens na pasta temporaria com o nome com o timestamp
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
          }))
          
          if (!images.movedAll()) {
            return images.errors()
          }

            /* Aqui percorre todas imagens salvas e cadastra no imovel
             Só é possivel pois dentro do model imoveis tem o metodo images()
             que é o RELACIONAMento de imovel com imagens. */

             /*  await Promise.all pois no (map) tem iteração assincrona, ou seja, a cada create
              q damos temos uma promessa */
        await Promise.all(
            images.movedList().map(image=> property.images().create({ path: image.fileName}))
        )

    }
}

module.exports = ImageController