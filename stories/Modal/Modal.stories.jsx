import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

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

export const BaseModal = () => (
  <Modal
    className="BaseModal"
    contentLabel="Base Modal"
    isOpen={true}
    size="small"
  >
    <ModalHeader
      title="Base modal"
      titleId="base-modal"
      onRequestClose={true}
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
  >
    <ModalHeader
      title="Transactional modal"
      titleId="transactional-modal"
      onRequestClose={true}
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
  >
    <ModalHeader
      title="Warning modal"
      titleId="warning-modal"
      onRequestClose={true}
    />
    <ModalBody>
      <p>Are you sure you want to do this?</p>
    </ModalBody>
    <ModalFooter >
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-danger">Invite</button>
    </ModalFooter>
  </Modal>
);

