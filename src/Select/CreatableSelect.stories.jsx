import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from 'src/Button';
import CreatableSelect from 'src/Select/CreatableSelect';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
 } from 'src/Modal';

export default {
  title: 'Components/Selects/Creatable',
  component: CreatableSelect,
};

const options = [
  { label: 'Red', value: 1 },
  { label: 'Green', value: 2 },
  { label: 'Blue', value: 3 },
];

export const Default = () => {
  const handleChange = () => {};
  const handleInputChange = () => {};

  return (
    <CreatableSelect
      isClearable
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
};

export const InModal = () => {
  const handleChange = () => {};
  const handleInputChange = () => {};
  const handleRequestClose = () => action('Close');

  return (
    <Modal
      ariaHideApp={false}
      className="CreatableSelectInModal"
      contentLabel="CreatableSelect in Modal"
      isOpen
    >
      <ModalHeader
        title="CreatableSelect in modal"
        titleId="creatable-select-in-modal"
        onRequestClose={handleRequestClose}
      />
      <ModalBody>
        <CreatableSelect
          isClearable
          modal
          options={options}
          onChange={handleChange}
          onInputChange={handleInputChange}
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
};
