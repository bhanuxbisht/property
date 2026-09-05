"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Compass,
  Sparkles,
} from "lucide-react";

interface VirtualTourViewerProps {
  panoramaUrl: string;
  title?: string;
  rooms?: { name: string; url: string }[];
}

export function VirtualTourViewer({
  panoramaUrl,
  title = "360° Virtual Tour",
  rooms,
}: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentUrl, setCurrentUrl] = useState(panoramaUrl);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);

  const isUserInteracting = useRef(false);
  const onPointerDownMouseX = useRef(0);
  const onPointerDownMouseY = useRef(0);
  const lon = useRef(0);
  const onPointerDownLon = useRef(0);
  const lat = useRef(0);
  const onPointerDownLat = useRef(0);
  const phi = useRef(0);
  const theta = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      1100
    );
    cameraRef.current = camera;

    // 2. Geometry (inverted sphere)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // 3. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);

    const texture = textureLoader.load(
      currentUrl,
      () => setIsLoading(false),
      undefined,
      () => setIsLoading(false)
    );
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    sphereRef.current = mesh;

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 5. Interaction Listeners
    const onPointerDown = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      isUserInteracting.current = true;
      onPointerDownMouseX.current = event.clientX;
      onPointerDownMouseY.current = event.clientY;
      onPointerDownLon.current = lon.current;
      onPointerDownLat.current = lat.current;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      lon.current =
        (onPointerDownMouseX.current - event.clientX) * 0.18 +
        onPointerDownLon.current;
      lat.current =
        (event.clientY - onPointerDownMouseY.current) * 0.18 +
        onPointerDownLat.current;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      isUserInteracting.current = false;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(fov, 30, 95);
      camera.updateProjectionMatrix();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("wheel", onWheel, { passive: false });

    // 6. Resize Handler
    const onResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Subtle slow rotation when idle
      if (!isUserInteracting.current) {
        lon.current += 0.04;
      }

      lat.current = Math.max(-85, Math.min(85, lat.current));
      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      const targetX = 500 * Math.sin(phi.current) * Math.cos(theta.current);
      const targetY = 500 * Math.cos(phi.current);
      const targetZ = 500 * Math.sin(phi.current) * Math.sin(theta.current);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("wheel", onWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [currentUrl]);

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const fov = cameraRef.current.fov + delta;
    cameraRef.current.fov = THREE.MathUtils.clamp(fov, 30, 95);
    cameraRef.current.updateProjectionMatrix();
  };

  const handleReset = () => {
    lon.current = 0;
    lat.current = 0;
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const toggleFullscreen = () => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    if (!document.fullscreenElement) {
      parent.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-black shadow-2xl border border-white/10 select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="h-[400px] w-full cursor-grab active:cursor-grabbing sm:h-[520px] md:h-[600px]"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="mt-3 text-xs tracking-wider uppercase text-white/80 font-medium">
            Loading 360° Panorama...
          </p>
        </div>
      )}

      {/* Top Banner: Title & Drag Hint */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-md text-white text-xs">
          <Compass size={14} className="text-terracotta animate-pulse" />
          <span className="font-semibold">{title}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 backdrop-blur-md text-[11px] text-white/80">
          <Sparkles size={12} className="text-amber-300" />
          <span>Click &amp; drag to explore all angles</span>
        </div>
      </div>

      {/* Floating Interactive Controls (Bottom Right) */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 p-1.5 backdrop-blur-md text-white">
        <button
          type="button"
          onClick={() => handleZoom(-10)}
          title="Zoom In"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <ZoomIn size={16} />
        </button>

        <button
          type="button"
          onClick={() => handleZoom(10)}
          title="Zoom Out"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <ZoomOut size={16} />
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="Reset View"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <RotateCcw size={15} />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Room Selector (Bottom Left) if multiple rooms provided */}
      {rooms && rooms.length > 1 && (
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 max-w-[70%]">
          {rooms.map((room) => (
            <button
              key={room.url}
              type="button"
              onClick={() => setCurrentUrl(room.url)}
              className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md transition-all ${
                currentUrl === room.url
                  ? "bg-terracotta text-white shadow-md"
                  : "bg-black/60 text-white/80 hover:bg-black/80"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
