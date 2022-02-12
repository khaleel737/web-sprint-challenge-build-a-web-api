// add middlewares here related to actions
// add middlewares here related to project
const project = require(`./projects-model`);

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const path = res.originalUrl

  console.log(`your request on ${timeStamp} through ${method} to ${path} is on and on and on`);
  next();
}

async function validateProjectId (req, res, next) {
  // DO YOUR MAGIC
  try {
    const ProjectID = await project.get(req.params.id)
    if(!ProjectID) {
      res.status(404).json({ message: "Project not found" })
    } else {
      req.projects = ProjectID;
    }
  } catch (err) {
    res.status(500).json({ message: `Could Not Get Project ID `})
  }
  next();
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
  validateProjectId,
   
}