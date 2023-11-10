import { useState } from 'react';
import { DndProvider } from "react-dnd";
import { useWindowSize } from 'react-use';
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import { Gallery, Album } from '../components';
import { useGlobalContext } from '../context';


const ImageContainer = () => {
  const { width } = useWindowSize();
  const isTouchDevice = width && window.matchMedia("(pointer: coarse)").matches;
  const [touchDevice, setTouchDevice] = useState(isTouchDevice);
  if (isTouchDevice !== touchDevice) {
    setTouchDevice(isTouchDevice)
    window.location.reload();
  }

  return (
    <main className='container mx-auto columns-2 mt-5'>
      <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
        <Gallery />
        <Album />
      </DndProvider>
    </main>
  );
};

export default ImageContainer;
