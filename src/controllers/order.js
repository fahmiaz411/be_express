const {user, product, order} = require('../../models')

exports.orders = async (req,res) => {
    try {
        const orders = await order.findAll({            
            include:[
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: 'penjual',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                },
                {
                    model: user,
                    as: 'pembeli',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            ],            
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idPenjual', 'idPembeli', 'idProduct']
            }
        })

        res.send({
            status: 'success',
            message: 'successfully get',
            data: {
                orders
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
