import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"

export const Price = ({ value, currency = "£", ...props }) => (
  <group {...props}>
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter index={index} value={num === "✨" ? -1 : num} key={index} speed={0.1 * (4 - index)} />
    ))}
    <Text position={[0, 0.75, 0]} color="black" fontSize={0.15} font="Inter-Regular.woff" letterSpacing={-0.05}/>
    <Text children={"£"} anchorY="middle" anchorX="center" position={[-0.5, 0.3, 0]} fontSize={0.25} font="Inter-Regular.woff" color='black' letterSpacing={-0.09} />
    
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
)

function Counter({ index, value, speed = 0.1 }) {
  const ref = useRef()
  const stencil = useMask(1)
  useFrame((state, delta) => easing.damp(ref.current.position, "y", value * -2, speed, delta))
  return (
    <group position-x={index * 1.1} ref={ref}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[0, number * 2, 0]} color='gray' fontSize={2} font="Inter-Regular.woff">
          {number}
          <meshBasicMaterial {...stencil} />
        </Text>
      ))}
    </group>
  )
}
