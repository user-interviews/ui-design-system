import React from 'react';
import { action } from '@storybook/addon-actions';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'src/Modal';
import mdx from './Modal.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Design System/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const handleRequestClose = () => action('Close')

export const BaseModal = () => (
  <Modal
    className="BaseModal"
    contentLabel="Base Modal"
    isOpen={true}
    size="small"
    ariaHideApp={false}
  >
    <ModalHeader
      title="Base modal"
      titleId="base-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-light">Cancel</button>
      <button className="btn btn-success">Save</button>
    </ModalFooter>
  </Modal>
);

export const WithSubtitleModal = () => (
  <Modal
    className="WithSubtitleModal"
    contentLabel="With Subtitle Modal"
    isOpen={true}
    size="small"
    ariaHideApp={false}
  >
    <ModalHeader
      title="With subtitle modal"
      titleId="with-subtitle-modal"
      subtitle="A subtitle to provide more information"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>Some content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-light">Cancel</button>
      <button className="btn btn-success">Save</button>
    </ModalFooter>
  </Modal>
);

export const TransactionalModal = () => (
  <Modal
    className="TransactionalModal"
    contentLabel="Transactional Modal"
    isOpen={true}
    size="small"
    ariaHideApp={false}
  >
    <ModalHeader
      title="Transactional modal"
      titleId="transactional-modal"
      onRequestClose={handleRequestClose}
    />
    <ModalBody>
      <p>The user needs to take action here.</p>
      <input placeholder="Email"></input>
    </ModalBody>
    <ModalFooter >
      <button className="btn btn-light">Cancel</button>
      <button className="btn btn-success">Invite</button>
    </ModalFooter>
  </Modal>
);

export const WarningModal = () => (
  <Modal
    className="WarningModal"
    contentLabel="Warning Modal"
    isOpen={true}
    size="small"
    ariaHideApp={false}
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
    <ModalFooter >
      <button className="btn btn-light">Cancel</button>
      <button className="btn btn-outline-danger">Delete</button>
    </ModalFooter>
  </Modal>
);

export const DangerModal = () => (
  <Modal
    className="DangerModal"
    contentLabel="Danger Modal"
    isOpen={true}
    size="small"
    ariaHideApp={false}
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
    <ModalFooter >
      <button className="btn btn-light">Cancel</button>
      <button className="btn btn-outline-danger">Delete</button>
    </ModalFooter>
  </Modal>
);