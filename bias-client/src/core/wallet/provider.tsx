import { useMemo } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork, useProvider, useSigner } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { WalletContext } from './context';
import type { IWalletContext } from './context';

interface Props {
    children?: React.ReactNode;
}
export default function WalletProvider(props: Props) {
    const { children } = props;
    const contextValue = useWalletContextValue();

    return <WalletContext.Provider value={ contextValue }>{ children }</WalletContext.Provider>

}

function useWalletContextValue(): IWalletContext {
    const { address, isConnected, status } = useAccount();
    const { connect ,connectAsync } = useConnect({ connector: new InjectedConnector() });

    const provider = useProvider()
    const { data: signer } = useSigner()

    const { chain } = useNetwork()
    const chainId = useMemo(() => {
        return chain && '0x' + chain?.id.toString(16)
    }, [chain])

    const { disconnect } = useDisconnect({
        onError(error) {
            console.log('disconnect Error', error)
          },
    });

    return useMemo(
        () => ({
            address,
            isConnected,
            connectAsync,
            status,
            connect,
            disconnect,
            signer,
            provider,
            chainId
        }),
        [address, isConnected, connect, disconnect, connectAsync, status, chainId, signer, provider],
    );
}
