import React from 'react';
import { action } from '@storybook/addon-actions';

import AsyncCreatableSelect from 'src/Select/AsyncCreatableSelect';
import Button from 'src/Button';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
 } from 'src/Modal';

export default {
  title: 'Components/Selects/AsyncCreatable',
  component: AsyncCreatableSelect,
};

const options = [
  { label: 'Red', value: 1 },
  { label: 'Green', value: 2 },
  { label: 'Blue', value: 3 },
];

const handleRequestClose = () => action('Close');

async function loadOptions(search) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!search || !search.length) { return options; }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => {
  const handleChange = () => {};
  const handleInputChange = () => {};

  return (
    <AsyncCreatableSelect
      aria-label="Async creatable select"
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      isClearable
      loadOptions={loadOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
};

export const InModal = () => (
  <Modal
    ariaHideApp={false}
    className="AsyncCreatableSelectInModal"
    contentLabel="AsyncCreatableSelect in Modal"
    isOpen
  >
    <ModalHeader
      title="AsyncCreatableSelect in modal"
      titleId="async-creatable-select-in-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <AsyncCreatableSelect
        aria-labelledby="async-label"
        getOptionLabel={({ label }) => label}
        getOptionValue={({ value }) => value}
        id="async-creatable-select"
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
