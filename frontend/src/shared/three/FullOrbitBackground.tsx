import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-screen Three.js layer stylized as floating task lanes and cards.
 * Pointer + scroll subtly tilts/staggers the stack. No cosmic motifs.
 */
export const FullOrbitBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const initialWidth = mount.clientWidth || window.innerWidth;
    const initialHeight = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, initialWidth / initialHeight, 0.1, 120);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xbfd9ff, 0.45);
    const key = new THREE.PointLight(0x8bb7ff, 1.2, 60);
    key.position.set(6, 4, 12);
    const fill = new THREE.PointLight(0x9ee6ff, 0.9, 40);
    fill.position.set(-8, -2, 10);
    scene.add(ambient, key, fill);

    // Grid lines hinting at columns/lanes.
    const gridHelper = new THREE.GridHelper(80, 20, 0x3c4b68, 0x1e283d);
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.18;
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -6;
    group.add(gridHelper);

    const cards: THREE.Mesh[] = [];
    const cardMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.12,
      roughness: 0.35,
      transparent: true,
      opacity: 0.9,
    });

    const cardGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8fd0ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const cardGeometries = [
      new THREE.BoxGeometry(3.6, 2.2, 0.06),
      new THREE.BoxGeometry(3.1, 1.9, 0.06),
      new THREE.BoxGeometry(2.8, 1.6, 0.06),
      new THREE.BoxGeometry(3.4, 1.4, 0.06),
    ];

    const addCard = (position: THREE.Vector3, tilt: THREE.Vector3) => {
      const base = new THREE.Mesh(
        cardGeometries[Math.floor(Math.random() * cardGeometries.length)],
        cardMaterial.clone()
      );
      base.position.copy(position);
      base.rotation.set(tilt.x, tilt.y, tilt.z);

      const glow = new THREE.Mesh(
        base.geometry.clone(),
        cardGlowMaterial.clone()
      );
      glow.scale.set(1.05, 1.06, 1);
      base.add(glow);

      base.userData = {
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002
        ),
      };
      cards.push(base);
      group.add(base);
    };

    [
      new THREE.Vector3(-5, 2.8, -1.5),
      new THREE.Vector3(-1.6, 3.2, -0.8),
      new THREE.Vector3(2.4, 2.9, -1.2),
      new THREE.Vector3(6, 2.4, -1.4),
      new THREE.Vector3(-4.5, -0.4, -0.5),
      new THREE.Vector3(-0.8, 0, -0.2),
      new THREE.Vector3(3.6, -0.1, -0.6),
      new THREE.Vector3(0.2, -3.2, -1.4),
      new THREE.Vector3(4.6, -2.6, -1.1),
      new THREE.Vector3(-3.2, -2.4, -1.2),
    ].forEach((pos, idx) => {
      addCard(
        pos,
        new THREE.Vector3(
          -0.12 + Math.random() * 0.08,
          0.08 + Math.random() * 0.1,
          (-0.1 + idx * 0.01)
        )
      );
    });

    // Soft connector lines between random cards (task relations).
    const connections: THREE.Line[] = [];
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x8ab7ff,
      transparent: true,
      opacity: 0.18,
    });

    const connectCards = () => {
      connections.forEach((line) => group.remove(line));
      connections.length = 0;
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          if (Math.random() > 0.2) continue;
          const geometry = new THREE.BufferGeometry().setFromPoints([
            cards[i].position,
            cards[j].position,
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          connections.push(line);
          group.add(line);
        }
      }
    };
    connectCards();

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const spread = 10;
      positions[i] = (Math.random() - 0.5) * spread * 2;
      positions[i + 1] = (Math.random() - 0.5) * spread * 2;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0xbadfff,
        transparent: true,
        opacity: 0.4,
      })
    );
    group.add(particles);

    let frameId = 0;
    const pointerTarget = new THREE.Vector2();
    let scrollTarget = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      const scrollInfluence = Math.min(scrollTarget / 1400, 1);

      group.rotation.y += ((pointerTarget.x * 0.35) - group.rotation.y) * 0.04;
      group.rotation.x += (((-pointerTarget.y * 0.25) + scrollInfluence * 0.35) - group.rotation.x) * 0.04;
      group.position.y += (-scrollInfluence * 1 - group.position.y) * 0.04;

      cards.forEach((card, idx) => {
        const { drift } = card.userData as { drift: THREE.Vector3 };
        card.position.x += drift.x;
        card.position.y += drift.y;
        card.position.z += drift.z * (1 + idx * 0.02);
        card.rotation.z += drift.x * 0.4;
      });

      particles.rotation.y += 0.00035;
      particles.rotation.x += 0.00022;

      if (Math.random() > 0.99) {
        connectCards();
      }

      renderer.render(scene, camera);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerTarget.set(x, y);
    };

    const onScroll = () => {
      scrollTarget = window.scrollY;
    };

    const onResize = () => {
      const w = mount.clientWidth || initialWidth;
      const h = mount.clientHeight || initialHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particles.material.dispose();
      cardGeometries.forEach((g) => g.dispose());
      cards.forEach((card) => {
        card.geometry.dispose();
        card.children.forEach((child) => {
          const meshChild = child as THREE.Mesh;
          meshChild.geometry?.dispose();
          (meshChild.material as THREE.Material)?.dispose();
        });
        (card.material as THREE.Material)?.dispose();
      });
      connectionMaterial.dispose();
      connections.forEach((line) => line.geometry.dispose());
      (gridHelper.material as THREE.Material).dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-90 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.9),rgba(0,0,0,0.55))]"
    />
  );
};
