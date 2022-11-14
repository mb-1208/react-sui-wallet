import './App.css';
import { ConnectButton, useAccountBalance, useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaQuery from 'react-responsive';

function App() {
  const {
    wallet,
    connected,
    connecting,
    account,
    signAndExecuteTransaction,
  } = useWallet();
  const { balance } = useAccountBalance();

  function uint8arrayToHex(value) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
  }

  async function handleExecuteMoveCall() {
    try {
      const data = {
        packageObjectId: '0x2',
        module: 'devnet_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
          'name',
          'capy',
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
        ],
        gasBudget: 10000,
      };
      const resData = await signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data
        }
      });
      // const resData = await executeMoveCall(data);
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        {!connected && (
          <>
            <h1 className='mb-3'>Connect Your Wallet to <br />Get You Wallet Info!</h1>
            <div className='mb-3'>
              <img src='https://kit.suiet.app/img/logo.svg' width={25} />
              <code className='mx-2 fs-6'>Powered by Suiet Kit</code>
            </div>
            <ConnectButton />
          </>
        )
        }
        <MediaQuery maxWidth={767.9}>
          {connected && (
            <div className='row w-100 px-4'>
              <div className='col-sm-6 card mb-4'>
                <div className='text-black p-4'>
                  <div>
                    <h2 className='pb-2'>Wallet Info</h2>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Provider: {wallet ? wallet.name : 'null'}</p>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Address: {account?.address}</p>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Balance: {balance} SUI</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-6 align-self-center' style={{ textAlign: '-webkit-center' }}>
                <h1 className='mb-3'>Connect Your Wallet to <br />Get You Wallet Info!</h1>
                <div className='mb-3'>
                  <img src='https://kit.suiet.app/img/logo.svg' width={25} />
                  <code className='mx-2 fs-6'>Powered by Suiet Kit</code>
                </div>
                <ConnectButton />
              </div>
            </div>
          )}
        </MediaQuery>

        <MediaQuery minWidth={768}>
          {connected && (
            <div className='row'>
              <div className='col-sm-6 align-self-center' style={{ textAlign: '-webkit-center' }}>
                <h1 className='mb-3'>Connect Your Wallet to <br />Get You Wallet Info!</h1>
                <div className='mb-3'>
                  <img src='https://kit.suiet.app/img/logo.svg' width={25} />
                  <code className='mx-2 fs-6'>Powered by Suiet Kit</code>
                </div>
                <ConnectButton />
              </div>

              <div className='col-sm-6 card'>
                <div className='text-black p-4'>
                  <div>
                    <h2 className='pb-2'>Wallet Info</h2>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Provider: {wallet ? wallet.name : 'null'}</p>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Address: {account?.address}</p>
                    <p className='fs-5' style={{ margin: '0' }}>Wallet Balance: {balance} SUI</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </MediaQuery>
      </div>
    </div>
  );
}

export default App;
