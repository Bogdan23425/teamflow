import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const HeroOrbitScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0x8fb8ff, 0.45);
    const keyLight = new THREE.PointLight(0x9ad8ff, 1.8, 30);
    keyLight.position.set(6, 6, 6);
    const fillLight = new THREE.PointLight(0x6c7eff, 1.2, 24);
    fillLight.position.set(-6, -4, 4);
    scene.add(ambient, keyLight, fillLight);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.05, 22, 260),
      new THREE.MeshStandardMaterial({
        color: 0x7ca3ff,
        metalness: 0.5,
        roughness: 0.25,
        transparent: true,
        opacity: 0.5,
      })
    );
    torus.rotation.x = Math.PI / 2.4;
    group.add(torus);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.6 + Math.random() * 2.4;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      positions[i] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(theta);
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        size: 0.045,
        color: 0xb6dcff,
        transparent: true,
        opacity: 0.9,
      })
    );
    group.add(particles);

    const nodes: THREE.Mesh[] = [];
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x86a9ff,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.35,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8cffff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7fb5ff,
      transparent: true,
      opacity: 0.28,
    });

    const createNode = (radius: number, offset: number) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const mesh = new THREE.Mesh(geometry, nodeMaterial);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.8, 18, 18), glowMaterial);
      mesh.add(glow);
      mesh.userData = {
        baseRadius: offset,
        noise: Math.random() * Math.PI * 2,
        speed: 0.0018 + Math.random() * 0.0008,
      };
      group.add(mesh);
      nodes.push(mesh);
    };

    createNode(0.36, 2.2);
    createNode(0.28, 2.8);
    createNode(0.44, 3.6);
    createNode(0.22, 4.1);
    createNode(0.32, 4.8);

    const connections: THREE.Line[] = [];
    const connectNodes = () => {
      connections.forEach((line) => group.remove(line));
      connections.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.55) continue;
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position,
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          connections.push(line);
          group.add(line);
        }
      }
    };

    connectNodes();

    let frameId = 0;
    const rotationTarget = new THREE.Vector2();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = performance.now() * 0.0012;

      group.rotation.y += (rotationTarget.x - group.rotation.y) * 0.04;
      group.rotation.x += (rotationTarget.y - group.rotation.x) * 0.04;

      nodes.forEach((node, idx) => {
        const { baseRadius, noise, speed } = node.userData as {
          baseRadius: number;
          noise: number;
          speed: number;
        };
        const angle = t * (1.5 + idx * 0.14) + noise;
        const radius = baseRadius + Math.sin(t + noise) * 0.25;
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.4) * 0.8,
          Math.sin(angle) * radius * 0.45
        );
        node.rotation.y += speed * 45;
      });

      torus.rotation.z += 0.0025;
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      if (Math.random() > 0.975) {
        connectNodes();
      }

      renderer.render(scene, camera);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotationTarget.x = x * 0.3;
      rotationTarget.y = -y * 0.3;
    };

    const onResize = () => {
      const nextWidth = mount.clientWidth || width;
      const nextHeight = mount.clientHeight || height;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      torus.geometry.dispose();
      (torus.material as THREE.Material).dispose();
      nodes.forEach((node) => {
        node.geometry.dispose();
        node.children.forEach((child) => {
          const meshChild = child as THREE.Mesh;
          meshChild.geometry?.dispose();
        });
      });
      nodeMaterial.dispose();
      glowMaterial.dispose();
      lineMaterial.dispose();
      connections.forEach((line) => line.geometry.dispose());
    };
  }, []);

  return <div ref={mountRef} className="h-[360px] w-full md:h-[420px]" />;
};
