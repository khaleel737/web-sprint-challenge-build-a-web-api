// Write your "projects" router here!
const express = require(`express`);
const Actions = require(`./actions-model`);
const  { validateActionId, validateActionInsert } = require(`./actions-middleware`)
const router = express.Router();

router.get('/',  validateActionId, (req, res) => {
// const allActions =  Actions.get(req.params.id)
// res.status(200).json(allActions)
res.json(req.actions)
}) 

router.get('/:id', validateActionId, (req, res) => {
    // const actionID = await Actions.get(req.params.id);
    // if(!actionID){
    //     res.status(404).json({ message: `Project with this ID not found` })
    // }else{
    //     res.json(actionID)
    // }
    res.json(req.actions)



    }) 
    router.post('/', async (req, res) => {
        let { description, notes } = req.body

        const newAction = await Actions.insert(req.body)

        if(!description && !description.trim() || !notes && !notes.trim()) {
            res.status(400).json({ message: `Project  not found` })
        } else {
             res.json(newAction)
        }   
        // res.json(newAction)
        // res.json(req.insert)
    })

    router.put('/:id', async (req, res) => {
        let { description, notes } = req.body


        const updatedAction = await Actions.update(req.params.id, req.body)
        if(!req.params.id) {
            res.status(404).json({ message: `Project with ID cannot insert` })
        }  if (!description || !notes) {
            res.status(400).json({ message: `Project  missing name or content` })
        } else {
             res.json(updatedAction)
        }   
    })


    router.delete('/:id', async (req, res) => {
        // let { name, description } = req.body


        const deleteAction = await Actions.remove(req.params.id)

        if(!deleteAction) {
            res.status(404).json({ message: `Project with ID cannot delete` })
        } else {
             res.json(deleteAction)
        }   

    })

    // router.get('/:id/actions', async (req, res) => {
    //     const projectIDActions = await Actions.getProjectActions(req.params.id);
    //     if(!projectIDActions){
    //         res.status(404).json({ message: `Project with this ID does not have any Actions` })
    //     }else{
    //         res.json(projectIDActions)
    //     }
    
    
    //     }) 

module.exports = router;

