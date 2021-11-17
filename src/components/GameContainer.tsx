import React, { FC } from 'react';

const Container: FC = ({ children }) => {
  return (
    <section className="nes-container with-title">
      <h3 className="title">Let&apos;s play</h3>
      {children}
    </section>
  );
};

export default Container;
