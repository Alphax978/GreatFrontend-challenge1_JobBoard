import React, { useEffect, useState } from 'react'
import "./Board.css"
import Job from "../components/Job/Job"

const Board = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, isLoading] = useState(true)
    const [errorMsg, isErrorMsg] = useState(false)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const totalJobId = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
                const totalJobIdres = await totalJobId.json()
    
                const totaljobpromise = totalJobIdres.map(async (item) => {
                    const totaljobs = await fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
                    return await totaljobs.json()
                    
                })

                const totaljobslist = await Promise.all(totaljobpromise)
                setJobs(totaljobslist)
                
            }
            catch (err) {
                console.log(err)
                if (err) {
                    isErrorMsg(true)
                }
            }
            finally {
                isLoading(false)
            }
            
        }
        fetchJobs()

    },[])

  
    
  return (
      <div>
          <Job jobs={jobs} loading={loading} Error = {errorMsg} />
         
    </div>
  )
}

export default Board
