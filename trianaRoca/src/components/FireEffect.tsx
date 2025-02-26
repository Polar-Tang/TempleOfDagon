import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getParticleSystem } from './particleSystem'; // Import the particle system from your existing code

const FireEffect = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const container = containerRef.current;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a fire emitter
    const emitter = new THREE.Object3D();
    emitter.position.set(0, -1, 0);
    scene.add(emitter);

    // Create the particle system for fire
    particleSystemRef.current = getParticleSystem({
      camera: camera,
      parent: scene,
      emitter: emitter,
      rate: 60, // Particles per second
      texture: '/fire-particle.png' // Path to your fire particle texture
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add point light to simulate fire light
    const light = new THREE.PointLight(0xff7700, 1, 10);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Animation loop
    const animate = () => {
      const delta = clockRef.current.getDelta();
      
      if (particleSystemRef.current) {
        particleSystemRef.current.update(delta);
      }
      
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js resources
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fire-container w-full h-64 relative" ref={containerRef}>
      <div className="fire-glow absolute inset-0 rounded-full bg-orange-500 opacity-20 blur-xl z-0"></div>
    </div>
  );
};

export default FireEffect;