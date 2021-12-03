// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

const { validateProjectId, validateProject } = require("./projects-middleware");

// [GET] /api/projects
router.get("/", async ( req, res ) => {
    try{
        const projects = await Projects.get();
        res.status(400).json(projects);
    }
    catch(err){
        res.status(500).json({
            message: "There was an issue accessing the server with your information"
        })
    }
})

// [GET] /api/projects/:id
router.get("/:id/", async ( req, res, next ) => {
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



// [PUT] /api/projects/:id



// DELETE] /api/projects/:id



// [GET] /api/projects/:id/actions