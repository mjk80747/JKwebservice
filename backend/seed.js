const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const sampleProjects = [
  {
    title: "L'Ambroisie - Michelin Star Experience",
    description: "An ultra-premium virtual experience built for an elite three-star Michelin restaurant. Features fluid canvas-based scroll transitions, a dark velvet parallax backdrop, interactive course selectors, and real-time integration with booking systems.",
    category: "Fine Dining",
    techStack: ["React.js", "GSAP Canvas", "Framer Motion", "Node.js", "MongoDB"],
    featuresList: [
      "Smooth Kinetic Canvas Scroll Engine",
      "Interactive Audio-Visual Course Menu Selector",
      "Real-time Table Booking & Seat Allocation",
      "Automated SMS/Email Confirmation Alerts"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: 1420,
    leadsGenerated: 24
  },
  {
    title: "Caffè Nero - Cozy Artisan Espresso Bar",
    description: "A warm, visual-first application styled for local high-end cafes. Features slow micro-interactions, an integrated click-and-collect digital menu with live pickup alerts, and a dynamic customer loyalty stamp widget.",
    category: "Café",
    techStack: ["React.js", "Vite.js", "Custom HSL CSS", "Express.js", "MongoDB"],
    featuresList: [
      "Click-and-Collect Express Pickups System",
      "Animated Coffee Beans Micro-interaction Details",
      "Interactive Digital Stamp Card Loyalty Tracker",
      "Live Order Status Tracker with Sound Alerts"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: 980,
    leadsGenerated: 18
  },
  {
    title: "Sakura Lounge - Premium Sushi & Teppanyaki",
    description: "A dark-mode Japanese sushi lounge showcase featuring glowing neon highlights, 3D rotating sushi platter displays, table side ordering simulators, and VIP lounge booking systems.",
    category: "Sushi Lounge",
    techStack: ["React.js", "Three.js", "Vanilla CSS Modules", "Node.js", "Mongoose"],
    featuresList: [
      "3D Interactive Sushi Roll Platter Viewer",
      "Dynamic Floating Neon Glow Visual Accents",
      "Direct Tableside QR Order Simulator",
      "VIP Lounge Room Reservation Manager"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: 1650,
    leadsGenerated: 32
  },
  {
    title: "Le Bon Pain - Artisan Bakery & Pastry",
    description: "A light, flour-textured warm bakery site designed to showcase baked delicacies. Featuring elegant sliding carousels, customizable pre-order reservation forms for catering events, and dynamic baking schedules.",
    category: "Bakery",
    techStack: ["Vite.js", "React.js", "CSS Grid Layouts", "Express.js", "MongoDB"],
    featuresList: [
      "Interactive Bread Baking Countdown Schedules",
      "Custom Catering Pre-Order Calculation System",
      "High-Fidelity Sliding Delicacies Portfolio",
      "Interactive Baking Class Signup Module"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: 740,
    leadsGenerated: 11
  },
  {
    title: "Green Garden - Organic Cloud Kitchen",
    description: "A vibrant, environment-friendly cloud kitchen template utilizing fresh pastel greens and clean spacing. Emphasizes visual food item caloric calculators, live kitchen webcam feeds, and instant delivery integration.",
    category: "Cloud Kitchen",
    techStack: ["React.js", "CSS Modules", "Node.js", "MongoDB", "Mongoose"],
    featuresList: [
      "Dynamic Caloric Calculator & Nutrition Panel",
      "Live Cloud Kitchen Web Camera Viewer Panel",
      "Integrated Map Delivery Distance Estimator",
      "Recurring Weekly Meal Prep Subscription Engine"
    ],
    previewImages: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop"
    ],
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: 1120,
    leadsGenerated: 21
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
