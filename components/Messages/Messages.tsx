import React from 'react';
import Link from 'next/link';
import { Heading, Text } from '@feast-it/pesto';
import Style from './Messages.style';

interface Props {
  threads: Array<{
    uuid: string;
    name: string;
    latestMessage: {
      uuid: string;
      isRead: boolean;
      mine: boolean;
      content: string;
      created: Date;
    };
    booking: {
      timings: {
        date: string;
      };
      total: number;
      covers: number;
      supplierName: string;
    };
  }>;
}

const Messages = ({ threads }: Props) => {
  return (
    <div>
      <h1> Messages </h1>
      {threads?.map(({ uuid, name, latestMessage, booking }) => {
        <Link href={`/messages/${uuid}`}>
          <Style.MessageCard>
            <Style.Info>
              <Heading>{name}</Heading>
              <Style.Meta>
                <span>{booking.timings.date}</span>
                <br />
                <span>{booking.covers} guests</span>
                <br />
                <span> £100 </span>
              </Style.Meta>
            </Style.Info>
            <span>{latestMessage.content}</span>
            <Style.Date>{latestMessage.created}</Style.Date>
          </Style.MessageCard>
        </Link>;
      })}
    </div>
  );
};

export default Messages;
