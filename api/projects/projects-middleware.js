// add middlewares here related to projects
const Projects = require("../projects/projects-model");

async function validateProjectId( req, res, next ) {
    try {
        const { id } = req.params;
        const projects = await Projects.get(id);

        if(projects) {
            req.params = projects;
            next();

        } else {
            res.status(404).json( { message: "404 Error: Project not found" } )
        }
    } catch (error) {
        next(error);
    }
}

async function validateProject(req, res,next){
    const {name, description, completed} = req.body
    if(!name || !name.trim()){
        res.status(400).json({message: 'Name field required'})
    } else if(!description || !description.trim()){
        res.status(400).json({message: 'missing required description field'})
    } else{
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject
};