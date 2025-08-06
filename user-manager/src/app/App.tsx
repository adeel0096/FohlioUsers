import { ApolloProvider } from '@apollo/client';
import '../App.css';
import { client } from './providers/apollo/client';
import { Users } from '../pages/users';
import { useEffect, useState } from 'react';
import { worker } from '../mocks/browser';
import { App as AntApp, theme } from 'antd';
import { Header } from '../shared/ui/Header';

function App() {
  const [mswReady, setMswReady] = useState(false);
  const { token } = theme.useToken();

  // Start MSW worker when the App mounts
  useEffect(() => {
    worker.start({serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'warn',
  }).then(() => setMswReady(true));
  }, []);

  if(!mswReady) {
    return <div>Starting MSW...</div>
  }

  return (
    <ApolloProvider client={client}>
      <AntApp>
        <div style={{ backgroundColor: token.colorBgContainer }} className='h-[100vh] w-[100vw]'>
          <Header />
          <div className='h-[85%] w-full'>
            <Users />
          </div>
        </div>
      </AntApp>
    </ApolloProvider>
  );
}

export default App;
