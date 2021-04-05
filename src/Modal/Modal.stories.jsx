import React from 'react';
import { action } from '@storybook/addon-actions';
import Input from 'src/Input';
import {
 Modal, ModalBody, ModalFooter, ModalHeader,
} from 'src/Modal';
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

const handleRequestClose = () => action('Close');

export const Default = () => (
  <Modal
    ariaHideApp={false}
    className="DefaultModal"
    contentLabel="Default Modal"
    isOpen
    size="small"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Save</button>
    </ModalFooter>
  </Modal>
);

export const MediumModal = () => (
  <Modal
    ariaHideApp={false}
    className="MediumModal"
    contentLabel="Medium Modal"
    isOpen
    size="medium"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Save</button>
    </ModalFooter>
  </Modal>
);

export const LargeModal = () => (
  <Modal
    ariaHideApp={false}
    className="LargeModal"
    contentLabel="Large Modal"
    isOpen
    size="large"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Save</button>
    </ModalFooter>
  </Modal>
);

export const WithSubtitleModal = () => (
  <Modal
    ariaHideApp={false}
    className="WithSubtitleModal"
    contentLabel="With Subtitle Modal"
    isOpen
    size="small"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Save</button>
    </ModalFooter>
  </Modal>
);

export const TransactionalModal = () => (
  <Modal
    ariaHideApp={false}
    className="TransactionalModal"
    contentLabel="Transactional Modal"
    isOpen
    size="small"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-success" type="submit">Invite</button>
    </ModalFooter>
  </Modal>
);

export const WarningModal = () => (
  <Modal
    ariaHideApp={false}
    className="WarningModal"
    contentLabel="Warning Modal"
    isOpen
    size="small"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-outline-danger" type="submit">Delete</button>
    </ModalFooter>
  </Modal>
);

export const DangerModal = () => (
  <Modal
    ariaHideApp={false}
    className="DangerModal"
    contentLabel="Danger Modal"
    isOpen
    size="small"
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
      <button className="btn btn-light" type="button">Cancel</button>
      <button className="btn btn-outline-danger" type="submit">Delete</button>
    </ModalFooter>
  </Modal>
);
