import React, { Fragment } from 'react';
import { action } from '@storybook/addon-actions';

import AsyncSelect from 'src/Select/AsyncSelect';
import Button from 'src/Button';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
 } from 'src/Modal';

export default {
  title: 'Components/Selects/Async',
  component: AsyncSelect,
};

const options = [
  { label: 'Bob', value: 1 },
  { label: 'Dave', value: 2 },
  { label: 'Jeff', value: 3 },
  { label: 'Dennis', value: 4 },
  { label: 'Basel', value: 5 },
];

async function loadOptions(search) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!search || !search.length) { return options; }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

const handleRequestClose = () => action('Close');

export const Default = () => (
  <AsyncSelect
    aria-label="Async select"
    getOptionLabel={({ label }) => label}
    getOptionValue={({ value }) => value}
    loadOptions={loadOptions}
    noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
  />
);

export const Labeled = () => (
  <Fragment>
    <label htmlFor="async-select" id="async-label">A labeled select</label>
    <AsyncSelect
      aria-labelledby="async-label"
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      id="async-select"
      loadOptions={loadOptions}
      noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
    />
  </Fragment>
);

export const InModal = () => (
  <Modal
    ariaHideApp={false}
    className="AsyncSelectInModal"
    contentLabel="AsyncSelect in Modal"
    isOpen
  >
    <ModalHeader
      title="AsyncSelect in modal"
      titleId="async-select-in-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <AsyncSelect
        aria-labelledby="async-label"
        getOptionLabel={({ label }) => label}
        getOptionValue={({ value }) => value}
        id="async-select"
        loadOptions={loadOptions}
        modal
        noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
      />
    </ModalBody>
    <ModalFooter
      dismissButtonText="Cancel"
      onRequestClose={handleRequestClose}
    >
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
  );
