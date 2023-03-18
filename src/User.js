import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './User.css'

function User() {
    const {id} = useParams()
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [dataA, setDataA] = useState([]);
    const [dataC, setDataC] = useState([]);
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visitedN, setVisitedN]=useState([])
    const [visitedID, setVisitedID]=useState([])
 

    const fetchMoreFriends = async (id) => {
        const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/12`);
        const newData = await response.json();
        const newDataList=newData.list;
        setFriends(prevData => [...prevData, ...newDataList]);
        setIsLoading(false);
        
    }
    useEffect(() => {
        const handleScroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading) {
            setIsLoading(true);
            setPage(prevPage => prevPage + 1);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [isLoading]);

    useEffect(() => {
        setFriends([]);
        setPage(1)
        const fetchData = async (id) => {
            const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`);
            const newData = await response.json();
            setData(newData);
            setDataA(newData.address);
            setDataC(newData.company);
            const newDataName=newData.prefix+' '+newData.name+' '+newData.lastName;
            if(!visitedID.includes(newData.id)){
            setVisitedID(prevData =>[...prevData, newData.id])
            setVisitedN(prevData =>[...prevData, newDataName])}
        }
        fetchData(id);
        const fetchFriends = async (id) => {
            
            const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/12`);
            const newData = await response.json();
            const newDataList=newData.list;
            
            setFriends(newDataList);
            setIsLoading(false);

           
            
        }
      
        fetchFriends(id);
        
        
      }, [id]);

      useEffect(()=>{
        if(page!==1)fetchMoreFriends(id);
      },[page])

  return (
    <div>
        <div className='container'>
            <div className='header-wrapper'>
                <div className='header'>
                    <img src={data.imageUrl} alt={`${data.name} `+`${data.lastName}` }></img>
                        <fieldset className='left-info'>
                            <legend>Info</legend>
                            <div><strong>{data.prefix} {data.name} {data.lastName}</strong></div>
                            <div><i>{data.title}</i></div>
                            <br></br>
                            <div><span>Email</span>: {data.email}</div>
                            <div><span>Ip Address</span>: {data.ip}</div>
                            <div><span>Ip Address</span>: {data.ip}</div>
                            <div><span>Job Area</span>: {data.jobArea}</div>
                            <div><span>Job Type</span>: {data.jobType}</div>
                        </fieldset>
                        <fieldset className='right-info'>
                            <legend>Address</legend>
                            <div><strong>{dataC.name}</strong></div>
                            <div><i>{data.title}</i></div>
                            <br></br>
                            <div><span>City</span>: {dataA.city}</div>
                            <div><span>Country</span>: {dataA.country}</div>
                            <div><span>State</span>: {dataA.state}</div>
                            <div><span>Street Address</span>: {dataA.streetAddress}</div>
                            <div><span>ZIP</span>: {dataA.zipCode}</div>
                        </fieldset>
                        
                </div>
                <div>
                    <div className='bred'>
                        {visitedN.map((item, index)=> (  <React.Fragment key={item}>
                            <Link to={{ pathname: `/User/${visitedID[index]}`, state: { myProp: item }}}>{item} </Link>
                            {index < visitedN.length - 1 && <span>&nbsp; &gt; &nbsp; </span>}
                            </React.Fragment>))}
                    </div>
                    <h2>Friends:</h2>
                </div>
                <div className='users'>
                    <div className='list'>
                        {friends.map(item => (
                        <div className='list-item' key={item.id}>
                            <div className='list-item-content'>
                            <Link to={{ pathname: `/User/${item.id}`, state: { myProp: item }}}><img src={item.imageUrl} alt={`${item.name} `+`${item.lastName}` }></img></Link>
                            <div className='list-item-content-descr'>
                                <strong>{item.prefix} {item.name} {item.lastName} {Number(item.id)} </strong>
                            </div>
                            <div className='list-item-content-descr'>{item.title}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                    {isLoading && <p>Loading...</p>}

                </div>
            </div>
        </div>    
    </div>

  )
}

export default User