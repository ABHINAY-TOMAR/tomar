import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fake loading for dramatic effect
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Loading Screen */}
      <div className={`loader-container ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="font-orbitron text-xl tracking-widest text-cyan-400 animate-pulse">INITIALIZING SYSTEM...</h2>
         </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: false, alpha: false }} // Optimization for post-processing
      >
        <color attach="background" args={['#050505']} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.2}>
            {/* 3D Content */}
            <Experience />
            
            {/* HTML Overlay */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <Interface />
            </Scroll>
          </ScrollControls>

          {/* Post Processing Effects for Cinematic Look */}
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={1} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.4}
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* UI Overlay for sticky elements (like navbar if needed) */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-50">
          <div className="pointer-events-auto">
             <span className="font-orbitron font-bold text-xl tracking-widest">ABHINAY</span>
          </div>
          <div className="pointer-events-auto hidden md:flex gap-6 font-rajdhani font-medium text-sm text-gray-400">
             <span className="hover:text-cyan-400 cursor-pointer transition-colors">HOME</span>
             <span className="hover:text-cyan-400 cursor-pointer transition-colors">ABOUT</span>
             <span className="hover:text-cyan-400 cursor-pointer transition-colors">PROJECTS</span>
             <span className="hover:text-cyan-400 cursor-pointer transition-colors">CONTACT</span>
          </div>
      </div>
    </div>
  );
}

export default App;