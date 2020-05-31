import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import faker from 'faker';
import axios from 'axios';

export interface IGlobalContext {
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  token: string;
  getToken: (roomName: string) => Promise<string>;
}

export const GlobalContext = createContext<IGlobalContext>(null);

export const GlobalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeSinkId, setActiveSinkId] = useState('default');
  const [token, setToken] = useState(null);

  const getToken = async (roomName: string) => {
    const { data } = await axios.get(
      `/api/getTwilioToken?identity=${faker.name.findName()}&room=${roomName}`
    );
    setToken(data.jwt);
    return data.jwt;
  };

  return (
    <GlobalContext.Provider
      value={{
        activeSinkId,
        setActiveSinkId,
        token,
        getToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
