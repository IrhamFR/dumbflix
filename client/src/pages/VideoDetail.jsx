import React, { useEffect,useState } from "react";
// import dummyPeaky from '../Images/peakyblindersCard.jfif'
import episode from '../Images/episode1-peaky.jfif'
// import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {API} from '../config/api'
import { useQuery } from "react-query";

function VideoDetail() {
  const title = "Now Watching";
  document.title = "Dumbflix | " + title;

  const [isLogin, setIsLogin] =useState(false)

  // const navigate = useNavigate()
  // const user = (localStorage.getItem('token'))

  // useEffect(() => {
  //   if(user) setIsLogin(true)
  //   else {
  //     setIsLogin(false)
  //     navigate('/')
  //   }
  // }, [user])

  const {id} = useParams()

  let {data : films} = useQuery('detailCache', async () => {
    const response = await API.get('/film/' + id);
    return response.data.data
  })

    return (
      <div className="mb-4">
        <div className="d-flex justify-content-center">
        <iframe
            width="1000"
            height="500"
            src={films?.linkfilm}
            title={films?.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="d-flex justify-content-start sectionMain mt-5 flex-column flex-md-row">
          <div className="card mb-3 bg-black text-white" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={films?.thumbnail} className="img-fluid rounded-start imgDummyDetail" alt="Series" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-2">{films?.title}</h5>
                  <div className="mb-4 mt-2">
                    <small className="text-muted">{films?.year}</small> 
                    <small className='border border-secondary ms-2 px-1 ms-3 py-1 rounded text-muted tv-s shadow'>Movies</small>
                  </div>
                  <p className="card-text pDetailMain">
                  {films?.description}                  
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cardEpisode">
            <iframe
              width="400"
              height="250"
              src={films?.linkfilm}
              title={films?.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <small className="text-light">{films?.titleEpisode}</small>
          </div>
        </div>
      </div>
    );
}

export default VideoDetail;
