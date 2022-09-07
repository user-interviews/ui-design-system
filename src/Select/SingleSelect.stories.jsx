import React, { Fragment, useRef } from 'react';
import { action } from '@storybook/addon-actions';

import {
 Modal, ModalHeader, ModalBody, ModalFooter,
} from 'src/Modal';
import SingleSelect from 'src/Select/SingleSelect';

import Option from './Option';
import ValueContainer from './ValueContainer';

import mdx from './SingleSelect.mdx';

const onChange = () => action('Change');
const handleRequestClose = () => action('Close');

export default {
  title: 'Components/Selects/Single',
  component: SingleSelect,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const options = [
  { label: 'White', value: 1 },
  { label: 'Black / African American', value: 2 },
  { label: 'American Indian / Alaska Native', value: 3 },
  { label: 'Asian', value: 4 },
  { label: 'Native Hawaiian / Pacific Islander', value: 5 },
  { label: 'Hispanic / Latinx', value: 6 },
];

export const Default = () => (
  <SingleSelect aria-label="Default select" options={options} onChange={onChange} />
);

export const Searchable = () => (
  <SingleSelect aria-label="Searchable select" isSearchable options={options} onChange={onChange} />
);

export const Loading = () => (
  <SingleSelect aria-label="Loading select" isLoading options={options} onChange={onChange} />
);

export const Labeled = () => (
  <Fragment>
    <label htmlFor="labeled-select" id="select-label">Labeled select</label>
    <SingleSelect
      aria-labelledby="select-label"
      id="labeled-select"
      options={options}
      onChange={onChange}
    />
  </Fragment>
);

export const MultiSelect = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label">Multi select</label>
    <SingleSelect
      aria-labelledby="select-label"
      id="multi-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);

export const InModal = () => (
  <Modal
    ariaHideApp={false}
    className="SelectInModal"
    contentLabel="Select in Modal"
    isOpen
  >
    <ModalHeader
      title="Select in modal"
      titleId="select-in-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <span>A select inside a modal</span>
      <SingleSelect
        aria-labelledby="select-label"
        id="select-in-modal"
        modal
        options={options}
        onChange={onChange}
      />
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-transparent" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Save</button>
    </ModalFooter>
  </Modal>
  );

export const CustomOptionWithCheckbox = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label-custom-option">Custom option with checkbox</label>
    <SingleSelect
      aria-labelledby="select-label"
      closeMenuOnSelect={false}
      components={{
        Option,
      }}
      hideSelectedOptions={false}
      id="multi-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);

export const CustomOptionWithIndeterminateCheckbox = () => {
  const optionsArr = [
    { label: 'Riley Researcher', value: 1 },
    { label: 'Patty Participant', value: 2 },
    { label: 'Patrick Participant (indeterminate)', value: 3 },
    { label: 'Polly Participant (indeterminate)', value: 4 },
  ];

  let inputRef;

  const createInputRef = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef();
    return inputRef;
  };

  return (
    <Fragment>
      <label htmlFor="multi-select" id="select-label-custom-option-indeterminate">Custom option with indeterminate checkbox</label>
      <SingleSelect
        aria-labelledby="select-label"
        closeMenuOnSelect={false}
        components={{
          Option: (props) => (
            <Option
              {...props}
              // eslint-disable-next-line react/prop-types
              indeterminate={props.value > 2}
              ref={createInputRef()}
            />
          ),
        }}
        hideSelectedOptions={false}
        id="multi-select"
        isMulti
        options={optionsArr}
        onChange={onChange}
      />
    </Fragment>
  );
};

export const CustomValueContainer = () => (
  <Fragment>
    <label htmlFor="custom-value-container-select" id="select-label-custom-value-container">
      Custom value container
    </label>
    <SingleSelect
      aria-labelledby="select-label"
      closeMenuOnSelect={false}
      components={{
        Option,
        ValueContainer: (props) => (
          <ValueContainer
            {...props}
            /* eslint-disable react/prop-types */
            valueText={`participant${props.getValue().length > 1 ? 's' : ''} selected`}
            /* eslint-enable react/prop-types */
          />
        ),
      }}
      hideSelectedOptions={false}
      id="custom-value-container-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);
