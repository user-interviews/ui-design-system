import React from 'react';

import { useState } from '@storybook/addons';
import NavTabs from './NavTabs';
import NavTab from './NavTab';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
  subcomponents: { NavTab },
};

export const Default = () => {
  const [selected, setSelected] = useState(0);

  const handleTabClick = (ev) => {
    setSelected(ev.target.id);
  };
  return (
    <NavTabs>
      <NavTab id="1" selected={selected === '1'} onClick={handleTabClick}>Basic details</NavTab>
      <NavTab id="2" selected={selected === '2'} onClick={handleTabClick}>Professional details</NavTab>
      <NavTab id="3" selected={selected === '3'} onClick={handleTabClick}>Technical details</NavTab>
      <NavTab id="4" selected={selected === '4'} onClick={handleTabClick}>Security</NavTab>
    </NavTabs>
  );
};

export const Column = () => {
  const [selected, setSelected] = useState(0);

  const handleTabClick = (ev) => {
    setSelected(ev.target.id);
  };

  return (
    <NavTabs orientation="column">
      <NavTab id="1" orientation="column" selected={selected === '1'} onClick={handleTabClick}>Basic details</NavTab>
      <NavTab id="2" orientation="column" selected={selected === '2'} onClick={handleTabClick}>Professional details</NavTab>
      <NavTab id="3" orientation="column" selected={selected === '3'} onClick={handleTabClick}>Technical details</NavTab>
      <NavTab id="4" orientation="column" selected={selected === '4'} onClick={handleTabClick}>Security</NavTab>
    </NavTabs>
  );
};
