import * as React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, Environment } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { BlendFunction } from 'postprocessing'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Color } from 'three' 

function Gems(props) {
    const ref = React.useRef()
    const texture = useLoader(RGBELoader, '/3d/gems.hdr')
    const { nodes } = useGLTF('/3d/gem.glb')    
    const getValues = (color)=>{switch (color) {
      case `zel`:
        return {color:'#0ca570',iord:0.3}
      case `sin`:
        return {color:'#025c98',iord:0.1}
      default:
        return {color:'#fff',iord:0}
    }}
    const values = getValues(props.color)
    console.log(values)
    return (
      <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
        <mesh geometry={nodes['Layer_01(F515426E-294D-4FC4-832F-9BAC280D6A14)'].geometry} castShadow receiveShadow>
          <MeshRefractionMaterial
            envMap={texture}
            bounces={2}
            aberrationStrength={0.01}
            ior={2.4-values.iord}
            color={values.color}
            fastChroma
          />
        </mesh>
      </group>
    )
  }
  
  function Model(props) {
    const { nodes, materials } = useGLTF('/3d/met.glb')
    switch (props.color) {
      case `Gold`:
        materials['Silver Polished #1'].color = new Color('#fceaa9')
        break;    
      case `Pink`:
        materials['Silver Polished #1'].color = new Color('#ffded4')
        break;    
      default:
        materials['Silver Polished #1'].color = new Color('#fff')
        break;
    }
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
  
  const Switcher = ({values,label,active,handler})=>{
    const baseclass = `px-4 py-2 text-sm font-medium border-gray-900 text-gray-900 border hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white`
    const activeclass = `z-10 ring-2 ring-gray-500 bg-gray-900 text-white`
    return (
      <div className={`inline-flex justify-center items-center h-auto`} role="group">
        <span className={`pr-2`}>{label}</span>
        {values.map((val,i)=>{
          let classstr
          switch (i) {        
            case 1:        
              classstr=`${baseclass} border-t border-b ${val==active?activeclass:`bg-transparent`}`
              break;          
            case 2:            
              classstr=`${baseclass} border rounded-e-lg ${val==active?activeclass:`bg-transparent`}`    
              break;          
            default:
              classstr=`${baseclass} border rounded-s-lg ${val==active?activeclass:`bg-transparent`}`    
              break;
          }
          return (
            <button type="button" className={classstr} onClick={(e)=>handler(e.target.value)} key={val} value={val}>
              {val}
            </button>
          )
        })}
      </div>
    )
  }
  export default function Viewer3d() {
    const [activeMetal,setActiveMetal] = React.useState(`Silver`);
    const [activeGem,setActiveGem] = React.useState(`Diamond`);
    const metals = [`Silver`,`Gold`,`Pink`]
    const gems = [`Diamond`,`Emerald`,`Sapphire`]
    return (
      <div className={`flex flex-col justify-center items-center h-[80vh]`}>
        <div className={`z-40 bg-white grid gap-2 grid-rows-2 grid-cols-1 w-full pb-2`}>
          <Switcher values={metals} label={`Select Metal`} active={activeMetal} handler={setActiveMetal}/>
          <Switcher values={gems} label={`Select Gem`} active={activeGem} handler={setActiveGem}/>
        </div>
        <div className={`aspect-square max-w-full flex-grow`}>
          <Canvas shadows camera={{ fov: 60, position: [10, 40, 30] }} dpr={[1, 2]}>
            <Environment files={'/3d/Ring_Studio_011_V4.hdr'} environmentIntensity={1} />
            <color attach="background" args={['#fff']} />
            <Model scale={100} color={activeMetal}/>
            <Gems scale={0.1} color={activeGem} />
            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} enableDamping={false} minDistance={4} maxDistance={4} />
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
        </div>
      </div>
    )
  }
