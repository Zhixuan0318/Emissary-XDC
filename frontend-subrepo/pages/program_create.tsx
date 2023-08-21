/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import { Divider, IconButton, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Link from 'next/link';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { apiHost, networkList } from '../src/utils/constant';
import axios from 'axios';
import * as nftlogoLottie from '../public/assets/lottie/nftlogo.json';
import * as HDFCLottie from '../public/assets/lottie/HDFC.json';
import Lottie from 'react-lottie';
import ImageUploading from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import { getAccount } from '@wagmi/core'
import { Props } from '../src/utils/types';

const nftlogo = {
    loop: true,
    autoplay: true,
    animationData: nftlogoLottie,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const hdfc = {
    loop: true,
    autoplay: true,
    animationData: HDFCLottie,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}; 

const getCurrentDate = () => {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = String(today.getFullYear()).slice(-2);
    var currentDate = day + '.' + month + '.' + year;
    return currentDate;
} 

const Request: React.FC<Props> = ({ role, emissary, connected, address }) => {

    const router = useRouter()
    const [step, setStep] = useState(0)
    const account: any = getAccount()

    const [name, setName] = useState("")
    const [program, setProgram] = useState(false)
    const [contract_p, setContract_p] = useState("")
    const [network_p, setNetwork_p] = useState("XDC Apothem Testnet");
    const [redemption, setRedemption] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [symbol, setSymbol] = useState("")
    const [network_r, setNetwork_r] = useState('Moonbeam')
    const [img, setImg] = useState("")
    const [submission, setSubmission] = useState(false)
    const [contract_s, setContract_s] = useState("")
    const [network_s, setNetwork_s] = useState("XDC Apothem Testnet");
    const [amount, setAmount] = useState('0')

    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList: any, addUpdateIndex: any) => {
        setImg(imageList[0].data_url);
    };

    const handleNetwork = (event: SelectChangeEvent, n: number) => {
        const v = event.target.value
        if (n == 1) {
            setNetwork_p(v)
        } else if (n == 2) {
            setNetwork_r(v)
        } else {
            setNetwork_s(v)
        }
    };

    const createProgram = async () => {
        try {
            setStep(1)
            setTimeout(async () => {
                const data = {
                    name,
                    owner: address,
                    emissary,
                    program: {
                        program,
                        contract_p,
                        network_p
                    },
                    redemption: {
                        redemption,
                        title,
                        desc,
                        symbol,
                        network_r,
                        img
                    },
                    submission: {
                        submission,
                        contract_s,
                        network_s,
                        amount
                    },
                    created: getCurrentDate()
                }
                const res = await axios.post(apiHost + "program", data)
                if (res.status == 201) {
                    toast.success("Created Successfully!", { position: 'top-right' })
                } else {
                    toast.error("Create Failed!", { position: 'top-right' })
                }
                setStep(2)
            }, 4000)

        } catch (e) {
            setStep(0)
            toast.error("Error occured!", { position: 'top-right' })
        }
    }

    return (
        <>
            {
                step == 0 &&
                <>
                    <div className='semi-header'>
                        <Link href="/programs">
                            <p className='transfer-btn'><ArrowCircleLeftOutlinedIcon className='icon-btn' />Programs</p>
                        </Link>
                    </div>
                    <Divider />
                    <div className='semi-body'>
                        <div className='filter-sect'>
                            <div className=''>
                                <p className=' number-pink-big mt-10'>Create programs</p>
                            </div>
                        </div>
                        <div className='diag-input-item'>
                            <p className='p-diag-titles'>Program name</p>
                            <input className='pol-input' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='diag-input-item'>
                            <div>
                                <p className='p-diag-titles'>
                                    <label className='custom-check'>
                                        <input type="checkbox" onChange={(e) => setProgram(e.target.checked)} checked={program} />
                                        <span>Set as token-gated (NFT) program</span>
                                    </label>
                                </p>
                                <p className='processing-stamp w-600 ml-25 font-12'>Only certain NFT holder can create a transfer request of this program. You can perfectly restrict clients who are not related to this program to create a transfer request.</p>
                            </div>
                            <div className='item-wrap ml-25 mt-15'>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>NFT contract address</p>
                                    <input className='pol-input' value={contract_p} onChange={(e) => setContract_p(e.target.value)} />
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Select a network</p>
                                    <Select
                                        value={network_p}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='sel-asset'
                                        onChange={(e) => handleNetwork(e, 1)}
                                    >
                                        {
                                            networkList.map((n) => {
                                                return (
                                                    <MenuItem key={n + "-1"} className='sel-item' value={n}>{n}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className='diag-input-item'>
                            <div>
                                <p className='p-diag-titles'>
                                    <label className='custom-check'>
                                        <input type="checkbox" onChange={(e) => setRedemption(e.target.checked)} checked={redemption} />
                                        <span>Setup NFT redemption</span>
                                    </label>
                                </p>
                                <p className='processing-stamp w-600 ml-25 font-12'>By enabling this, you can create an NFT collection for this program. If your client create a transfer request for this program and successfully get paid, they can go to the NFT redemption tab to claim their NFT. Perfect for event related programs! </p>
                            </div>
                            <div className='item-wrap ml-25 mt-15'>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Title</p>
                                    <input className='pol-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <p className='processing-stamp font-12 m-0-3'>This is the name of your NFT collection</p>
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Description</p>
                                    <input className='pol-input' value={desc} onChange={(e) => setDesc(e.target.value)} />
                                    <p className='processing-stamp font-12 m-0-3'>Briefly describe what is your NFT collection is about</p>
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Symbol</p>
                                    <input className='pol-input' placeholder='Example: PYTHON' value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                                    <p className='processing-stamp font-12 m-0-3'>The symbol for the NFT collection</p>
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Network</p>
                                    <p className='processing-stamp font-12 m-0-3'>Select a XDC or Kusama Parachain to deploy your NFT collection</p>
                                    <div className='pro-network mt-20'>
                                        <img className='' src='/assets/img/moonbeam.png' alt="" />
                                    </div>
                                </div>
                                <div className='diag-input-item flex-start-top'>
                                    <div>
                                        <p className='p-diag-titles'>NFT Image</p>
                                        <p className='processing-stamp font-12 m-0-3 mr-10'> Upload your NFT media. Supporting JPEG, PNG and GIF. Maximum size is 100 MB.</p>
                                    </div>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                        }) => (
                                            <div className="upload__image-wrapper">
                                                {
                                                    img == "" && <Button className='grey-btn p-50-100 mt-20'><AddCircleOutlineOutlinedIcon className='font-30' onClick={onImageUpload} /></Button>
                                                }
                                                {
                                                    img != "" &&
                                                    <div className="image-item">
                                                        <img src={img} alt="" width="200" onClick={() => onImageUpdate(0)} />
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Final Check</p>
                                    <p className='processing-stamp font-12 '>Please ensure all the inputs and info are correct before publishing this course. As once the NFT contract is deployed, it cant be changed anymore.</p>
                                    <input className='pol-input' />
                                    <p className='processing-stamp font-12 m-0-3'>Type your title of NFT collection again to confirm the final check.</p>
                                </div>
                            </div>
                        </div>
                        <div className='diag-input-item'>
                            <div>
                                <p className='p-diag-titles'>
                                    <label className='custom-check'>
                                        <input type="checkbox" onChange={(e) => setSubmission(e.target.checked)} checked={submission} />
                                        <span>Setup NFT Auto Request Submission</span>
                                    </label>
                                </p>
                                <p className='processing-stamp w-600 ml-25 font-12'>By enabling this, you can bond an NFT collection to this program. When your client is an holder of this NFT collection and creating a transfer request, he/she can choose to use Auto Request Submission where all the info of the transfer request will automatically fill in for him/her. Perfect to a program where the amount of transfer request is the same!</p>
                            </div>
                            <div className='item-wrap ml-25 mt-15'>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>NFT contract address</p>
                                    <input className='pol-input' value={contract_s} onChange={(e) => setContract_s(e.target.value)} />
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Select a network</p>
                                    <Select
                                        value={network_s}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='sel-asset'
                                        onChange={(e) => handleNetwork(e, 3)}
                                    >
                                        {
                                            networkList.map((n) => {
                                                return (
                                                    <MenuItem key={n + "-3"} className='sel-item' value={n}>{n}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className='diag-input-item'>
                                    <p className='p-diag-titles'>Request amount</p>
                                    <input className='pol-input' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <Divider className='mt-40' />
                        <div className='btn-group-start mt-30'>
                            <Button variant="outlined" className='pink-btn-outline mr-10'>Clear</Button>
                            <Button variant="outlined" className='pink-btn' onClick={() => createProgram()}>Submit</Button>
                        </div>
                    </div>
                </>
            }
            {
                step == 1 &&
                <div className='text-center mt-60'>
                    <Lottie options={nftlogo}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false} />
                    <p className='pink-text unbound-font font-24'>Creating your NFT collection...</p>
                    <p className='text-color-grey font-14 unbound-font'>
                        Process with the gas fee in order to deploy your NFT smart contract. Do not close the window during this process
                    </p>
                </div>
            }
            {
                step == 2 &&
                <div className='text-center mt-60'>
                    <Lottie options={hdfc}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false} />
                    <p className='pink-text unbound-font font-24'>NFT collection for this program is ready to mint!</p>
                    <p className='text-color-grey font-14 unbound-font'>
                        The smart contract of your NFT collection had successfully deployed. Any info can be checked using the address below.
                    </p>
                    <Link href="">
                        <Button className='grey-btn'><span className='pink-text text-underline'>0x0f7ac266c8e003a3ef71ca56222bbff48d5e97c166ad4d5ef54e05288d86fa0a</span></Button>
                    </Link>
                    <p>
                        <Link href="/programs">
                            <Button className='pink-btn'>Redirect <ArrowCircleRightOutlinedIcon className='font-30 mr-5 ml-5' /> Programs</Button>
                        </Link>
                    </p>

                </div>
            }

            <Toaster />
        </>
    );
}

export default Request
