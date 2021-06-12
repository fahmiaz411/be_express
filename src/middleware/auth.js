const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    
    try {
        
        let header = req.header('Authorization')
        
        if(!header){
            return res.send({
                status: 'failed'
            })
        }

        let token = header.replace('Bearer ', '')

        const secretKey = process.env.SECRET_KEY

        jwt.verify(token, secretKey, (err, decoded) => {

            if(err){
                return res.send({
                    status: 'failed',
                    message: 'User not verivied'
                })
            } 

            req.idUser = decoded.id
            
        })
        
        next()

    } catch (err) {

        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
        
    }
}