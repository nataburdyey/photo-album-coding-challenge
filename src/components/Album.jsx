import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import ReactToPrint from 'react-to-print';

import { useGlobalContext } from '../context';
import Photo from './Photo';

function Album() {
  const { album, albumAddItem, albumRemoveItem, clearAlbum } =
    useGlobalContext();
  const componentRef = useRef(null);

  const [{ isOverCurrent }, drop] = useDrop({
    accept: 'PHOTO',
    drop: (photo) => albumAddItem(photo),
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const items = [...album.values()];

  const imgToBlob = async (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      document.body.appendChild(canvas);
      canvas.toBlob((blob) => {
        img.remove();
        document.body.removeChild(canvas);
        resolve(blob)
      }, "image/png");
    }, false);
    img.addEventListener("error", reject);
    img.src = `${src}?random=${Math.random()}`;
  })

  const handleDownload = async () => {
    const zip = new JSZip();
    for (const photo of items) {
      const blob = await imgToBlob(photo.url);
      zip.file(`${photo.title}.png`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' })
    FileSaver.saveAs(content, 'download.zip');
  };

  return (
    <section
      ref={drop}
      className={`${isOverCurrent ? 'border-gray-500 border-2' : ''
        } album bg-cyan-400 p-5`}
    >
      <h5 className='mb-4 text-gray-800'>Album Generator</h5>
      <h6>
        {items.length === 0 && (
          <div className='text-sm leading-4 p-0.5'>
            Drag and drop photos here
          </div>
        )}
      </h6>
      <div className='columns-2 gap-2 flex'>
        <div
          className='w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          ref={componentRef}
        >
          {items.map((photo) => (
            <Photo
              key={photo.id}
              photo={photo}
              className='p-1'
              canDelete
              onDelete={albumRemoveItem}
            />
          ))}
        </div>
        <div className='w-1/2'>
          {items.map((photo, i) => (
            <div key={photo.id} className='text-sm leading-4 p-0.5'>
              {i + 1}. {photo.title}
            </div>
          ))}
        </div>
      </div>
      {items.length > 0 && (
        <div className='mt-5'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md m-1'
            type='button'
            onClick={clearAlbum}
          >
            Clear All
          </button>
          <button
            className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md m-1'
            type='button'
            onClick={handleDownload}
          >
            Download
          </button>
          <ReactToPrint
            trigger={() => (
              <button className='bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md m-1'>
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      )}
    </section>
  );
}
export default Album;
