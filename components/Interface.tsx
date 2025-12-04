import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { Button } from './UI/Button';
import { PROJECTS } from '../constants';
import gsap from 'gsap';
import { Github, Linkedin, Mail, Youtube, ArrowRight, Code, Database, Layers, Cpu } from 'lucide-react';

export const Interface: React.FC = () => {
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroSubRef = useRef<HTMLParagraphElement>(null);
    
    useEffect(() => {
        // Simple entrance animation for Hero
        if(heroTitleRef.current && heroSubRef.current) {
            gsap.fromTo(heroTitleRef.current, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
            );
            gsap.fromTo(heroSubRef.current, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
            );
        }
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            {/* HERO */}
            <Section align="left">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-12 h-[1px] bg-cyan-400"></span>
                        <span className="text-cyan-400 font-rajdhani font-semibold tracking-widest text-lg">WELCOME TO THE FUTURE</span>
                    </div>
                    <h1 ref={heroTitleRef} className="text-6xl md:text-8xl font-black font-orbitron leading-tight mb-6">
                        HI, I'M <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 neon-text">
                            ABHINAY
                        </span>
                    </h1>
                    <p ref={heroSubRef} className="text-gray-300 text-lg md:text-xl max-w-lg mb-8 font-rajdhani leading-relaxed">
                        Developer, Editor, Creator. I build modern apps, smart AI tools, and immersive digital experiences that push boundaries.
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => {
                            const scrollContainer = document.querySelector('div[style*="overflow"]'); // Helper to find r3f scroll container if needed, though simple scroll works
                            window.dispatchEvent(new CustomEvent('scroll-to-projects'));
                        }}>
                            Explore Portfolio
                        </Button>
                        <Button variant="outline">
                            Contact Me
                        </Button>
                    </div>
                </div>
            </Section>

            {/* ABOUT */}
            <Section align="right">
                <div className="glass-panel p-8 rounded-lg max-w-xl border-l-4 border-l-purple-500 transform transition-all hover:scale-[1.02]">
                    <h2 className="text-4xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                        <Cpu className="text-purple-500" /> ABOUT ME
                    </h2>
                    <p className="text-gray-300 mb-6 font-rajdhani text-lg">
                        I am a passionate technologist bridging the gap between functional code and cinematic visuals. With expertise in full-stack development and motion design, I create products that not only work flawlessly but feel alive.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded border border-white/10">
                            <h3 className="text-cyan-400 font-bold mb-2 flex items-center gap-2"><Code size={16}/> Engineering</h3>
                            <p className="text-sm text-gray-400">React, TypeScript, Python, Flutter, C++, Arduino</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded border border-white/10">
                            <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><Layers size={16}/> Creative</h3>
                            <p className="text-sm text-gray-400">Premiere Pro, After Effects, Blender, Three.js</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* PROJECTS */}
            <Section align="left">
                <div className="pl-4 border-l-2 border-cyan-500 mb-12">
                    <h2 className="text-4xl font-orbitron font-bold text-white">SELECTED WORKS</h2>
                    <p className="text-cyan-400 font-rajdhani">Scroll to explore my latest creations</p>
                </div>
                {/* Visual filler for layout; actual projects are 3D interactive elements on the right/center */}
                <div className="h-[60vh] w-full flex flex-col justify-center items-start gap-8 pointer-events-none opacity-50">
                    {PROJECTS.map((p, i) => (
                         <div key={p.id} className={`hidden md:block transition-all duration-500 ${i % 2 === 0 ? 'self-start' : 'self-end'}`}>
                            {/* Labels handled in 3D, this is just spacing */}
                         </div>
                    ))}
                </div>
            </Section>

            {/* SKILLS */}
            <Section align="center">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 neon-text">
                        TECH ARSENAL
                    </h2>
                    <p className="text-gray-400 mt-4 font-rajdhani text-xl">
                        A 3D visualization of my technical proficiency
                    </p>
                </div>
                {/* The 3D cloud is behind this */}
                <div className="h-[40vh]"></div>
            </Section>

            {/* CONTACT */}
            <Section align="center">
                <div className="glass-panel p-10 rounded-2xl max-w-2xl w-full border border-cyan-500/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
                    
                    <h2 className="text-4xl font-orbitron font-bold mb-2 text-center text-white">INITIALIZE CONNECTION</h2>
                    <p className="text-center text-gray-400 mb-8 font-rajdhani">Ready to build something extraordinary? Send a signal.</p>
                    
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-cyan-400 text-sm font-bold mb-2 tracking-wider">CODENAME</label>
                                <input type="text" className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="group">
                                <label className="block text-cyan-400 text-sm font-bold mb-2 tracking-wider">FREQUENCY (EMAIL)</label>
                                <input type="email" className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-cyan-400 text-sm font-bold mb-2 tracking-wider">TRANSMISSION</label>
                            <textarea rows={4} className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Project details..."></textarea>
                        </div>
                        <Button className="w-full flex justify-center items-center gap-2 group">
                            Transmit Message <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 flex justify-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Github /></a>
                        <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin /></a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Youtube /></a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Mail /></a>
                    </div>
                </div>
            </Section>
        </div>
    );
};