// Write your "projects" router here!
const express = require(`express`);
const Projects = require(`./projects-model`);
const router = express.Router();
const  { validateProjectID } = require(`./projects-middleware`)

router.get('/',  async (req, res) => {
const allProjects = await Projects.get(req.params.id)
res.status(200).json(allProjects)
}) 

router.get('/:id', async (req, res) => {
    const projectID = await Projects.get(req.params.id);
    if(!projectID){
        res.status(404).json({ message: `Project with this ID not found` })
    }else{
        res.json(projectID)
    }


    }) 

    router.post('/', async (req, res) => {
        let { name, description } = req.body
        const newProject = await Projects.insert(req.body)
        if(!name && !name.trim() || !description && !description.trim()) {
            res.status(400).json({ message: `Project  not found` })
        } else {
             res.json(newProject)
        }   
    })

    router.put('/:id', async (req, res) => {
        let { name, description } = req.body


        const updateProject = await Projects.update(req.params.id, req.body)
        if(!req.params.id) {
            res.status(404).json({ message: `Project with ID cannot insert` })
        }  if (!name || !description) {
            res.status(400).json({ message: `Project  missing name or content` })
        } else {
             res.json(updateProject)
        }   
    })


    router.delete('/:id', async (req, res) => {
        // let { name, description } = req.body


        const deleteProject = await Projects.remove(req.params.id)

        if(!deleteProject) {
            res.status(404).json({ message: `Project with ID cannot delete` })
        } else {
             res.json(deleteProject)
        }   

    })

    router.get('/:id/actions', async (req, res) => {
        const projectIDActions = await Projects.getProjectActions(req.params.id);
        if(!projectIDActions){
            res.status(404).json({ message: `Project with this ID does not have any Actions` })
        }else{
            res.json(projectIDActions)
        }
    
    
        }) 

module.exports = router;

