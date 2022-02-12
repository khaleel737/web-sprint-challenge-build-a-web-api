// add middlewares here related to actions
const action = require(`./actions-model`);


async function validateActionId (req, res, next) {
  // DO YOUR MAGIC
  try {
    const ActionID = await action.get(req.params.id)
    if(!ActionID) {
      res.status(404).json({ message: "Project not found" })
    } else {
      req.actions = ActionID;
    }
  } catch (err) {
    res.status(500).json({ message: `Could Not Get Project ID `})
  }
  next();
}


async function validateActionInsert (req, res, next) {
  

  let { description, notes } = req.body

  const newAction = await action.insert(req.body)

  if(!description && !description.trim() || !notes && !notes.trim()) {
      res.status(400).json({ message: `Project  not found` })
  } else {
       res.insert = newAction;
       next()
  }   

}





// do not forget to expose these functions to other modules
module.exports = {  
  validateActionId,
  validateActionInsert,
   
}