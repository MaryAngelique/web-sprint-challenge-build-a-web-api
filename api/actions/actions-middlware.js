// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionId( req, res, next ) {
    try {
        const { id } = req.params;
        const actions = await Actions.get(id);

        if(actions) {
            req.params = actions;
            next();

        } else {
            res.status(404).json( { message: "404 Error: Action ID not found" } )
        }
    } catch (error) {
        next(error);
    }
}



module.exports = {
    validateActionId
};