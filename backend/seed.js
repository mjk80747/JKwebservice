const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const sampleProjects = [
  {
    title: "Mundlapati Jayakrishna - Full-Stack Portfolio",
    description: "The premium professional portfolio of Mundlapati Jayakrishna, showcasing interactive full-stack web applications, optimized MySQL and MongoDB databases, and Python engineering systems. Built with MERN Stack, featuring smooth glassmorphism, responsive grid layouts, and custom project-timeline workspaces.",
    category: "Portfolio",
    techStack: ["React.js", "Express.js", "Node.js", "MongoDB", "Mongoose", "JavaScript", "Python", "SQL"],
    featuresList: [
      "Glassmorphic Dark-Mode User Interface",
      "Dynamic Skills Tracker & Tab Filters",
      "Certifications & Experience Showreel",
      "Direct Contact & General Inquiry System",
      "Interactive Collaborative Client Workspaces"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://github.com/mundlapati-jayakrishna",
    viewsCount: 2450,
    leadsGenerated: 48
  }
];


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jk_web_solutions');
    console.log('Seed: Connected to Database...');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Seed: Cleared old project entries.');

    // Seed new projects
    const seeded = await Project.insertMany(sampleProjects);
    console.log(`Seed: Successfully loaded ${seeded.length} showcased project templates!`);

    process.exit(0);
  } catch (error) {
    console.error(`Seed Failure: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
