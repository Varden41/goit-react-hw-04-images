import { useState, useEffect } from 'react';
import pixabayFetch from '../Services/Pixabay';
import { Circles } from 'react-loader-spinner';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState({});
  const [page, setPage] = useState(1);
  const [showBtn, setShowbtn] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('loading');
    pixabayFetch(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return setStatus('rejected');
        }
        setPhotos(prevState => [...prevState, ...hits]);
        setStatus('loaded');
        setShowbtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        setStatus('rejected');
      });
  }, [page, searchQuery]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onLoadMore = () => {
    setStatus('loading');
    setPage(prevstate => prevstate + 1);
  };

  const handleFormSubmit = searchValue => {
    setPage(1);
    setStatus('loading');
    setsearchQuery(searchValue);
    setPhotos([]);
  };

  const handleImageClick = focusedImage => {
    setActiveImage(focusedImage);
    setShowModal(true);
  };
  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery photos={photos} handleImageClick={handleImageClick} />
      {status === 'loading' && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {status === 'rejected' && alert('Sorry pal, no pictures for you today')}
      {showBtn && <Button onLoadMore={onLoadMore} />}
      {showModal && <Modal photo={activeImage} onCloseModal={onCloseModal} />}
    </>
  );
}

export default App;
