import * as THREE from 'three'
import { Suspense, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Stage, OrbitControls } from '@react-three/drei'

function Model(props) {
  const { scene, nodes, materials } = useGLTF('/lambo.glb')
  useLayoutEffect(() => {
    scene.traverse((obj) => obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true))
    Object.assign(nodes.wheel003_020_2_Chrome_0.material, { metalness: 1, roughness: 0.4, color: new THREE.Color('black') })
    Object.assign(materials.WhiteCar, { roughness: 0, metalness: 0.25, emissive: new THREE.Color('#500000'), envMapIntensity: 0.5 })
  }, [scene, nodes, materials])
  return <primitive object={scene} {...props} />
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 50 }}>
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 10, 50]} />
      <Suspense fallback={null}>
        <Environment path="/cube" />
        <Stage environment={null} intensity={1} contactShadowOpacity={1} shadowBias={-0.0015}>
          <Model scale={0.01} />
        </Stage>
      </Suspense>
      <mesh rotation-x={-Math.PI / 2} scale={100}>
        <planeGeometry />
        <meshStandardMaterial color="#101010" transparent depthWrite={false} />
      </mesh>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 2.8} />
    </Canvas>
  )
}
