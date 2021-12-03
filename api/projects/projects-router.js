// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

const { validateProjectId, validateProject } = require("./projects-middleware");

// [GET] /api/projects
router.get("/", async ( req, res ) => {
    try{
        const projects = await Projects.get();
        res.status(200).json(projects);
    }
    catch(error){
        res.status(500).json( { message: "The project's information can not be retrieved" } )
        console.log(error);
    }
})

// [GET] /api/projects/:id
router.get("/:id/", validateProjectId, async ( req, res, next ) => {
    const { id } = req.params
    try {
        const project = await Projects.get(Number(id))
        if(!project) {
            res.status(404).json({
                message: "Project Not Found"
            })
        } else {
            res.status(200).json(project)
        }
    } catch (error) {
        next(error)
    }
})

// [POST] /api/projects
router.post("/", ( req, res ) => {
    const newProject = req.body;
    Projects.insert(newProject)
        .then(() => {
            res.status(201).json(newProject);

        }).catch(error => {
            res.status(400).json( { 
                message: "Error adding project",
                error: error.message
             } )
        })
})


// [PUT] /api/projects/:id



// DELETE] /api/projects/:id



// [GET] /api/projects/:id/actions

module.exports = router;