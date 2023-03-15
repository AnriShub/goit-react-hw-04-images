import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { fetchImages } from 'components/api/fetchImages';
import { Searchbar } from 'components/Searchbar/Searchbar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button.jsx';

export const App = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = query => {
    setGallery([]);
    setPage(1);
    setQuery(query);
    setStatus('resolved');
  }

  useEffect(() => {
    if (query === '') return
    setStatus('pending');
    try {
      fetchImages(query, page).then(({ total, hits }) => {
        if (total > 0) {
          setGallery(prevGalley => [...prevGalley, ...hits]);
          setPage(page);
          setStatus('resolved');
        } else {
          setStatus('idle')
          toast.error('No images found!')
        }
      })
    } catch (error) {
      setStatus('rejected')
      setErrorMessage(error);
    }
  }, [query, page]

  )

  const loadflagClick = () => {
    setPage(prevPage => (prevPage + 1))
  }

  return (<div>
    <Searchbar onSubmit={onSubmit} />
    <ImageGallery gallery={gallery} />
    {(!(gallery.length % 12) && (gallery.length > 0)) && <Button onClick={loadflagClick} />}
    {status === 'rejected' && <div >{errorMessage}</div>}
    {status === 'pending' && <Loader query={query} />}
  </div>
  )
};