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

async function validateAction (req, res, next){
    const {project_id, description, notes, completed} = req.body

    if(req.body.project_id === undefined){
        next({status: 400, message: 'missing required project id'})
    }
    
    if(!notes || !notes.trim){
        next({status: 400, message: 'missing required project notes'})

    } else{
        req.project_id = project_id;
        req.description = description.trim();
        req.notes = notes.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction
};