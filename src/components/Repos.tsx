import React,{ChangeEvent,KeyboardEvent, FC, useState} from 'react'
import { IDetails,IRepos } from './interfaces';
import '../App.css';

const Repos:FC = () => {

    const [user,setUser] = useState("");
    const [data,setData] = useState<IDetails>();
    //const [URL,setUrl] = useState<string|undefined>("");
    const [details,setDetails] = useState<IRepos[]>([]);

    const headers = {
        'Authorization': "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"
    };

    const fetchData = async () =>{
        const response = await fetch(`https://api.github.com/users/${user}`,{
            method: "GET",
            headers: headers
        });
        const resData = await response.json();
        setData(resData);
    }

    const fetchDetails = async () =>{
        const response = await fetch(`https://api.github.com/users/${user}/repos`,{
            method:'GET'
        });
        //console.log(response);
        const resData = await response.json();
        setDetails(resData);
        console.log(resData);
    }

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setUser(e.target.value);
    }

    const keyHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if(e.key==='Enter'){
            fetchData();
            fetchDetails();
            setUser("");
        }
    }
  return (
    <>
    {/* {
        !data?.avatar_url ? (
             <div className='Icontain'>
                <label className='wrapper'>
       <input type='text' className='input' onChange={changeHandler} onKeyDown={keyHandler} value={user} placeholder='Search Github' />
        <span className='placeholder'>Search Github</span>
        </label>
           </div>
        ):null
    } */}
    <div className='Icontain'>
                <label className='wrapper'>
       <input type='text' className='input' onChange={changeHandler} onKeyDown={keyHandler} value={user} placeholder='Search Github' />
        <span className='placeholder'>Search Github</span>
        </label>
           </div>
           <br/><br/>
    
    {
        data?.avatar_url ? (
            <div className='container'>
             <img src={data?.avatar_url} alt='avatar' height={150} width={150}/>
            <h1>{data?.name}</h1>
             <h3>Username: <strong className='uname'>{data?.login}</strong></h3>
            </div>
        ):null
    }
    
    
    {
    details.length>0 ?(
    <div className='main'>
    {
        details.map((items,index)=>(
            <div key={index} className='gContainer'>
                <h3>{items.name}</h3>
                {
                    items.description ? (
                        <h4 className='desc'>{items.description}</h4>
                    ):null
                }
                
                {items.language ? (
                   <h5>Language: {items.language}</h5>
                 ) : null}
                <h4 className='btn'><a className='link' href={items.clone_url} target='__blank' rel="noopener noreferrer">View</a></h4>
            </div>
        )
        )
    }
    </div>):null
}
</>
  )
}


export default Repos;