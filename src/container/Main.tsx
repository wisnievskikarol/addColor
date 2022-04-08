import React , {useEffect, useState} from 'react'
import AddColor from '../components/AddColor'
import {hexToHSL} from '../components/hexToHSL'
import ColorElement from "../components/ColorElement";
import "../styles/MainStyle.scss"

const Main = () => {

      const PredefinedColors : string[]  = ["#fcba03" , "#07bdfa" , "#fa0768" ]
      const  [filteredData , setFilteredData] = useState<Array<string>>([])
      const [localStorageData , setLocalStorageData] = useState<Array<string>>([])

      useEffect ( ()=> {
            updateColorsList()
      }, [])

        const sortColors = (data : Array<string>) => {
          let clonedArray = JSON.parse(JSON.stringify(data))

              for (let k = 0; k < clonedArray.length ; k++){
                  for (let s = 0; s < clonedArray.length ; s++){

                      let redCon = parseInt(clonedArray[k][1] + clonedArray[k][2], 16 ) >  parseInt(clonedArray[s][1] + clonedArray[s][2], 16 )
                      let greenCon = parseInt(clonedArray[k][3] + clonedArray[k][4], 16 ) >  parseInt(clonedArray[s][3] + clonedArray[s][4], 16 )
                      let orangeCon = parseInt(clonedArray[k][5] + clonedArray[k][6], 16 ) >  parseInt(clonedArray[s][5] + clonedArray[s][6], 16 )
                      if(redCon) {
                        swapValue(clonedArray, k ,s)
                      }else if(redCon && greenCon ) {
                        swapValue(clonedArray, k ,s)
                      }
                      else if(redCon && greenCon && orangeCon) {
                        swapValue(clonedArray, k ,s)
                      }
                  }
            }
          return clonedArray
    }
    const swapValue = (arr : Array<string> , first : number , second : number) => {
          let temp =  JSON.parse(JSON.stringify(arr[first])) ;
          arr[first] = arr[second]
          arr[second] = temp
    }

      const updateColorsList = () => {
            let temp = localStorage.getItem("colors")
            let res = temp ? JSON.parse(temp) :  JSON.parse("[]")
            let setValue;
            if(res.find((element: string)  => element === PredefinedColors[0] || element === PredefinedColors[1] || element === PredefinedColors[2] ) === undefined) {
                setValue = sortColors(PredefinedColors.concat(res))
            }else {
                setValue = sortColors(res)
            }
          setLocalStorageData(setValue);
          setFilteredData( setValue)
      }

      const handleRemove = (id : number) => {
          let temp = localStorageData;
          temp.splice(id, 1);
          localStorage.setItem('colors', JSON.stringify(temp));
          updateColorsList()
      }

      const filterColors = (data : Array<string> , option : string) => {
          let resp;
        switch (option) {
            case "Red" : resp = data.filter((el) => {
                let hexString = el[1] + el[2]
                return parseInt(hexString, 16 ) > 127
            })
                break
            case "Green" : resp =   data.filter((el) => {
                let hexString = el[3] + el[4]
                return parseInt(hexString, 16 ) > 127
            })
                break
            case "Blue" :resp =   data.filter((el) => {
                let hexString = el[5] + el[6]
                return parseInt(hexString, 16 ) > 127
            })
                break
            case "Saturation" :resp =   data.filter((el) => {
                const HSL = hexToHSL(el)
                return HSL != null && HSL > 50
            })
                break
            default : resp = localStorageData
                break
      }
      if(resp) {
          setFilteredData(resp)
      }

      }

  return (
    <div className={"main-container"}>
        <div>
        <select onChange={(event => filterColors(localStorageData ,event.currentTarget.value) )}>
            <option >All</option>
            <option >Red</option>
            <option >Green</option>
            <option >Blue</option>
            <option >Saturation</option>
        </select>
          <AddColor updateColorsList = {updateColorsList}/>
        </div>
        <div className={"main-color-elements"}>
          {filteredData.map((el,index) => {
              let inPredefinedColors = PredefinedColors.find((arr) => arr === el)
              return <ColorElement key = {index}  removeFunction={handleRemove} index={index}  HEX={el} deleteDisabled={inPredefinedColors ? true : false} />
          })}
        </div>
    </div>
  )
}

export default Main