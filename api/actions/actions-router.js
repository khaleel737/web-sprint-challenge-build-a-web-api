// Write your "projects" router here!
const express = require(`express`);
const Actions = require(`./actions-model`);
const router = express.Router();
// const  { validateProjectID } = require(`./projects-middleware`)

router.get('/',  async (req, res) => {
const allActions = await Actions.get(req.params.id)
res.status(200).json(allActions)
}) 

router.get('/:id', async (req, res) => {
    const actionID = await Actions.get(req.params.id);
    if(!actionID){
        res.status(404).json({ message: `Project with this ID not found` })
    }else{
        res.json(actionID)
    }


    }) 

    router.post('/', async (req, res) => {
        let { name, description } = req.body
        const newAction = await Actions.insert(req.body)
        if(!name && !name.trim() || !description && !description.trim()) {
            res.status(400).json({ message: `Project  not found` })
        } else {
             res.json(newAction)
        }   
    })

    router.put('/:id', async (req, res) => {
        let { name, description } = req.body


        const updatedAction = await Actions.update(req.params.id, req.body)
        if(!req.params.id) {
            res.status(404).json({ message: `Project with ID cannot insert` })
        }  if (!name || !description) {
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

