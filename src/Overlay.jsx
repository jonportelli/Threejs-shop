import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineShopping, AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import styled from 'styled-components'

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: left;
  pointer-events: auto;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
`;

const Section = styled(motion.section)`
  position: fixed;
  top: 80%;
  left: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 2rem;
  pointer-events: auto;
`;

const SectionContainer = styled.div`
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #000;
  font-family: 'Inter', sans-serif;
`;

const Content = styled(motion.div)`
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #333;
    justify: left;
  }
`;

const Button = styled(motion.button)`
  padding: 2rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const Customizer = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: auto;
`;

const ColorOption = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#000' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export function Overlay() {
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  return (
    <OverlayContainer>
      <Header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <Logo>MALDEN ESTATE</Logo>
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
          <AiOutlineShopping size="2em" />
        </motion.div>
      </Header>

      <AnimatePresence>
        {snap.intro ? (
          <Section key="main" {...config}>
            <SectionContainer>
              {/* <Title
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                DISCOVER OUR COLLECTION
              </Title> */}
              <Content
                key="p"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  damping: 7,
                  stiffness: 30,
                  restDelta: 0.001,
                  duration: 0.6,
                  delay: 0.2,
                  delayChildren: 0.2
                }}>
                <p>
                  Explore our curated collection of premium furniture pieces. <strong>Transform your space</strong> with our unique designs and exceptional craftsmanship.
                </p>
                <Button onClick={() => (state.intro = false)}>
                  EXPLORE COLLECTION <AiOutlineHome size="1.3em" />
                </Button>
              </Content>
            </SectionContainer>
          </Section>
        ) : (
          <Section key="custom" {...config}>
            <Customizer>
              <ColorOption color="#EFBD48" selected={snap.color === '#EFBD48'} onClick={() => (state.color = '#EFBD48')} />
              <ColorOption color="#000000" selected={snap.color === '#000000'} onClick={() => (state.color = '#000000')} />
              <ColorOption color="#ffffff" selected={snap.color === '#ffffff'} onClick={() => (state.color = '#ffffff')} />
              <Button onClick={() => (state.intro = true)}>
                GO BACK <AiOutlineArrowLeft size="1.3em" />
              </Button>
            </Customizer>
          </Section>
        )}
      </AnimatePresence>
    </OverlayContainer>
  )
}