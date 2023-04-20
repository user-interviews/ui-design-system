import React, { useState } from 'react';

import AsyncCreatableSelect from 'src/Select/AsyncCreatableSelect';
import Button from 'src/Button';
import FormGroup from 'src/FormGroup';
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

  if (!search || !search.length) {
    return options;
  }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => {
  const handleChange = () => {
  };
  const handleInputChange = () => {
  };

  return (
    <FormGroup
      label="Default async creatable select"
      labelHtmlFor="default-async-creatable-select"
    >
      <AsyncCreatableSelect
        getOptionLabel={({ label }) => label}
        getOptionValue={({ value }) => value}
        inputId="default-async-creatable-select"
        isClearable
        loadOptions={loadOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
    </FormGroup>
  );
};

export const InModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRequestClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
      <Modal
        ariaHideApp={false}
        className="AsyncCreatableSelectInModal"
        contentLabel="AsyncCreatableSelect in Modal"
        isOpen={isOpen}
      >
        <ModalHeader
          title="In Modal AsyncCreatable select"
          titleId="in-modal-async-creatable-select"
          onRequestClose={handleRequestClose}
        />
        <ModalBody>
          <FormGroup
            helperText="Select menu is able to overflow the Modal container"
            label="In Modal AsyncCreatable select"
            labelHtmlFor="in-modal-creatable-select"
          >
            <AsyncCreatableSelect
              getOptionLabel={({ label }) => label}
              getOptionValue={({ value }) => value}
              inputId="in-modal-creatable-select"
              loadOptions={loadOptions}
              modal
              noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter
          dismissButtonText="Cancel"
          onRequestClose={handleRequestClose}
        >
          <Button type="submit" variant="primary">Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
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
      title="In Modal AsyncCreatable select"
      titleId="in-modal-async-creatable-select"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <FormGroup
        helperText="Select menu is able to overflow the Modal container"
        label="In Modal AsyncCreatable select"
        labelHtmlFor="in-modal-creatable-select"
      >
        <AsyncCreatableSelect
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          inputId="in-modal-creatable-select"
          loadOptions={loadOptions}
          modal
          noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
        />
      </FormGroup>
    </ModalBody>
    <ModalFooter
      dismissButtonText="Cancel"
      onRequestClose={handleRequestClose}
    >
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
  );
