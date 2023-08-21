import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import SideBar from '../src/components/Sidebar';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router' 
import { apiHost } from '../src/utils/constant';
import axios from 'axios';
import getSubdomain from '../src/utils/get-subdomain';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi'
import { xdc, xdcTestnet } from 'wagmi/chains'
import { getAccount } from '@wagmi/core' 

const chains = [xdc, xdcTestnet]
const projectId = '67287d78cea43c6732eab8a171f5840d'
const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
    webSocketPublicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const Main = styled('main', {})<{}>(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
}));

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const account: any = getAccount()
    const [side, setSide] = React.useState(false)
    const [role, setRole] = useState('Client')
    const [emissary, setEmissary] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [connected, setConnected] = useState(false)
    const [address, setAddress] = useState("")
    const [trig, setTrig] = useState(false)

    useEffect(() => {
        if ((account.address && account.address != "") || trig) {
            const domain = window.location.hostname
            const sub_domain = getSubdomain(domain)
            setConnected(true)
            setAddress(account.address)
            setSubdomain(sub_domain)
            getEmissary(sub_domain, account.address)
        }
    }, [account, trig])

    const getEmissaryByName = async (domain: string) => {
        const res = await axios.get(apiHost + 'emissary/name/' + domain)
    }

    const openSide = () => {
        setSide(!side)
    }

    const selectTab = (tab: number) => {

    }

    const getEmissary = async (sub_domain: string, address: string) => {
        try {
            const res = await axios.get(apiHost + 'emissary/name/' + sub_domain)
            setEmissary(res.data._id);
            const controller = res.data.controllers;
            var role = 'Client';
            controller.map((c: any) => {
                if (c['address'] == address) {
                    role = 'Controller'
                }
            })
            setRole(role)
        } catch (e) {

        }
    }

    const connectedWallet = (m: boolean) => {
        setTrig(m)
    }

    return (
        <Main className='main-body'>
            <WagmiConfig config={wagmiConfig}>
                {
                    router.pathname == "/" || router.pathname == "/connect_wallet" || router.pathname == "/emissary_create" ?
                        <Grid container spacing={0} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='body-wrap' >
                                <Component
                                    emissary={emissary}
                                    subdomain={subdomain}
                                    side={side}
                                    role={role}
                                    connected={connected}
                                    address={address}
                                    {...pageProps}
                                    connectWallet={(m: any) => connectedWallet(m)}
                                />
                            </Grid>
                        </Grid> :
                        <Grid container spacing={0} >
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={2} className='side-bar'>
                                <SideBar
                                    emissary={emissary}
                                    subdomain={subdomain}
                                    selectTab={(i: number) => selectTab(i)}
                                    role={role}
                                    connected={connected}
                                    address={address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={9} xl={10} className='body-wrap' >
                                <Component
                                    emissary={emissary}
                                    subdomain={subdomain}
                                    side={side}
                                    role={role}
                                    connected={connected}
                                    address={address}
                                    {...pageProps}
                                />
                            </Grid>
                        </Grid>
                }
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </Main>
    );
}


