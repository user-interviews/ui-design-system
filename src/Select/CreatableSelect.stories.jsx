import React, { useState } from 'react';

import Button from 'src/Button';
import CreatableSelect from 'src/Select/CreatableSelect';
import FormGroup from 'src/FormGroup';
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
  const handleChange = () => {
  };
  const handleInputChange = () => {
  };

  return (
    <FormGroup
      label="Default creatable select"
      labelHtmlFor="default-creatable-select"
    >
      <CreatableSelect
        inputId="default-creatable-select"
        isClearable
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
    </FormGroup>
  );
};

export const InModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
  };
  const handleInputChange = () => {
  };
  const handleRequestClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
      <Modal
        ariaHideApp={false}
        className="CreatableSelectInModal"
        contentLabel="CreatableSelect in Modal"
        isOpen={isOpen}
      >
        <ModalHeader
          title="In Modal creatable select"
          titleId="in-modal-creatable-select"
          onRequestClose={handleRequestClose}
        />
        <ModalBody>
          <FormGroup
            helperText="Select menu is able to overflow the Modal container"
            label="In Modal creatable select"
            labelHtmlFor="in-modal-creatable-select"
          >
            <CreatableSelect
              inputId="in-modal-creatable-select"
              isClearable
              modal
              options={options}
              onChange={handleChange}
              onInputChange={handleInputChange}
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
