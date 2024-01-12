import React, { useEffect, useState } from 'react'
import "./Job.css"

const Job = ({ jobs, loading, Error }) => {

  const [startIndex, setStartIndex] = useState(0)
  const [changebuttonStatus, setChangeButtonStatus] = useState(false)
  const [pageOneButton, setPageOneButton] = useState(false)

  const currentjobs = jobs.slice(startIndex, startIndex + 4)

  function changeJobs() {
    setStartIndex(startIndex + 4)
  }

  function pageOne() {
    location.reload()
  }


  useEffect(() => {
    if (startIndex == 56) {
      setChangeButtonStatus(true)
      setPageOneButton(true)
    }
  }, [startIndex])
  
  return (
    <div>
        {loading && <p className='loading_msg'>Fetching your data...</p>}
          {currentjobs.map((item) => {
              const date = new Date(item.time * 1000)

              const year = date.getFullYear();
              const month = date.getMonth() + 1; // Months are zero-based, so add 1
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();

              const formatteddate = `${day}/${month}/${year}`
              const formattedtime = `${hours}:${minutes}:${seconds}`

            return (
              <div className='job_list_list'>
                  <li className='job_lists'>
                        {item.title}
                        <div className='job_details'>
                            <p>By: {item.by}</p>
                            <p className='job_date'>{formatteddate}</p>
                            <p className='job_time'>{formattedtime}</p>
                        </div>
                        
                  </li>
              </div>
              )
            })}
      <button className='load_more_button' onClick={changeJobs} disabled={changebuttonStatus}>Load More jobs</button>
      {pageOneButton && <button className='head_to_pageone_button' onClick={pageOne}>Head to page One</button>}
      {Error && <p className='error_msg'>Error 404</p>}
    </div>
  )
}

export default Job
