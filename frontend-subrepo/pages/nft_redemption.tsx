/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Divider } from '@mui/material';
import NFTItem from '../src/components/NFTItem';
import { getAccount } from '@wagmi/core'
import { Props } from '../src/utils/types';

const list = [1]

const Index: React.FC<Props> = ({ role, emissary, address, connected }) => {

    const router = useRouter()
    const { id } = router.query
    const [load, setLoad] = useState(false);
    const account: any = getAccount()

    return (
        <>
            <div className='semi-header'>
                <p className='transfer-btn' >NFT Redemption</p>
            </div>
            <Divider />
            <div className='semi-body'>
                <div className='list-sect'>
                    {
                        list.map((item, index) => {
                            return (
                                <NFTItem key={index} amount={123} address={'1zf5g...tsxxwq'} hashDate={'Created on 30 Jun 2023'} byDate={'XDC Hackathon 2023'} by={'Chameleon'} id={'915942594164'} />
                            )
                        })
                    }
                </div>
                {/* <div className='text-center'>
                    <img src='/assets/img/noitem.png' alt=""/>
                    <p className='font-14 text-color-grey'>There are no NFT for you to redeem currently...</p>
                </div> */}
            </div>
        </>
    );
}

export default Index
