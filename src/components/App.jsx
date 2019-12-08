import React, { Component, Fragment } from 'react';
import './App.css';
import { getImages } from '../actions/FlickrApi.actions';
import ImagesViewer from './ImagesViewer/ImagesViewer';
import { Container } from '@material-ui/core';
import { debounce } from "lodash";
import SearchHeader from './SearchHeader/SearchHeader';
import LoaderCircle from './LoaderCircle/LoaderCircle';
import ErrorPopup from './ErrorPopup/ErrorPopup';

const imageBoxHeight = 184;
const debounceTms = 700;

class App extends Component {

  state = {
    currentPage: 1,
    search: "",
    images: [],
    error: "",
    cols: Math.floor((document.body.clientWidth - 10) / 240),
    isLoading: true,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    getImages("")
      .then(imagesData => {
        if (imagesData instanceof Object && "photo" in imagesData)
          this.setState({ isLoading: false, images: imagesData.photo, pages: imagesData.pages })
        else
          this.setState({ error: imagesData, isLoading: false })
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.onImagesScroll = null;
    this.onImagesScrollDebounce = null;
    this.onSearchFieldChange = null;
    this.onSearchFieldChangeDebounce = null;
    this.handleResizeDebounce = null;
    this.handleResize = null;
  }

  handleResizeDebounce = debounce(() => {
    this.setState({ cols: Math.floor((document.body.clientWidth - 10) / 240) });
  }, debounceTms)

  handleResize() {
    this.handleResizeDebounce();
  }

  handleClosePopup = () => {
    this.setState({ error: "" });
  }

  onImagesScrollDebounce = debounce(() => {
    const { search, currentPage, images } = this.state;
    getImages(search, currentPage + 1)
      .then(imagesData => {
        if (imagesData instanceof Object && "photo" in imagesData)
          this.setState({ images: [...images, ...imagesData.photo], isLoading: false, currentPage: currentPage + 1 })
        else
          this.setState({ error: imagesData, isLoading: false })
      });
    this.setState({ isLoading: true });
  }, debounceTms)

  onImagesScroll = (event) => {
    const { currentPage, pages } = this.state;
    const scrollManager = event.currentTarget;
    const scrollTop = scrollManager.scrollTop;
    const scrollHeight = scrollManager.scrollHeight;
    if (scrollTop >= (scrollHeight - (imageBoxHeight * 2) - document.body.clientHeight) && currentPage < pages)
      this.onImagesScrollDebounce();
  }

  onSearchFieldChangeDebounce = debounce((search) => {
    getImages(search)
      .then(imagesData => {
        if (imagesData instanceof Object && "photo" in imagesData)
          this.setState({ images: imagesData.photo, isLoading: false, currentPage: 1, pages: imagesData.pages })
        else
          this.setState({ error: imagesData, isLoading: false })
      });
    this.setState({ isLoading: true, search });
  }, debounceTms)

  onSearchFieldChange = (event) => {
    let search = event.currentTarget.value;
    this.onSearchFieldChangeDebounce(search);
  }

  render() {
    const { images, cols, isLoading, error } = this.state;
    return (
      <Fragment>
        <ErrorPopup error={error} />
        <SearchHeader onSearchFieldChange={this.onSearchFieldChange} />
        {isLoading && <LoaderCircle />}

        <div className="App" onScroll={this.onImagesScroll}>
          <Container style={{ margin: '20px auto', [!images.length ? "textAlign" : ""]: !images.length ? "center" : "" }}>
            <ImagesViewer images={images} cols={cols} />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default App;
