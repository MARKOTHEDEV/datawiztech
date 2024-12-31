import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import '../src/components/Upload/UploadDataTable.css';


import data from "./data";

const TestApp = ()=>{

    const {
        register,
        handleSubmit,
        watch,
        control,
        setError,
        setValue,
        formState: { errors },
      } = useForm({defaultValues:{tableList:[]}});

      
      const fieldsData = watch();
      const [heading,setHeaders] = useState([])
      const { fields, append, } = useFieldArray({control,name:'tableList'})
      useEffect(()=>{
        data.data_by_country.map((d,index)=>{
            const eachDataKeys= Object.keys(d)
            console.log(eachDataKeys)
            setHeaders(eachDataKeys)
            eachDataKeys.map(eachKey=>{
            setValue(`tableList.${index}.${eachKey}`,d[eachKey])
                
            })
        })

        const dataPositions =Object.keys(data.error_data)
        dataPositions.map((position,index)=>{
            let errorKeys = Object.keys(data.error_data[position])
            errorKeys.map(errorKey=>{
                
                setError(`tableList.${position}.${errorKey}`,{message:errorKey})
            })
        })
      },[])
    //   console.log({errors})
    return (
        <div>
            
<h2>My Basic Table</h2>

<div>
    
</div>


<div>
    <div className="container-fluid upload-table-box p-lg-5 p-3">
        <div  className="upload-data-table-container">
                <div className="upload-data-table-content">
              
                <table >
  <tr>
    {
        heading.map(d=><th style={{'padding':'1rem'}}>{d}</th>)
    }
  </tr>
  {
    fieldsData.tableList.map((fieldsD,eachHeadIndex)=>{
        // const 
        return (
            <tr>
                {
                    heading.map((eachHead,)=>{
                        let isError = false
                        try{
                            isError =  errors?.tableList[eachHeadIndex][eachHead]
                        }catch(e){
                            isError=false
                        }
                        return (
                            <td style={{borderBottom:'1px solid #E0E0E0',padding:'1.188rem 0'}}>
                            {/* <p>{isError?JSON.stringify(b):'gg  '}</p> */}
                            <input
                            style={isError?{border:'1px solid red',padding:' .5rem'}:{padding:'.5rem',border:'transparent'}}
                            {...register(`tableList.${eachHeadIndex}.${eachHead}`)} 
                            />
                            </td>
                        )
                    })
                }
            
    
          </tr>
        )
    })
  }
                </table>
                </div>
        </div>

    </div>
</div>

        </div>
    )
}

export default TestApp