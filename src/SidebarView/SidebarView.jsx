import React, { Children, Component, createRef } from 'react';
import classNames from 'classnames';
import findTabbableDescendants from 'react-modal/lib/helpers/tabbable';
import * as keyCodes from 'lib/keycodes';
import * as propTypes from 'lib/prop_types';
import './sidebar_view.scss';

// A <SidebarView> expects two child nodes: the first will be presented as a
// sidebar and the second will be presented as the sidebar’s associated content.
//
// It is expected that the SidebarView will have full viewport width (its
// behavior is based in part on media queries), but it does not matter if there
// is content above or below it (e.g. the primary nav).
//
// When `isSidebarOpenable` is true, the layout changes: the would-be sidebar
// takes on dialog-like behaviors. The sidebar and content become modal in
// relation to one another (not in relation to the application root, which is
// why a typical modal isn’t suitable). This means the visibility and interior
// focusability of each is exclusive of the other, toggled based on
// `isSidebarOpen`. Although the word sidebar is sort of a misnomer in this
// state, visually it does still enter from the left, hinting at its
// relationship to the layout at larger viewport widths.
//
// Fortunately, react-modal exposes its ‘findTabbableDescendants’ function,
// allowing us to use just the bit we need.
//
// Determining when the sidebar is ‘openable’ (as opposed to always visible) is
// expected to be media query based, but this is left for the parent to manage.
// Although I would expect this to usually use the same logic, managing that
// state doesn’t belong to the <SidebarView> component because the same
// information is needed in non-descendents. For example, determining whether to
// render a button for opening the sidebar also requires knowledge of whether
// the sidebar is openable.
//
// To facilitate this there is an hoc function, withMediaQuery, that can be used
// to decorate the parent component, which then has to map the incoming data to
// isSidebarOpen/isSidebarOpenable. It is expected that isSidebarOpen is never
// true unless isSidebarOpenable is also true. However if they were accidentally
// mismatched, the layout would remain in the ‘unopenable’ state.

export default class SidebarView extends Component {
  static propTypes = {
    className: propTypes.string,
    hideSidebar: propTypes.bool,
    isSidebarOpen: propTypes.bool.isRequired,
    isSidebarOpenable: propTypes.bool.isRequired,
    sidebarTitleId: propTypes.string.isRequired,
    onSidebarCloseRequest: propTypes.func.isRequired,
  };

  static defaultProps = {
    className: undefined,
    hideSidebar: false,
  };

  contentElementRef = createRef();

  sidebarElementRef = createRef();

  handleFocusOut = ({ relatedTarget }) => {
    if (this.contentElementRef.current.contains(relatedTarget)) {
      const [firstTabbable = this.sidebarElementRef.current] =
        findTabbableDescendants(document.body);

      firstTabbable.focus();
    }
  };

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === keyCodes.ESCAPE) {
      this.props.onSidebarCloseRequest();
    }
  };

  getConditionalSidebarAttributes() {
    if (this.props.isSidebarOpen) {
      return { role: 'dialog', tabIndex: '-1' };
    }

    return {};
  }

  componentDidMount() {
    if (this.props.isSidebarOpen) {
      document.addEventListener('focusout', this.handleFocusOut, true);
    }
  }

  componentDidUpdate(prevProps) {
    const sidebarElement = this.sidebarElementRef.current;
    const { activeElement } = document;

    const sidebarJustClosed =
      !this.props.isSidebarOpen &&
      prevProps.isSidebarOpen;

    const sidebarJustOpened =
      this.props.isSidebarOpen &&
      !prevProps.isSidebarOpen;

    const sidebarIsInvisibleButHasFocus =
      !this.props.isSidebarOpen &&
      this.props.isSidebarOpenable &&
      sidebarElement &&
      sidebarElement.contains(activeElement);

    if (sidebarJustClosed) {
      document.removeEventListener('focusout', this.handleFocusOut, true);
      document.removeEventListener('keydown', this.handleKeyDown);
    }

    if (sidebarJustOpened) {
      document.addEventListener('focusout', this.handleFocusOut, true);
      document.addEventListener('keydown', this.handleKeyDown);
      sidebarElement.focus({ preventScroll: true });

      // Not all agents support preventScroll, but regardless we also want to
      // reset to top. It currently isn’t necessary to cache the previous value
      // and restore it on close, but that may be needed in the future. This is
      // where that would need to happen if we wanted to add it.

      this.scrollImmediate = setImmediate(() => window.scrollTo(0, 0));
    }

    if (sidebarIsInvisibleButHasFocus) {
      activeElement.blur();
    }
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.handleMediaQueryChange);
    document.removeEventListener('focusout', this.handleFocusOut, true);
    document.removeEventListener('keydown', this.handleKeyDown);
    clearImmediate(this.scrollImmediate);
  }

  render() {
    if (Children.count(this.props.children) !== 2) {
      throw new TypeError('SidebarView must have exactly two children');
    }

    // I originally had <SidebarView.Sidebar> and <SidebarView.Content> to
    // make the slotting API more explicit, paired with type checks here. I
    // found this added more noise than clarity (a lot of boilerplate doing
    // nothing) so I removed them in favor of a simpler positional contract.
    //
    // A third alternative is to take vdom as props other than 'children', but
    // I’d personally place the bar pretty high for circumstances when it is
    // appropriate to depart from children-based contracts for vdom slotting.

    const [sidebar, content] = Children.toArray(this.props.children);

    const mainClassName = classNames(
      'SidebarView',
      {
        'SidebarView--openable': this.props.isSidebarOpenable,
      },
    );
    const sidebarClassName = classNames(
      this.props.className,
      {
        SidebarView__sidebar: true,
        'SidebarView__sidebar--open': this.props.isSidebarOpen,
        'SidebarView__sidebar--openable': this.props.isSidebarOpenable,
      },
    );

    return (
      <main className={mainClassName}>
        {!this.props.hideSidebar && (
          <div
            aria-hidden={!this.props.isSidebarOpen && this.props.isSidebarOpenable}
            aria-labelledby={this.props.sidebarTitleId}
            className={sidebarClassName}
            ref={this.sidebarElementRef}
            {...this.getConditionalSidebarAttributes()}
          >
            {sidebar}
          </div>
        )}
        <div
          aria-hidden={this.props.isSidebarOpen}
          className="SidebarView__content"
          ref={this.contentElementRef}
        >
          {content}
        </div>
      </main>
    );
  }
}
