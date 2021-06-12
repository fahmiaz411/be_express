const {user, ktp, product, order} = require('../../models')
const { update } = require('./todo')



exports.users = async (req,res) => {
    try {
        const users = await user.findAll({            
            include: [
                {
                    model: ktp,
                    as: 'ktp',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: product,
                    as: 'product'
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'Users successfully get',
            data: {
                users
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

exports.user = async (req,res) => {
    try {
        const {id} = req.params
        const userData = await user.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: {
                id
            }
        })

        if(!userData){
            return res.send({
                status: 'failed',
                message: `Data with id: ${id} not found!`
            })
        }

        res.send({
            status: 'success',
            message: 'Users successfully get',
            data: {
                userData
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

exports.userDelete = async (req,res) => {
    try {

        const {id} = req.params
        const checkId = await user.findOne({
            where: {
                id
            }
        })

        if(!checkId){
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Successfully delete user with id: ${id}`
        })


    } catch (error) {
        console.log(error)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const {body} = req
        const checkId = await user.findOne({
            where: {
                id
            }
        })

        if(!checkId){
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        await user.update(body, {
            where: {
                id
            }
        })

        const userUpdated = await user.findOne({
            attributes:{
                exclude: ['createdAt', 'password']
            },
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'Data updated',
            data: {
                user: userUpdated
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

exports.addUser = async (req,res) => {
    try {

        const {body} = req

        await user.create(body)

        res.send({
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

exports.transacts = async (req, res) => {

   try {

    const transact = await user.findAll({
        include: [
            {
                model: order,
                as: 'membeli',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idPenjual', 'idPembeli', 'idProduct' ]
                },
                include: {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser']
                    }
                }
            },
            {
                model: order,
                as: 'menjual',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idPenjual', 'idPembeli', 'idProduct' ]
                },
                include: {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser']
                    }
                }
            },
        ],

        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
        }
    })

    res.send({
        status: 'success',
        message: 'Users successfully get',
        data: {
            transact
        }
    })
       
   } catch (err) {
    console.log(err)
    res.status({  
        status: 'failed',
        message: 'Server Error'
    })
   }

}
exports.transact = async (req, res) => {

   try {

        const { id } = req.params
        const transact = await user.findOne({

            where: {
                id
            },

            include: [
                {
                    model: order,
                    as: 'membeli',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idPenjual', 'idPembeli', 'idProduct' ]
                    },
                    include: {
                        model: product,
                        as: 'product',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'idUser']
                        }
                    }
                },
                {
                    model: order,
                    as: 'menjual',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idPenjual', 'idPembeli', 'idProduct' ]
                    },
                    include: {
                        model: product,
                        as: 'product',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'idUser']
                        }
                    }
                },
            ],

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        if(!transact) {
            return res.send({
                status: 'failed',
                message: `Transactions by id: ${id} not found!`
            })
        }

        res.send({
            status: 'success',
            message: 'Users successfully get',
            data: {
                transact
            }
        })
       
   } catch (err) {

        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
        
   }

}

