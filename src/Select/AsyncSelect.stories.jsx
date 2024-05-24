import React, { useState } from 'react';

import AsyncSelect from 'src/Select/AsyncSelect';
import Button from 'src/Button';
import FormGroup from 'src/FormGroup';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'src/Modal';

import Option from './Option';

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

  if (!search || !search.length) {
    return options;
  }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => (
  <FormGroup
    label="Default AsyncSelect"
    labelHtmlFor="default-async-select"
  >
    <AsyncSelect
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      inputId="default-async-select"
      loadOptions={loadOptions}
      noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
    />
  </FormGroup>
);

export const InModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRequestClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
      <Modal
        ariaHideApp={false}
        className="AsyncSelectInModal"
        contentLabel="AsyncSelect in Modal"
        isOpen={isOpen}
      >
        <ModalHeader
          title="In Modal AsyncSelect"
          titleId="in-modal-async-select"
          onRequestClose={handleRequestClose}
        />
        <ModalBody>
          <FormGroup
            helperText="Select menu is able to overflow the Modal container"
            label="In Modal async select"
            labelHtmlFor="in-modal-async-select"
          >
            <AsyncSelect
              getOptionLabel={({ label }) => label}
              getOptionValue={({ value }) => value}
              inputId="in-modal-async-select"
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

export const MultiSelect = () => (
  <FormGroup
    label="Async MultiSelect"
    labelHtmlFor="async-multiselect"
  >
    <AsyncSelect
      cacheOptions
      closeMenuOnSelect={false}
      components={{ Option }}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      inputId="async-multiselect"
      isClearable
      isMulti
      loadOptions={loadOptions}
      noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
    />
  </FormGroup>
);
