/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import Link from 'next/link';
import ProcessItem from '../../src/components/ProcessItem';
import { apiHost } from '../../src/utils/constant';
import axios from 'axios';
import { Requests } from '../../src/utils/types';
import { getAccount } from '@wagmi/core'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    side: boolean,
    role: string,
    emissary: string,
    subdomain: string,
    connected: boolean,
    address: string,
}

const Request: React.FC<Props> = ({ address, connected, role }) => {

    const router = useRouter()
    const account: any = getAccount()
    const { id } = router.query
    const [request, setRequest] = useState<Requests>({
        _id: "",
        emissary: "",
        owner: address,
        name: "",
        program: {
            pid: "",
            program: ""
        },
        amount: {
            amount: "",
            token: ""
        },
        state: "On Hold",
        hash: "",
        created: ""
    })

    useEffect(() => {
        if (id) {
            readRequest(id.toString())
        }
    }, [id])

    const readRequest = async (id: string) => {
        try {
            const res = await axios.get(apiHost + 'request/one/' + id)
            console.log("res", res)
            setRequest(res.data)
        } catch (e) {
        }
    }

    const payout = async () => {
        try {
            const config = await prepareSendTransaction({
                to: request.owner,
                value: parseEther(request.amount.amount)
            })
            const { hash } = await sendTransaction(config)
            const res = await axios.post(apiHost + 'request/payout', { _id: request._id, hash, state: 'Paid' })
            if (res.status == 201) {
                toast.success("Approved Successfully!", { position: 'top-right' })
                var rq = request;
                rq.hash = hash;
                rq.state = 'Paid';
                setRequest({ ...rq })
            } else {
                toast.error("Approve Failed!", { position: 'top-right' })
            }
        } catch (e) {
            toast.error("Approve Failed!", { position: 'top-right' })
        }
    }

    return (
        <>
            <div className='semi-header'>
                <Link href="/request">
                    <p className='transfer-btn'><ArrowCircleLeftOutlinedIcon className='icon-btn' />Transfer Requests</p>
                </Link>
            </div>
            <Divider />
            <div className='semi-body'>
                <div className='filter-sect'>
                    <div className=''>
                        <p className='m0 number-pink'>Transfer Request</p>
                        <p className='m0 number-pink-big mt-10'> #{request._id.length > 0 && request._id.substring(12, 24)}</p>
                        <p className='m0 item-hash mt-15'>Created on {request.created}</p>
                    </div>
                    <Button variant="outlined" className='trans-pink-btn'>{request.state}</Button>
                </div>
                <Divider className='mt-15' />
                <div className='inputs-wrap mt-30'>
                    <div className='flex-start custom-input mt-10'>
                        <p className='mp0 input-title'>Applier</p>
                        <input value={request.owner} readOnly />
                    </div>
                    <div className='flex-start custom-input mt-10'>
                        <p className='mp0 input-title'>Program</p>
                        <input value={request.program.program} readOnly />
                    </div>
                    <div className='flex-start custom-input mt-10'>
                        <p className='mp0 input-title'>Project Name</p>
                        <input value={request.name} readOnly />
                    </div>
                    <div className='flex-start mt-10'>
                        <div className='flex-start custom-input  '>
                            <p className='mp0 input-title'>Requested Amount</p>
                            <input className='pink-text' value={request.amount.amount + " " + request.amount.token} readOnly />
                        </div>
                        {
                            (request.state == 'Approved' && role == 'Controller') && <Button variant="outlined" className='pink-btn-outline ml-10 no-wrap' onClick={() => payout()}>Process Payout</Button>
                        }
                        {
                            request.state == 'Paid' &&
                            <Link href={'https://apothem.blocksscan.io/tx/' + request.hash} target="_blank" passHref>
                                <div className='ml-10 text-underline pink-text font-14 no-wrap'>View Transfer Memo</div>
                            </Link>
                        }
                    </div>
                </div>
                <div className='tax-wrap mt-30'>
                    <p className='part-title'>Tax Documents</p>
                    <div className='tax-form flex-start'>
                        <TaskOutlinedIcon className=' mr-10' />
                        <p className='pink-text'> form_w8.pdf</p>
                    </div>
                </div>
                <Divider className='mt-30' />
                <div className='process-wrap mt-30'>
                    <p className='part-title'>Processing Timestamp</p>
                    <ProcessItem address='8Eo3...KAFL' state1='APPROVED' state2='PAID' byDate='1/7/2023, 11:25:01am' />
                </div>

            </div >
            <Toaster />
        </>
    );
}

export default Request
