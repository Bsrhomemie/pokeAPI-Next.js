export const TypePokenmon = (type:string)  =>  {
  switch(type) { 
    case 'fighting': { 
      return({
        color: '#CE416B'
      })
    } 
    case 'flying': { 
      return({
        color: '#A2BCEA'
      })
    } 
    case 'poison': { 
      return({
        color: '#AA6BC8'
      })
    } 
    case 'ground': { 
      return({
        color: '#D97845'
      })
    } 
    case 'rock': { 
      return({
        color: '#C5B78C'
      })
    } 
    case 'bug': { 
      return({
        color: '#91C12F'
      })
    } 
    case 'ghost': { 
      return({
        color: '#5269AD'
      })
    } 
    case 'steel': { 
      return({
        color: '#5A8EA2'
      })
    } 
    case 'fire': { 
      return({
        color: '#F39741'
      })
    } 
    case 'water': { 
      return({
        color: '#4493DC'
      })
    } 
    case 'grass': { 
      return({
        color: '#63BC5D'
      })
    } 
    case 'electric': { 
      return({
        color: '#F4D23B'
      })
    } 
    case 'psychic': { 
      return({
        color: '#F27079'
      })
    } 
    case 'ice': { 
      return({
        color: '#73CEC0'
      })
    } 
    case 'dragon': { 
      return({
        color: '#376EC3'
      })
    } 
    case 'dark': { 
      return({
        color: '#5A5465'
      })
    } 
    case 'fairy': { 
      return({
        color: '#EC8FE6'
      })
    }
    case 'unknown': { 
      return({
        color: '#68A090'
      })
    } 
    case 'shadow': { 
      return({
        color: '#999999'
      })
    } 
    default: { 
      return({
        color: '#9EA19F'
      })
    } 
   } 
  }