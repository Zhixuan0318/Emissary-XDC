/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Drawer from '@mui/material/Drawer';
import { DialogContentText, Divider, IconButton, InputBase, Paper } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { Props } from '../../src/utils/types'; 


const Index: React.FC<Props> = ({ connected, address }) => {

    const router = useRouter()

    return (
        <>
            <div className='semi-header'>
                <Link href="/nft_redemption">
                    <p className='transfer-btn'><ArrowCircleLeftOutlinedIcon className='icon-btn' />NFT Redemption</p>
                </Link>
            </div>
            <Divider />
            <div className='flex-center mt-40'>
                <div className='nft-item-wrap'>
                    <img className='nft-img' src='/assets/img/nft-img.png' alt="" />
                    <p className='font-14 text-color-black inter-font font-bold'>XDC Hackathon 2023</p>
                    <p className='text-underline text-color-grey font-12 inter-font'>5D25...oePo</p>
                    <p className='font-14 text-color-black inter-font '>An NFT Collection for the participants of our XDC Global Hackathon 2023</p>
                    <Button className='pink-btn w-100'>Mint</Button>
                </div>
            </div>
        </>
    );
}

export default Index
