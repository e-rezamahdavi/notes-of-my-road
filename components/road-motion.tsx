"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cls } from "@/lib/content";

function seededRandom(seed: number) {
  let value = seed;

  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function roadPoint(z: number, laneOffset = 0) {
  const bend = Math.sin((z + 12) * 0.22) * 1.15;
  const lift = Math.sin(z * 0.16) * 0.08;

  return new THREE.Vector3(bend + laneOffset, -1.65 + lift, z);
}

function makeRoadLine(laneOffset: number) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index < 96; index += 1) {
    const z = 5 - index * 0.42;
    points.push(roadPoint(z, laneOffset));
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((item: THREE.Object3D) => {
    const mesh = item as THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    >;
    const candidate = mesh.geometry;

    if (candidate) {
      candidate.dispose();
    }

    const material = mesh.material;

    if (material) {
      disposeMaterial(material);
    }
  });
}

export function RoadMotion({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const mountElement = mount;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.038);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 90);
    camera.position.set(0, 1.1, 9.4);
    camera.lookAt(0, -1.15, -11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.04;
    scene.add(root);

    const random = seededRandom(42);

    const laneMaterial = new THREE.LineBasicMaterial({
      color: 0x59f2c2,
      transparent: true,
      opacity: 0.74,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const softLaneMaterial = new THREE.LineBasicMaterial({
      color: 0x91bfff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    [-1.55, -0.72, 0, 0.72, 1.55].forEach((offset, index) => {
      const line = new THREE.Line(
        makeRoadLine(offset),
        index === 2 ? laneMaterial : softLaneMaterial,
      );
      root.add(line);
    });

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x35d399,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (let index = 0; index < 30; index += 1) {
      const z = 5 - index * 1.32;
      const left = roadPoint(z, -2.6);
      const right = roadPoint(z, 2.6);
      const crossbar = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([left, right]),
        gridMaterial,
      );
      root.add(crossbar);
    }

    const pointCount = 560;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const colorA = new THREE.Color(0x2dd4bf);
    const colorB = new THREE.Color(0xf8fafc);
    const colorC = new THREE.Color(0x60a5fa);

    for (let index = 0; index < pointCount; index += 1) {
      const stride = index * 3;
      const spread = 28;
      positions[stride] = (random() - 0.5) * spread;
      positions[stride + 1] = (random() - 0.2) * 10;
      positions[stride + 2] = 6 - random() * 44;

      const mixed = colorA.clone().lerp(random() > 0.56 ? colorB : colorC, random() * 0.75);
      colors[stride] = mixed.r;
      colors[stride + 1] = mixed.g;
      colors[stride + 2] = mixed.b;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(points);

    const packetGeometry = new THREE.IcosahedronGeometry(0.105, 1);
    const packetMaterials = [
      new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 0.84,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ];
    const packets = Array.from({ length: 18 }, (_, index) => {
      const mesh = new THREE.Mesh(packetGeometry, packetMaterials[index % packetMaterials.length]);
      mesh.userData.phase = index / 18;
      mesh.userData.lane = [-1.15, -0.42, 0.42, 1.15][index % 4];
      root.add(mesh);
      return mesh;
    });

    const ringGeometry = new THREE.TorusGeometry(1.8, 0.012, 8, 96);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rings = Array.from({ length: 4 }, (_, index) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(roadPoint(-6 - index * 8));
      ring.position.y += 0.2;
      ring.rotation.x = Math.PI / 2.15;
      ring.rotation.z = index * 0.8;
      root.add(ring);
      return ring;
    });

    const pointer = new THREE.Vector2(0, 0);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let active = true;

    function resize() {
      const { width, height } = mountElement.getBoundingClientRect();
      const nextWidth = Math.max(1, width);
      const nextHeight = Math.max(1, height);
      const isCompact = nextWidth < 720;

      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.position.set(0, isCompact ? 0.7 : 1.1, isCompact ? 12.8 : 9.4);
      camera.lookAt(0, isCompact ? -1.35 : -1.15, -11);
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = mountElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    }

    function render(time = 0) {
      const seconds = time * 0.001;
      root.rotation.y = Math.sin(seconds * 0.28) * 0.08 + pointer.x * 0.035;
      root.rotation.z = pointer.y * -0.012;
      points.rotation.y = seconds * 0.025;

      packets.forEach((packet) => {
        const depth = 39;
        const z = 5 - (((seconds * 5.1 + packet.userData.phase * depth) % depth) + 0.4);
        packet.position.copy(roadPoint(z, packet.userData.lane));
        packet.position.y += 0.12;
        packet.rotation.x += 0.018;
        packet.rotation.y += 0.026;
        const scale = 0.8 + (1 - Math.min(Math.abs(z) / depth, 1)) * 1.2;
        packet.scale.setScalar(scale);
      });

      rings.forEach((ring, index) => {
        ring.rotation.z = seconds * (0.16 + index * 0.035) + index;
        ring.position.y = roadPoint(-6 - index * 8).y + 0.18 + Math.sin(seconds + index) * 0.08;
      });

      renderer.render(scene, camera);

      if (active && !prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mountElement);
    mountElement.addEventListener("pointermove", onPointerMove);
    resize();
    render();

    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mountElement.removeEventListener("pointermove", onPointerMove);
      disposeObject(root);
      packetGeometry.dispose();
      packetMaterials.forEach((material) => material.dispose());
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={cls("pointer-events-none overflow-hidden", className)}
    />
  );
}

type AmbientVariant = "mesh" | "terminal" | "links" | "support";

const ambientPalettes: Record<AmbientVariant, [number, number, number]> = {
  mesh: [0x34d399, 0x60a5fa, 0xf8fafc],
  terminal: [0x0f766e, 0x22c55e, 0x111827],
  links: [0x38bdf8, 0x34d399, 0xf8fafc],
  support: [0xfbbf24, 0x34d399, 0x60a5fa],
};

export function AmbientMotion({
  className,
  variant = "mesh",
}: {
  className?: string;
  variant?: AmbientVariant;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const mountElement = mount;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const root = new THREE.Group();
    const colors = ambientPalettes[variant];
    const random = seededRandom(variant.length * 1024);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let active = true;

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
    mountElement.appendChild(renderer.domElement);
    scene.add(root);

    const pointCount = variant === "terminal" ? 220 : 300;
    const positions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);
    const colorA = new THREE.Color(colors[0]);
    const colorB = new THREE.Color(colors[1]);
    const colorC = new THREE.Color(colors[2]);

    for (let index = 0; index < pointCount; index += 1) {
      const stride = index * 3;
      positions[stride] = (random() - 0.5) * 12;
      positions[stride + 1] = (random() - 0.5) * 6;
      positions[stride + 2] = (random() - 0.5) * 10;

      const mixed = colorA.clone().lerp(random() > 0.5 ? colorB : colorC, random() * 0.85);
      pointColors[stride] = mixed.r;
      pointColors[stride + 1] = mixed.g;
      pointColors[stride + 2] = mixed.b;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

    root.add(
      new THREE.Points(
        pointGeometry,
        new THREE.PointsMaterial({
          size: variant === "terminal" ? 0.045 : 0.055,
          vertexColors: true,
          transparent: true,
          opacity: variant === "terminal" ? 0.32 : 0.52,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: colors[0],
      transparent: true,
      opacity: variant === "terminal" ? 0.14 : 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      wireframe: true,
    });
    const knotMaterial = new THREE.MeshBasicMaterial({
      color: colors[1],
      transparent: true,
      opacity: variant === "support" ? 0.24 : 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      wireframe: true,
    });

    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.018, 12, 96), ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    root.add(ring);

    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.95, 0.018, 120, 8), knotMaterial);
    knot.position.set(variant === "links" ? -1.65 : 1.45, variant === "terminal" ? -0.35 : 0.2, 0);
    root.add(knot);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: colors[2],
      transparent: true,
      opacity: variant === "terminal" ? 0.12 : 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (let index = 0; index < 5; index += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, -1.7 + index * 0.55, -2 + index * 0.2),
        new THREE.Vector3(-1.8, Math.sin(index) * 0.5, 0.8),
        new THREE.Vector3(1.2, Math.cos(index) * 0.55, -0.6),
        new THREE.Vector3(5, 1.6 - index * 0.48, 1.8 - index * 0.2),
      ]);
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)), lineMaterial));
    }

    function resize() {
      const { width, height } = mountElement.getBoundingClientRect();
      const nextWidth = Math.max(1, width);
      const nextHeight = Math.max(1, height);

      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.position.set(0, 0, nextWidth < 720 ? 9.5 : 7.5);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }

    function render(time = 0) {
      const seconds = time * 0.001;
      root.rotation.x = Math.sin(seconds * 0.18) * 0.16;
      root.rotation.y = seconds * (variant === "terminal" ? 0.06 : 0.09);
      ring.rotation.z = seconds * 0.18;
      knot.rotation.x = seconds * 0.24;
      knot.rotation.y = seconds * 0.18;
      renderer.render(scene, camera);

      if (active && !prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mountElement);
    resize();
    render();

    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      disposeObject(root);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={cls("pointer-events-none overflow-hidden", className)}
    />
  );
}
