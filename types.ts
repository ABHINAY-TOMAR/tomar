export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  color: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  category: 'frontend' | 'backend' | 'tools' | 'creative';
}

export interface SectionProps {
  opacity?: number;
}