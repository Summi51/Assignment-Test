import { Suspense, useEffect, useMemo, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Grid, Center, Bounds, useBounds } from "@react-three/drei";

// ── Error boundary — catches useGLTF load failures ─────
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ error: null });
    }
  }
  render() {
    if (this.state.error) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff4444" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// ── Model loader ───────────────────────────────────────
function Model({ url, wireframe }) {
  const { scene: rawScene } = useGLTF(url);
  const bounds = useBounds();

  // Clone so Three.js doesn't share the same scene object across renders
  const scene = useMemo(() => rawScene.clone(true), [rawScene]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData._cloned) {
          child.material = child.material.clone();
          child.userData._cloned = true;
        }
        child.material.wireframe = wireframe;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    // Re-fit camera every time a new model loads
    bounds.refresh().fit();
  }, [scene, wireframe, bounds]);

  return <primitive object={scene} />;
}

// ── Loading spinner ────────────────────────────────────
function Loader() {
  return (
    <mesh>
      <torusGeometry args={[0.6, 0.05, 16, 60]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
}

// ── Lights ─────────────────────────────────────────────
function Lights({ ambientIntensity, directionalIntensity }) {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={directionalIntensity * 0.4}
      />
    </>
  );
}

// ── Default shape when no model is loaded ──────────────
function DefaultShape({ wireframe }) {
  return (
    <Center>
      <mesh castShadow>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe={wireframe}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </Center>
  );
}

// ── Main Viewer ────────────────────────────────────────
export default function Viewer3D({
  modelUrl,
  bgColor,
  wireframe,
  ambientIntensity,
  directionalIntensity,
}) {
  return (
    <div className="viewer-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={[bgColor]} />

        <Lights
          ambientIntensity={ambientIntensity}
          directionalIntensity={directionalIntensity}
        />

        {/*
          key={modelUrl} forces React to fully unmount + remount the Suspense
          tree on every new upload — this clears useGLTF's internal cache and
          prevents the blank canvas bug when switching between models.
        */}
        <Suspense key={modelUrl ?? "default"} fallback={<Loader />}>
          <ModelErrorBoundary url={modelUrl}>
            {modelUrl ? (
              <Bounds fit clip observe margin={1.2}>
                <Model url={modelUrl} wireframe={wireframe} />
              </Bounds>
            ) : (
              <DefaultShape wireframe={wireframe} />
            )}
          </ModelErrorBoundary>
        </Suspense>

        <Grid
          position={[0, -1.5, 0]}
          args={[20, 20]}
          cellColor="#555"
          sectionColor="#888"
          fadeDistance={25}
          infiniteGrid
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={30}
        />
      </Canvas>

      {!modelUrl && (
        <div className="viewer-hint">
          ↑ Upload a GLB/GLTF model to view it here
        </div>
      )}
    </div>
  );
}
