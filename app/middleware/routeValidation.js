const responseFormat=require('../Libs/responseLib')
let routeNotFound = (req, res, next) => { 
    let apiResponse=   responseFormat.generate(true, "Route not found, Please check your internet connection", 500, null)
    
     res.send(apiResponse)
    res.status(404).send(apiResponse);
}
module.exports = {
    routeNotFound: routeNotFound
}