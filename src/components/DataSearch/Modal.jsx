
import removeRange from '../../assets/images/group-7-mD3.png';
import { IoMdCheckmarkCircle } from "react-icons/io";

const CustomModal =({open,children,head,bodyText=null,handleClose=()=>{},modalStyle={}})=>{
    return(
        <div className={`sort-container-overlay ${open ? "open" : ""}`}>

<div className="filter-content container-fluid">
      <div className="">
        <div className="row ">
          <div className="col-lg-4"></div>
          <div
          //  className="col-lg-4"
          style={modalStyle}
          >
            <div className="filter-content-scroll position-relative">
              <div className="filter-container">
                <div class="filter-header">
                  <div className="" style={{'display':'flex',justifyContent:'center'}}>
                    <p class="filter-heading">{head}</p>
                    <p className="filter-cancel-container" onClick={handleClose}>
                      <img
                        // class="filter-cancel-btn"
                        className="img-fluid"
                        style={{'cursor':'pointer'}}
                        src={removeRange}
                        alt=".."
                      />
                    </p>
                  </div>
                  {
                    bodyText?
                    <p class="filter-sub-heading">
                        {bodyText}
                  </p>:''
                  }

                </div>
            {children}
{/* //button */}
                {/* <div class="data-filter-btn mt-4 py-3">Add to cart</div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
</div>

    )
}

export default CustomModal;



export const SuccessModal =({open=false,setOpen,head,body})=>{

  return(
    <CustomModal
   
   head={<span style={{color:'#4eb473'}}>{head}</span>}
      bodyText={''}
      open={open}
      handleClose={()=>{
        setOpen(!open)
      }}
      modalStyle={{width:'600px',}}
   >
    <div>
      <IoMdCheckmarkCircle size={150} style={{'display':'block',margin:'10px auto',color:'#4eb473'}} />
      <p style={{'textAlign':'center',fontSize:'1.5rem'}}>
        {body}
      </p>
    </div>
   </CustomModal>
  )
}