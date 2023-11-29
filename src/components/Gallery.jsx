import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { useDrop } from 'react-dnd';

import Photo from './Photo';
import { useGlobalContext } from '../context';

const maxPhotos = 100;
let limit = 10;

const fetchPhotos = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${pageParam}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const Gallery = () => {
  const { setPhotos, photos, album, albumRemoveItem } = useGlobalContext();

  // Dragging the photo back to the gallery removes it from the album
  const [{ isOverCurrent }, drop] = useDrop({
    accept: 'PHOTO',
    drop: (photo) => albumRemoveItem(photo.id),
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const { fetchNextPage, hasNextPage, isError, status } = useInfiniteQuery('photos', fetchPhotos, {
    onSettled: (data) => {
      const photos = data?.pages.reduce((acc, page) => [...acc, ...page.photos], []) || [];
      setPhotos(photos);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.photos.length === limit && pages.length * limit < maxPhotos)
        return pages.length * limit;
      return undefined;
    },
  });

  if (isError) {
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
      </section>
    );
  }

  if (status === 'loading') {
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  }
  const loaded = photos.length || 0;

  if (loaded === 0) {
    return (
      <section className='image-container'>
        <h4>No results found...</h4>
      </section>
    );
  }

  if (loaded <= 30) {
    setTimeout(() => {
      fetchNextPage();
    });
  }

  return (
    <section ref={drop} className={`${isOverCurrent ? 'border-gray-500 border-2' : ''}`}>
      <InfiniteScroll
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
        dataLength={loaded}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loaded: {loaded}. Loading more...</h4>}
      >
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} added={album.has(photo.id)} />
        ))}
      </InfiniteScroll>
    </section>
  );
};
export default Gallery;
