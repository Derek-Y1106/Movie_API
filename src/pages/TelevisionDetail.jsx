import React, { useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import HomeButton from '../components/HomeButton';
import '@splidejs/splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

function TelevisionDetail() {
  
  const param=useParams();
  const [Detail,setDetail]=useState([]);
  const [Video,setVideo]=useState([]);
  

  const getDetail= async()=>{
    const API = await fetch(`https://api.themoviedb.org/3/tv/${param.id}?api_key=${process.env.REACT_APP_MOVIE_API}`);
    const data= await API.json();
    setDetail(data);
};
const getVideo= async()=>{
  const API = await fetch(`https://api.themoviedb.org/3/tv/${param.id}/videos?api_key=${process.env.REACT_APP_MOVIE_API}`);
  const data= await API.json();
  setVideo(data.results);
  console.log(data.results)
};

useEffect(() => {
  getDetail();
  getVideo();
}, []);


  return (
    <div>
      <div className='detail_cover x_between'>
          <img src={"https://image.tmdb.org/t/p/w400/" + Detail.poster_path} alt="" />
          <div className="detail_right">
            <h1>{Detail.title}</h1>
            <p>Average Score: {Detail.vote_average} /10</p>
            <p>Release Date: {Detail.release_date}</p>
            <p>Movie Overview: </p>
            <p>{Detail.overview} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus perferendis, modi magnam molestias perspiciatis placeat atque dolore, possimus, odio provident nesciunt. Numquam, corporis dolore tempora, magni recusandae illo minima perferendis aspernatur veniam exercitationem ratione rerum voluptatibus itaque illum possimus. Error eveniet repudiandae, amet incidunt beatae mollitia. Praesentium a explicabo consequatur tempora ipsa perspiciatis consequuntur id. Qui laborum dolorum quam mollitia illo neque molestias quod culpa. Fugiat dignissimos corporis nesciunt eos placeat beatae tempore quia minima quis modi? Enim nulla iusto perferendis omnis ex ipsa doloribus, soluta est nisi velit, hic beatae non nobis, at eos laborum debitis atque. Ut, optio.</p>
            <div className='button_bottom'><HomeButton/></div>
          </div>
      </div>

      <div className="video_slider">
      <h1>Related Videos</h1>
      <Splide options={{
        perPage: Math.min(Video.length,3),
        perMove: 2,
        arrows: true,
        pagination: true,
        gap: "5em",
        autoplay:"playing",
        type:"loop"
      }} >

        {Video.map(video => {
          return (
            <SplideSlide key={video.id}>
              <iframe width="700" height="450" className='YouTube' title='YouTube' src={"https://www.youtube.com/embed/"+video.key+"?controls=0"} frameBorder="0"></iframe>
            </SplideSlide>
          );
        })}

      </Splide>
      </div>
    </div>
  )
}

export default TelevisionDetail