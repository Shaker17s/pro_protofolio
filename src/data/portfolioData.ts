export const portfolioData = {
  name: "Shaker Abdallah",
  titles: ["Software Engineer", "AI Prompt Engineer", "RLHF Specialist"],
  university: "Al-Azhar University",
  about: "I am an Engineering Student at Al-Azhar University specializing in AI Prompt Engineering & Software Development. My work focuses on optimizing the friction between human intent and machine execution, specifically through RLHF and advanced LLM behavior tuning.",
  skills: [
    { name: "Python", expert: true, category: "Languages" },
    { name: "Django", expert: true, category: "Backend" },
    { name: "React", expert: false, category: "Frontend" },
    { name: "OpenAI/LLMs", expert: true, category: "AI" },
    { name: "PostgreSQL", expert: true, category: "Database" },
    { name: "OpenCV", expert: false, category: "Vision" }
  ],
  socials: {
    github: "https://github.com/Shaker17s",
    linkedin: "https://www.linkedin.com/in/shaker-abdallah-79b0a1339/",
    instagram: "https://www.instagram.com/s_h_a_k_err/"
  },
  projects: [
    {
      title: "Django BookStore",
      category: "Scalable E-commerce",
      tools: ["Django", "PostgreSQL", "Stripe", "Redis"],
      link: "https://github.com/Shaker17s/django_store",
      image: "/images/bookstore_final.png"
    },
    {
      title: "NexusAI Hub",
      category: "Professional AI Social Network",
      tools: ["React", "Django REST", "NLP", "AWS"],
      link: "https://github.com/Shaker17s/NexusAI",
      image: "/images/nexus_v2.png"
    },
    {
      title: "VisionScribe",
      category: "CV Interaction System",
      tools: ["Python", "OpenCV", "MediaPipe"],
      link: "https://github.com/Shaker17s/VisionScribe",
      image: "/images/visionscribe.png"
    }
  ]
};
