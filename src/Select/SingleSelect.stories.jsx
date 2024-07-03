import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

import Button from 'src/Button';
import FormGroup from 'src/FormGroup';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'src/Modal';
import SingleSelect from 'src/Select/SingleSelect';

import Option from './Option';
import OptionWithDescription from './OptionWithDescription';
import ValueContainer from './ValueContainer';

const onChange = () => action('Change');

export default {
  title: 'Components/Selects/Single',
  component: SingleSelect,
};

const options = [
  {
    label: '1-on-1 interview',
    value: 1,
    description: 'Interviews are typically a conversation between you and a researcher.',
  },
  {
    label: 'Focus group',
    value: 2,
    description: 'Focus groups involve interacting with a small group of your peers.',
  },
  {
    label: 'Multi-day study',
    value: 3,
    description: 'Diary and multiday studies are days or weeks long commitments.',
  },
  {
    label: 'Unmoderated task',
    value: 4,
    description: 'An unmoderated task is just that—an opportunity for a user to try out a product, app, website, etc and share feedback.',
  },
];

const peopleOptions = [
  { label: 'Riley Researcher', value: 5 },
  { label: 'Mickey Moderator', value: 6 },
  { label: 'Connie Collaborator', value: 7 },
  { label: 'Ozzy Observer', value: 8 },
];

export const Default = () => (
  <FormGroup
    label="Default select"
    labelHtmlFor="default-select"
  >
    <SingleSelect inputId="default-select" options={options} onChange={onChange} />
  </FormGroup>
);

export const Searchable = () => (
  <FormGroup
    label="Searchable select"
    labelHtmlFor="searchable-select"
  >
    <SingleSelect
      closeMenuOnScroll={false}
      inputId="searchable-select"
      isSearchable
      options={options}
      placeholder="Search or select..."
      onChange={onChange}
    />
  </FormGroup>
);

export const Loading = () => (
  <FormGroup
    label="Loading select"
    labelHtmlFor="loading-select"
  >
    <SingleSelect inputId="loading-select" isLoading options={options} onChange={onChange} />
  </FormGroup>
);

export const MultipleSelect = () => (
  <FormGroup
    label="Multiple select"
    labelHtmlFor="multi-select"
  >
    <SingleSelect
      inputId="multi-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </FormGroup>
);

export const MultipleSelectBorderedPill = () => (
  <FormGroup
    label="Multiple select bordered pill"
    labelHtmlFor="multi-select-bordered-pill"
  >
    <SingleSelect
      borderedMultiValue
      inputId="multi-select-bordered-pill"
      isMulti
      options={peopleOptions}
      onChange={onChange}
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
        className="SelectInModal"
        contentLabel="Select in Modal"
        isOpen={isOpen}
      >
        <ModalHeader
          title="Select in modal"
          titleId="select-in-modal"
          onRequestClose={handleRequestClose}
        />
        <ModalBody>
          <FormGroup
            helperText="Select menu is able to overflow the Modal container"
            label="In Modal select"
            labelHtmlFor="in-modal-select"
          >
            <SingleSelect
              inputId="in-modal-select"
              modal
              options={options}
              onChange={onChange}
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

export const GroupedOptions = () => {
  const groupedOptions = [
    {
      label: 'Study type',
      options,
    },
    {
      label: 'Audience type',
      options: [
        { label: 'Consumers', value: 5 },
        { label: 'Professionals', value: 6 },
      ],
    },
  ];
  return (
    <FormGroup
      label="Grouped options"
      labelHtmlFor="grouped-options-select"
    >
      <SingleSelect
        inputId="grouped-options-select"
        options={groupedOptions}
        onChange={onChange}
      />
    </FormGroup>
  );
};

export const CustomOptionWithDescriptionAndCheckbox = () => (
  <FormGroup
    label="Custom Option with Description And Checkbox"
    labelHtmlFor="custom-option-with-description-and-checkbox-select"
  >
    <SingleSelect
      components={{
        Option: ({ ...props }) => (
          <Option
            {...props}
            boldLabel
            // eslint-disable-next-line react/prop-types
            description={props.data.description}
          />
        ),
      }}
      inputId="custom-option-with-description-select"
      options={options}
      onChange={onChange}
    />
  </FormGroup>
);

/**
  If you're adding a new code, prefer the use of `Option` with a `description` prop.
  `OptionWithDescription` is effectively deprecated and will be merged into `Option`.
 */
export const CustomOptionWithDescription = () => {
  const optionsWithDescriptions = [
    {
 label: 'Org Admin', value: 1, description: 'Short description of role capabilities', labelDescription: '(Full access)',
},
    {
 label: 'Administrator', value: 2, description: 'Short description of role capabilities', labelDescription: '(Full access)',
},
    {
 label: 'Researcher', value: 3, description: 'Short description of role capabilities', labelDescription: '(Standard access)',
},
    {
 label: 'Teammate', value: 4, description: 'Short description of role capabilities', labelDescription: '(Limited access)',
},
  ];

  return (
    <FormGroup
      label="Custom Option with Description"
      labelHtmlFor="custom-option-with-description-select"
    >
      <SingleSelect
        components={{
          Option: (props) => (
            <OptionWithDescription
              {...props}
            />
          ),
        }}
        inputId="custom-option-with-description-select"
        options={optionsWithDescriptions}
        onChange={onChange}
      />
    </FormGroup>
  );
};

export const CustomOptionWithCheckbox = () => (
  <FormGroup
    label="Custom Option with Checkbox"
    labelHtmlFor="custom-option-with-checkbox-select"
  >
    <SingleSelect
      closeMenuOnSelect={false}
      components={{ Option }}
      hideSelectedOptions={false}
      inputId="custom-option-with-checkbox-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </FormGroup>
);

export const SearchableCustomOptionWithCheckbox = () => (
  <FormGroup
    label="Searchable Custom Option with Checkbox"
    labelHtmlFor="searchable-custom-option-with-checkbox-select"
  >
    <SingleSelect
      closeMenuOnSelect={false}
      components={{ Option }}
      hideSelectedOptions={false}
      inputId="searchable-custom-option-with-checkbox-select"
      isMulti
      isSearchable
      options={options}
      onChange={onChange}
    />
  </FormGroup>
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
    <FormGroup
      label="Custom Option with Indeterminate Checkbox"
      labelHtmlFor="custom-option-with-indeterminate-checkbox"
    >
      <SingleSelect
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
        inputId="custom-option-with-indeterminate-checkbox"
        isMulti
        options={optionsArr}
        onChange={onChange}
      />
    </FormGroup>
  );
};

export const CustomValueContainer = () => (
  <FormGroup
    label="Custom Value Container"
    labelHtmlFor="custom-value-container-select"
  >
    <SingleSelect
      closeMenuOnSelect={false}
      components={{
        Option,
        ValueContainer: (props) => (
          <ValueContainer
            {...props}
                /* eslint-disable react/prop-types */
            valueText={`participant${props.getValue().length > 1 ? 's' : ''} selected`}
          />
        ),
      }}
      hideSelectedOptions={false}
      inputId="custom-value-container-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </FormGroup>
);
