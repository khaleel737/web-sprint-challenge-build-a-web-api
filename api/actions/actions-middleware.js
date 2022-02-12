// add middlewares here related to actions
// add middlewares here related to project
const action = require(`./actions-model`);

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const path = res.originalUrl

  console.log(`your request on ${timeStamp} through ${method} to ${path} is on and on and on`);
  next();
}

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

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  
 const { name } = req.body;
 
 if(!name || !name.trim()) {
  res.status(400).json({ message: "missing required name field" })
 } else {
  req.project = project.trim()
  next()
 }

}

// function validatePost(req, res, next) {
//   // DO YOUR MAGIC
//   const { text } = req.body
//   if(!text || !text.trim()) {
//     res.status(400).json({ message: "missing required text field" })
//   } else {
//     req.text = text.trim()
//     next()
//   }

// }

// do not forget to expose these functions to other modules
module.exports = {
  logger,  
  validateActionId,
  validateActionInsert,
   
}