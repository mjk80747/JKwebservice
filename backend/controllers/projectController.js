const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving projects' });
  }
};

// @desc    Get project by ID & increment view count
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.query.id || req.params.id);

    if (project) {
      // Increment views count
      project.viewsCount = (project.viewsCount || 0) + 1;
      await project.save();

      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving project details' });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, category, techStack, featuresList, previewImages, demoLink } = req.body;

    if (!title || !description || !category || !demoLink) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const project = new Project({
      title,
      description,
      category,
      techStack: techStack || [],
      featuresList: featuresList || [],
      previewImages: previewImages || [],
      demoLink
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating project' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, category, techStack, featuresList, previewImages, demoLink } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.category = category || project.category;
      project.techStack = techStack || project.techStack;
      project.featuresList = featuresList || project.featuresList;
      project.previewImages = previewImages || project.previewImages;
      project.demoLink = demoLink || project.demoLink;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating project' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
