import React from 'react';
import { useRouter } from 'next/router';

const MessageThread = () => {
  const { query } = useRouter();
  const { id } = query;

  return <div> {id} </div>;
};

export default MessageThread;
