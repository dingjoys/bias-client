import { createContext } from 'react';
import { useAccount, useConnect, useDisconnect, useSigner, useProvider } from 'wagmi';

type WalletProps = Pick<ReturnType<typeof useAccount>, 'address' | 'status'>;
type Connect = ReturnType<typeof useConnect>['connect'];
type Disconnect = ReturnType<typeof useDisconnect>['disconnect'];
type Signer = ReturnType<typeof useSigner>['data'];
type Provider = ReturnType<typeof useProvider>;

export interface IWalletContext extends WalletProps {
    isConnected: boolean;
    connect: Connect;
    connectAsync: (args?: any) => Promise<any>
    disconnect: Disconnect;
    signer: Signer,
    provider: Provider,
    chainId: string



}

export const WalletContext = createContext<IWalletContext | null>(null);
