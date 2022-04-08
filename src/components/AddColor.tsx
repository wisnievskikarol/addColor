import React from 'react'

const HEX_LENGTH = 7;

type MyProps = {
      updateColorsList: Function;
    };
    type MyState = {
      color: string; // like this
      messageToggle : boolean
      messageText : string
    };
type StatusTypes = "Good" | "Slow Down" | "Stuck";

    class AddColor extends React.Component<MyProps, MyState> {
      state: MyState = {
        color: "",
        messageToggle : true,
        messageText : ""
      };


      validHEXinput = (HEX : string | null ) => {
           
            if(HEX != null && HEX.length === HEX_LENGTH ) {
                  let countHash = 0
                  for(var i=0; i<HEX.length;i++) {
                        if (HEX[i] === "#") countHash++;
                    }  
                  if(countHash !== 1) {
                        return "Invalid number of hashes"
                  }

                  for(let i = 1 ; i < HEX.length ; i++) {
                        if((HEX[i] < '0' || HEX[i] > '9') && (HEX[i] < 'A' || HEX[i] > 'F') && (HEX[i] < 'a' || HEX[i] > 'f')  ) {
                              return "invalid characters";
                        }
                  }
                  return "correct";

            }
            return "Incorrect length" ;
      }

      handleSubmit  = ( e: React.FormEvent<HTMLFormElement>)=> {
            e.preventDefault();
            const saved : string | null  = this.state.color;
            const validationResponse : string = this.validHEXinput(saved);

            if(saved && validationResponse === "correct"){
                  let temp = localStorage.getItem("colors")
                  let storedColors : Array<string> | null = temp ? JSON.parse(temp) :  JSON.parse("[]"); 
                  storedColors?.push(saved)
                  console.log(storedColors)
                  localStorage.setItem('colors', JSON.stringify(storedColors));
                  this.setState({messageToggle:  false , messageText : "" })
                  this.props.updateColorsList()
            }else {
                  this.setState({messageToggle:  true , messageText : validationResponse})
            }

      }

      handleChange = (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({color:  e.currentTarget.value })
        }

      render() {
        return (
          <form className="margin-y-10 AddColor-container" onSubmit={this.handleSubmit} noValidate={true}>
            <p>{this.state.messageToggle && this.state.messageText}</p>
            <input  onChange= {this.handleChange} value = {this.state.color}/>
            <button
              type="submit"
              className="btn margin-y-10"
            >Add</button>
          </form>
        );
      }
    }
    export default AddColor;