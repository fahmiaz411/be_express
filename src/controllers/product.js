const {user, ktp, product} = require('../../models')

exports.products = async (req,res) => {
    try {

        const { idUser } = req
        const products = await product.findAll({            
            include: 
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                },
            
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            idUser,
            status: 'success',
            message: 'successfully get',
            data: {
                products
            }
        })
    } catch (error) {
        console.log(error)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addProduct = async (req,res) => {
    try {

        const {body} = req

        await product.create(body)

        res.send({
            authId: req.idUser,
            status: 'success',
            message: 'successfully add',
            data: {
                user: body
            }
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'            
        })
    }
}
