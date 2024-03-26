import jsonwebtoken from "jsonwebtoken"

export const generateToken = (claim : any, expireDate : string) =>{
    return sign({claim} , `${process.env.SECRET_KEY}` , expireDate)
}

export const verifyToken = (token : string) => {
    return jsonwebtoken.verify(token , `${process.env.SECRET_KEY}`)
}


function sign(claim : any , key : string, expiresIn : string){
    return jsonwebtoken.sign(claim, key , {expiresIn : expiresIn, issuer : "https://localhost:3000", audience : "https://localhost:3000"})
}


