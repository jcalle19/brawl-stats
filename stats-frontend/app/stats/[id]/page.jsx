import React from 'react'
import StatsPage from '@/components/statsPage.jsx'

const page = async ({params}) => {
    const id = process.env.TEST_ID; //params;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${id}/battlelog`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    const data = await result.json();
    console.log(data);
    return (
        <StatsPage data={data}/>
  )
}

export default page