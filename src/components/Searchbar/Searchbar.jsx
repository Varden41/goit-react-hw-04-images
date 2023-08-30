import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
  BtnIcon,
} from './Searchbar.styled';

function SearchBar({ onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.search);
    resetForm();
  };

  return (
    <>
      <Searchbar>
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
          <SearchForm>
            <SearchFormBtn type="submit">
              <BtnIcon />
              <SearchFormBtnLabel>Search</SearchFormBtnLabel>
            </SearchFormBtn>
            <SearchFormInput
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </Searchbar>
    </>
  );
}

SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default SearchBar;
