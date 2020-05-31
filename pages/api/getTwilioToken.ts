import twilio from 'twilio';
import { NowRequest, NowResponse } from '@now/node';

const { AccessToken } = twilio.jwt;

export default (req: NowRequest, res: NowResponse) => {
  const accessToken = new AccessToken(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN,
    process.env.TWILIO_SECRET,
    { identity: req.query.identity as string }
  );

  const grant = new AccessToken.VideoGrant({ room: req.query.room as string });
  accessToken.addGrant(grant);

  res.json({ jwt: accessToken.toJwt() });
};
