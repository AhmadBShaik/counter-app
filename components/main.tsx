import React, { useEffect, useState } from 'react'
import { load } from '../src/func'

interface Response{
    negative: number
    words: number[]
    length:number
    red: null | number
}

const Main: React.FunctionComponent = () => {
    
    const [currentCount,setCurrentCount] = useState<number|null>(null)
    const [currentAccount, setCurrentAccount] = useState(); 

    useEffect(() => {  
        load().then(e => {
            console.log("Account : ", e.accountAddress)
            setCurrentAccount(e.accountAddress)
            console.log(e.counterContract)
            const a = (e.counterContract.getCount().then((e:any)=> e))
            
            a.then((e:Response) => console.log(setCurrentCount(e.words[0])))
        })
    },[currentCount])
    
    return (
        <>
            <div className='flex'>
                <div className='m-auto'>{currentAccount}</div>
            </div>
        
            <div className='flex flex-col mt-10'>
                
                <div className='m-auto p-5 font-bold text-2xl text-orange-600'>
                {currentCount}
                </div>
                <div className='flex'>
                <div className="m-auto">
                    <button 
                        className='bg-red-400 text-white p-2 font-bold rounded-lg m-2'
                        onClick={
                            () => {
                                load().then(
                                    e => {
                                        e.counterContract.decrement({from:e.accountAddress})
                                        const a = (e.counterContract.getCount().then((e:any)=> e))
            
                                        a.then((e:Response) => console.log(setCurrentCount(e.words[0])))
                            
                                    }
                                )
                            }
                        }>
                        decrement
                    </button>

                    <button className='bg-green-400 text-white p-2 font-bold rounded-lg m-2'
                     onClick={
                        () => {
                            load().then(
                                e => {
                                    e.counterContract.increment({from:e.accountAddress})
                                    const a = (e.counterContract.getCount().then((e:any)=> e))
        
                                    a.then((e:Response) => console.log(setCurrentCount(e.words[0])))
                        
                                }
                            )
                        }
                    }>increment</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default Main;