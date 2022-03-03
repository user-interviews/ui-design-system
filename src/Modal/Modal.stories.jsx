import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from 'src/Button';
import Input from 'src/Input';
import {
 Modal, ModalBody, ModalFooter, ModalHeader, MODAL_SIZES,
} from 'src/Modal';
import mdx from './Modal.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const handleRequestClose = () => action('Close');

export const Default = () => (
  <Modal
    ariaHideApp={false}
    className="DefaultModal"
    contentLabel="Default Modal"
    isOpen
  >
    <ModalHeader
      title="Default modal"
      titleId="default-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
);

export const MediumModal = () => (
  <Modal
    ariaHideApp={false}
    className="MediumModal"
    contentLabel="Medium Modal"
    isOpen
    size={MODAL_SIZES.MEDIUM}
  >
    <ModalHeader
      title="Medium modal"
      titleId="medium-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
);

export const LargeModal = () => (
  <Modal
    ariaHideApp={false}
    className="LargeModal"
    contentLabel="Large Modal"
    isOpen
    size={MODAL_SIZES.LARGE}
  >
    <ModalHeader
      title="Large modal"
      titleId="large-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
);

export const WithSubtitleModal = () => (
  <Modal
    ariaHideApp={false}
    className="WithSubtitleModal"
    contentLabel="With Subtitle Modal"
    isOpen
  >
    <ModalHeader
      subtitle="A subtitle to provide more information"
      title="With subtitle modal"
      titleId="with-subtitle-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button type="submit" variant="primary">Confirm</Button>
    </ModalFooter>
  </Modal>
);

export const TransactionalModal = () => (
  <Modal
    ariaHideApp={false}
    className="TransactionalModal"
    contentLabel="Transactional Modal"
    isOpen
  >
    <ModalHeader
      title="Transactional modal"
      titleId="transactional-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>The user needs to take action here.</p>
      <Input id="Email" name="Email" placeholder="Email" type="text" />
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button type="submit" variant="primary">Invite</Button>
    </ModalFooter>
  </Modal>
);

export const WarningModal = () => (
  <Modal
    ariaHideApp={false}
    className="WarningModal"
    contentLabel="Warning Modal"
    isOpen
  >
    <ModalHeader
      title="Warning modal"
      titleId="warning-modal"
      variant="warning"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Are you sure you want to do this?</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button size="md" variant="warning">Edit</Button>
    </ModalFooter>
  </Modal>
);

export const DangerModal = () => (
  <Modal
    ariaHideApp={false}
    className="DangerModal"
    contentLabel="Danger Modal"
    isOpen
  >
    <ModalHeader
      title="Danger modal"
      titleId="danger-modal"
      variant="danger"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Are you sure you want to do this?</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="transparent">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </ModalFooter>
  </Modal>
);
