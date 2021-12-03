// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

// const { validateActionId, validateAction } = require("./actions-middleware");

// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try{
        const actions = await Actions.get()
        res.status(200).json(actions)

    } catch (error) {
        next( { 
            status: 400, 
            message: "Error retrieving actions"
        } )
    }
})

// // [GET] /api/actions/:id
// router.get("/:id", validateActionId, async (req, res, next) => {

// })

// // [POST] /api/actions
// router.post("/", async (req, res ,next) => {

// })


// // [PUT] /api/actions/:id
// router.put("/:id", validateActionId, validateAction, async (req, res,) => {

// })


// // [DELETE] /api/actions/:id
// router.delete("/:id", validateActionId, async (req, res, next) => {

// })

module.exports = router;