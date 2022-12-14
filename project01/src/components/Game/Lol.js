import '../../styles/Game.css'

const Lol = ({lolSet, setLolTier, lolTier, lolPosition, setLolPosition}) => {

  let lolT = [];
  let lolP = [];
  
  for(var i=0; i<lolSet.length; i++){
    if(lolSet[i].game_section === '포지션'){
      lolP.push(lolSet[i].game_detail)
    }else if(lolSet[i].game_section === '티어'){
      lolT.push(lolSet[i].game_detail)
    }
  }

  const lolSelectD = (e) => {
    if(e.target.checked === true){
      e.target.parentNode.style.backgroundColor = 'rgba(128, 0, 128, 0.051)'
      setLolTier([...lolTier, e.target.value])
    }else if(e.target.checked === false){
      lolTier.splice(lolTier.indexOf(e.target.value), 1)
      e.target.parentNode.style.backgroundColor = 'rgb(250, 250, 250)'
      setLolTier([...lolTier])
    }
  }

  const lolSelectP = (e) => {
    if(e.target.checked === true){
      e.target.parentNode.style.backgroundColor = 'rgba(128, 0, 128, 0.051)'
      setLolPosition([...lolPosition, e.target.value])
    }else if(e.target.checked === false){
      lolPosition.splice(lolPosition.indexOf(e.target.value), 1)
      e.target.parentNode.style.backgroundColor = 'rgb(250, 250, 250)'
      setLolPosition([...lolPosition])
    }
  }
  
  console.log(lolTier)
  console.log(lolPosition)


  const lolTList = lolT.map((item, idx)=>
            (<label id='fBtn' key={item+idx}>
              {item}
            <input id='settingCb' type='checkbox' value={item} onClick={lolSelectD}/></label>))

  const lolPList = lolP.map((item, idx)=>
            (<label id='fBtn' key={item+idx}>
              {item}
            <input id='settingCb' type='checkbox' value={item} onClick={lolSelectP}/></label>))


  return (
    <div>
      <div className='gameBox'>
        <ul id='fSpanBox'>
          <li>
            <span id='fSpan'>티어</span>
              <div id='fList'>
                {lolTList}
              </div>
          </li>
          <li>
            <span id='fSpan'>포지션</span>
            <div id='fList'>
              {lolPList}
            </div>
          </li>
        </ul>
      </div>  
    </div>
  )
}

export default Lol