import { useDrop } from 'react-dnd';
import { useGlobalContext } from '../context';
import Photo from './Photo';


function Album() {
  const { album, albumAddItem, albumRemoveItem } = useGlobalContext();

  const [{ isOverCurrent }, drop] = useDrop({
    accept: 'PHOTO',
    drop: (photo) => albumAddItem(photo),
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const items = [...album.values()];

  return (
    <section ref={drop} className={`${isOverCurrent ? 'border-gray-500 border-2' : ''} album bg-cyan-400 p-5`}>
      <h5 className='mb-4 text-gray-800'>Album Generator</h5>
      <div className='columns-2 gap-2 flex'>
        <div className='w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((photo) => (
            <Photo key={photo.id} photo={photo} className="p-1" canDelete onDelete={albumRemoveItem} />
          ))}
        </div>
        <div className='w-1/2'>
          {items.map((photo, i) => (
            <div key={photo.id} className='text-sm leading-4 p-0.5'>{i + 1}. {photo.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Album;
