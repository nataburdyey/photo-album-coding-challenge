import { useDrag } from 'react-dnd';

const Photo = ({ photo, added, className, canDelete, onDelete }) => {
    const [{ isDragging }, drag] = useDrag({
        item: photo,
        type: 'PHOTO',
        dropEffect: 'copy',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging || added ? 0.4 : 1;

    return (
        <div className='relative'>
            <img key={photo.id} src={photo.url} alt={photo.title} className={className} ref={drag} style={{ opacity }} />
            {canDelete && <button onClick={() => onDelete(photo.id)} className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900'>X</button>}
        </div>
    );
};

export default Photo;  