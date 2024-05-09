import * as React from 'react'
import { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { BlendFunction } from 'postprocessing'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Color } from 'three' 

function Gems(props) {
    const ref = useRef()
    const texture = useLoader(RGBELoader, '/3d/gems.hdr')
    const { nodes } = useGLTF('/3d/gem.glb')
    return (
      <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
        <mesh geometry={nodes['Layer_01(F515426E-294D-4FC4-832F-9BAC280D6A14)'].geometry} castShadow receiveShadow>
          <MeshRefractionMaterial
            envMap={texture}
            bounces={2}
            aberrationStrength={0.01}
            ior={2.4}
            color={'#fff'}
            fastChroma
          />
        </mesh>
      </group>
    )
  }
  
  function Model(props) {
    const { nodes, materials } = useGLTF('/3d/met.glb')
    materials['Silver Polished #1'].color = new Color('#fff')

    return (
      <group {...props} dispose={null}>
        <group scale={0.001}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['COLOR=�,MATERIAL=��(17C38827-CF04-41A3-BD5C-83A1DBCE0B94)'].geometry}
              material={materials['Silver Polished #1']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Layer_01(D0460141-C391-4238-B6C5-F8AD57FB3D13)'].geometry}
              material={materials['Silver Polished #1']}
            />
          </group>
        </group>
      </group>
    )
  }
  
  useGLTF.preload('/3d/met.glb')
  useGLTF.preload('/3d/gem.glb')
  
  export default function Viewer3d() {
    return (
      <Canvas shadows camera={{ fov: 60, position: [10, 40, 30] }} dpr={[1, 2]}>
        <Environment files={'/3d/Ring_Studio_011_V4.hdr'} environmentIntensity={1} />
        <color attach="background" args={['#fff']} />
        <AccumulativeShadows temporal position={[0, -1, 0]} opacity={1}>
          <RandomizedLight amount={8} radius={7} ambient={1} position={[15, 25, -10]} bias={0.001} />
        </AccumulativeShadows>  
        <Model scale={100} />
        <Gems scale={0.1} />
        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} enableDamping={false} minDistance={3} maxDistance={6} />
        <EffectComposer>
          <DepthOfField focusDistance={0.1} focalLength={0.5} bokehScale={2} />          
            <Vignette
              offset={0.5} 
              darkness={0.5} 
              eskil={false} 
              blendFunction={BlendFunction.NORMAL} 
            />
        </EffectComposer>
      </Canvas>
    )
  }
