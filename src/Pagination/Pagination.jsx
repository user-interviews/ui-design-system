import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { breakpoints } from './breakpoints';
import Resize from './resize';
import { QueryString } from './http';

import './Pagination.scss';

const sizeBoundsPropType = PropTypes.shape({
  margin: PropTypes.number.isRequired, // how many to show at the edge
  range: PropTypes.number.isRequired, // how many to show around current
});

const breakPointsPropType = PropTypes.shape({
  xs: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
  sm: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
  md: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
  lg: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
  xl: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
});

/*
Effectively a wrapper class for react-paginate that adds a little responsive handling to resize
the pages visible depending on the browser width
 */
export default class Pagination extends Component {
  static propTypes = {
    xs: sizeBoundsPropType, // eslint-disable-line react/sort-prop-types
    sm: sizeBoundsPropType, // eslint-disable-line react/sort-prop-types
    md: sizeBoundsPropType, // eslint-disable-line react/sort-prop-types
    lg: sizeBoundsPropType, // eslint-disable-line react/sort-prop-types
    xl: sizeBoundsPropType, // eslint-disable-line react/sort-prop-types

    breakpoints: breakPointsPropType, // eslint-disable-line react/sort-prop-types
    className: PropTypes.string, // eslint-disable-line react/sort-prop-types
    currentPage: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types
    disableInitialCallback: PropTypes.bool, // eslint-disable-line react/sort-prop-types
    pageQsVar: PropTypes.string, // eslint-disable-line react/sort-prop-types
    totalPages: PropTypes.number.isRequired, // eslint-disable-line react/sort-prop-types

    onNavigate: PropTypes.func,
  };

  static defaultProps = {
    xs: { margin: 1, range: 1 },
    sm: { margin: 1, range: 3 },
    md: { margin: 3, range: 5 },
    lg: { margin: 4, range: 6 },
    xl: { margin: 6, range: 9 },
    breakpoints,
    className: null,
    disableInitialCallback: true,
    onNavigate: null,
    pageQsVar: 'page',
  };

  constructor(props) {
    super(props);

    this.state = {
      queryString: QueryString.parse(document.location.search),
      size: this.determineSize(),
    };
  }

  onBuildUrl = (page) => {
    const qs = Object.assign({}, this.state.queryString);
    qs[this.props.pageQsVar] = page;
    return `?${QueryString.stringify(qs)}`;
  };

  onNavigate = ({ selected }) => {
    const page = selected + 1; // selected is 0-index
    const href = this.onBuildUrl(page);

    if (this.props.onNavigate) {
      this.props.onNavigate({ page, href });
    } else {
      window.location = href;
    }
  };

  changeSize() {
    const newSize = this.determineSize();

    if (newSize !== this.state.size) {
      this.setState({ size: newSize });
    }
  }

  determineSize() {
    const { innerWidth } = window;

    let size = this.props.xs;

    if (innerWidth >= this.props.breakpoints.xl) {
      size = this.props.xl;
    } else if (innerWidth >= this.props.breakpoints.lg) {
      size = this.props.lg;
    } else if (innerWidth >= this.props.breakpoints.md) {
      size = this.props.md;
    } else if (innerWidth >= this.props.breakpoints.sm) {
      size = this.props.sm;
    }

    return size;
  }

  componentDidMount() {
    this.resizeListener = Resize.listen(() => { this.changeSize(); });
  }

  componentWillUnmount() {
    Resize.cleanup(this.resizeListener);
  }

  render() {
    if (!this.props.totalPages) {
      return <p className="pagination__no-results">No results&hellip;</p>;
    }

    return (
      <nav aria-label="results navigation" className={this.props.className}>
        <ReactPaginate
          activeClassName="active"
          breakClassName="page-item disabled"
          breakLabel={<span className="page-link">&hellip;</span>}
          containerClassName="pagination"
          disableInitialCallback={this.props.disableInitialCallback}
          forcePage={this.props.currentPage - 1}
          hrefBuilder={this.onBuildUrl}

          marginPagesDisplayed={this.state.size.margin}
          nextClassName="page-item"
          nextLabel={'>>'} //TO-DO
          nextLinkClassName="page-link"
          pageClassName="page-item"
          pageCount={this.props.totalPages}
          pageLinkClassName="page-link"
          pageRangeDisplayed={this.state.size.range}
          previousClassName="page-item"
          previousLabel={'<<'} //TO-DO
          previousLinkClassName="page-link"
          onPageChange={this.onNavigate}
        />
      </nav>
    );
  }
}
