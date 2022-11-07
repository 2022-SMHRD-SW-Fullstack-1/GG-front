import React, { useEffect, useState } from 'react'
import '../styles/TeamCheck.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const TeamCheck = () => {

  let {team_seq}  = useParams();

  const [oneTeam, setOneTeam] = useState('');
  const [teamM, setTeamM] = useState('');
  const [teamAge, setTeamAge] = useState([]);
  const [teamTD, setTeamTD] = useState([]);
  const [teamPosition, setTeamPosition] = useState([]);

  useEffect(() => {  
    let url = '/api/teamcheck/'+team_seq
    const config = {"Content-Type": 'application/json'};

    axios.get(url, {},config).then((res)=>{
      setOneTeam(res.data.selectOneTeam);
      setTeamM(res.data.selectTm);
      setTeamAge(JSON.parse(res.data.selectOneTeam.team_age))
      setTeamTD(JSON.parse(res.data.selectOneTeam.team_td))
      setTeamPosition(JSON.parse(res.data.selectOneTeam.team_position))
      console.log(res.data.selectOneTeam);
      console.log(res.data.selectTm);
      console.log(teamAge);
      })
    .catch((error)=>{
      console.log(error)
    })
    }, []
);


  const teamJoinHandle = (event) => {
    event.preventDefault();

    const config = {"Content-Type": 'application/json'};

    axios.post('/api/teamjoin', {
      team_seq : Number(team_seq)
    }, config).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className='plusTeam'>
    <form onSubmit={teamJoinHandle}>
      <ul id="title" align='left'>
          <li><h3><b>{oneTeam.team_name}</b></h3></li>
          <small>팀 상세 조회</small>
      </ul>
      <table width='430px'>
        <tr>
          <td>
            {teamM===oneTeam.team_max?
            <span id='newTeamSpan'><b>모집 완료</b></span>:
            <span id='newTeamSpan'><b>모집 중</b></span>}
          </td>
          <td>{teamM}/{oneTeam.team_max}</td>
        </tr>
        <tr>
            <td><span id='newTeamSpan'><b>방장 닉네임</b></span></td>
            <td>
                {oneTeam.user_id}
            </td>
        </tr>
        <tr>
          <td><span id='newTeamSpan'><b>팀 설명</b></span></td>
          <td colSpan='2'><div border='1px solid black'>{oneTeam.team_content}</div></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span id='newTeamSpan'><b>성별</b></span></td>
          <td>
             <button type='button' className='gender'>{oneTeam.team_gender}</button>
          </td>
        </tr>
        <tr>
          <td><span id='newTeamSpan'><b>연령</b></span></td>
          <td>
              {teamAge.map((item)=>(<button type='button' key={item} className='age'>{item}대</button>))}
          </td>
        </tr>
        <tr>
            <td><span id='newTeamSpan'><b>플레이 게임</b></span></td>
            <td>{oneTeam.team_game}</td>
        </tr>
        <tr>
            <td><span id='newTeamSpan'><b>{oneTeam.team_game==='로스트아크'?'던전':'티어'}</b></span></td>
            <td>
              {teamTD.map((item)=>(<button type='button' key={item} className='tier'>{item}</button>))}
            </td>
        </tr>
        <tr>
            <td><span id='newTeamSpan'><b>포지션</b></span></td>
            <td>
              {teamPosition.map((item)=>(<button type='button' key={item} className='position'>{item}</button>))}
            </td>
        </tr>
        <tr align='center'>
            <td colSpan='2'><input type='submit' value='신청하기' id='subBtn'/></td>
            <td></td>
        </tr>
      </table>
    </form>
    </div>
  )
}

export default TeamCheck