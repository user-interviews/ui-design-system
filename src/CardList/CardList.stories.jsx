import React from 'react';

import Card, { CardSizes } from 'src/Card';
import CardList from 'src/CardList';
import { withKnobs, select } from '@storybook/addon-knobs';
import mdx from './CardList.mdx';

export default {
  title: 'Components/CardList',
  decorators: [withKnobs],
  component: CardList,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <CardList>
      <Card
        size={select('Card Size', Object.values(CardSizes), CardSizes.SMALL)}
        subTitle="The fastest way to recruit research participants.
        Source from a pool of more than 850,000 participants to reach nearly any target audience."
        title="Card 1"
      >
        <ul>
          <li>500,000+ sessions completed</li>
          <li>$19 million+ incentives distributed</li>
          <li>3 hours median time to 1st matched participant</li>
        </ul>
      </Card>
      <Card
        size={select('Card Size', Object.values(CardSizes), CardSizes.SMALL)}
        subTitle="The fastest way to recruit research participants.
        Source from a pool of more than 850,000 participants to reach nearly any target audience."
        title="Card 2"
      >
        <ul>
          <li>500,000+ sessions completed</li>
          <li>$19 million+ incentives distributed</li>
          <li>3 hours median time to 1st matched participant</li>
        </ul>
      </Card>
      <Card
        size={select('Card Size', Object.values(CardSizes), CardSizes.SMALL)}
        subTitle="The fastest way to recruit research participants.
        Source from a pool of more than 850,000 participants to reach nearly any target audience."
        title="Card 3"
      >
        <ul>
          <li>500,000+ sessions completed</li>
          <li>$19 million+ incentives distributed</li>
          <li>3 hours median time to 1st matched participant</li>
        </ul>
      </Card>
    </CardList>
  </>
);
