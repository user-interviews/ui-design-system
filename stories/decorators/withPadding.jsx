import React from 'react';

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

export default withPadding;
