import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Neon Nexus",
    description: "A futuristic dashboard for managing IoT devices with real-time data visualization.",
    tech: ["React", "Three.js", "WebSockets"],
    color: "#06b6d4"
  },
  {
    id: 2,
    title: "Aether Lens",
    description: "AI-powered image editing tool with generative fill capabilities using Gemini API.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    color: "#a855f7"
  },
  {
    id: 3,
    title: "Cyber Commerce",
    description: "3D e-commerce experience allowing users to inspect products in VR.",
    tech: ["Next.js", "R3F", "Stripe"],
    color: "#ec4899"
  },
  {
    id: 4,
    title: "Quantum Chat",
    description: "End-to-end encrypted messaging app with ephemeral self-destructing messages.",
    tech: ["Flutter", "Firebase", "Signal Protocol"],
    color: "#10b981"
  }
];

export const SKILLS: Skill[] = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Three.js", level: 85, category: "creative" },
  { name: "Python", level: 80, category: "backend" },
  { name: "Flutter", level: 75, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Blender", level: 70, category: "creative" },
  { name: "Adobe Suite", level: 80, category: "creative" }
];