let dataUser = [
    {
        id: 1,
        name: 'Yosep Alexander',
        email: 'yosep@gmail.com'
    },
    {
        id: 2,
        name: 'Ilham Adi',
        email: 'ilham@gmail.com'
    },
    {
        id: 3,
        name: 'Elga',
        email: 'elga@gmail.com'
    }
]

exports.getData = (req, res) => {
    res.send({
        status: 'success',
        data: dataUser
    })
}

exports.getDetail = (req, res) => {

    const { id } = req.params

    const data = dataUser.find((data) => data.id == id)
    
    if(data) {
        res.send({
            status: 'success',
            data
        })
    }else{
        res.send({
            status: 'failed',
            message: `Data with ${id} not found`
        })
    }
    res.send(dataUser)
}

exports.postData = (req, res) => {  
    
    const {body} = req

    dataUser = [...dataUser, body]

    res.send({
        status: 'success',
        data: body
    })
}

exports.update = (req,res) => {

    const {id} = req.params
    const {body} = req
    
    const data = dataUser.find((data) => data.id == id)

    if(!data){
        return res.send({
            status: 'failed',
            message: `Data with id: ${id} not found`
        })
    }

    const updateData = dataUser.map((data) => {
        const {name, email} = body

        if(data.id == id) {
            return ({
                id: id,
                name: name,
                email: email
            })
        } else {
            return data
        }
    })

    dataUser = updateData

    res.send({
        status: 'success',
        message: 'Data user updated',
        data: body
    })
}

exports.deleteData = (req,res) => {
    const {id} = req.params

    const find = dataUser.find((data) => data.id == id)
    const newData = dataUser.filter((data) => data.id != id )

    dataUser = newData

    if(!find) {
        return res.send({
            status: 'failed',
            message: `Data with id: ${id} not found`
        })
    }

    res.send({
        status: 'success',
        message: `Data with id: ${id} deleted`,
        data: newData
    })
}
