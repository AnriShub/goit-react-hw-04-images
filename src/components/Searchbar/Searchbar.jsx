import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import css from 'components/Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleQweryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error('Search fild is empty');
      return
    }
    onSubmit(query);
  }

  return (
    <header className={css.Searchbar} >
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch size={25} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="query"
          value={query}
          onChange={handleQweryChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </header>
  )
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};