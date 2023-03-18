import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import User from './User';
export const Main = () => {

const [data, setData] = useState([]);
const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);


const fetchData = async () => {
  const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/16`);
  const newData = await response.json();
  const newDataList = newData.list;

  setData(prevData => [...prevData, ...newDataList]);
  setIsLoading(false);
};

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
  fetchData();
}, [page]);



  return (
    <div className="App">
      <div className='list'>
        {data.map(item => (
          <div className='list-item' key={item.id}>
            <div className='list-item-content'>
              <Link to={{ pathname: `/User/${item.id}`, state: { myProp: item } }}><img src={item.imageUrl} alt={`${item.name} `+`${item.lastName}` }></img></Link>
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
  )
}

export default Main;