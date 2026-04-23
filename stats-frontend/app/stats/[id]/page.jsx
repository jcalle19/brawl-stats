import React from 'react'
import StatsPage from '@/components/statsPage.jsx'

const page = async ({params}) => {
    const id = process.env.TEST_ID; //params;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${process.env.TEST_ID}/battlelog`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    console.log(await result.json());
    return (
        <StatsPage data={id}/>
  )
}

export default page