import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import cancel from "../../assets/images/frame-386-N57.png";
import { MdOutlineDelete } from "react-icons/md";
import ActionLoader from "../Loader/ActionLoader";
import { coAuthorsOfArticleApi, updateArticleCoAuhorApi } from "../../api/article.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { decodeUser } from "../../api/api";

const PartnershipTableDropdown = ({ item, currentUser }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
    const { token } = UserAuth();
    // const user_id = decodeUser(token).user_id
  const partnership = [];

  // coAuthorsOfArticleApi

  const {data:coAuthors,isLoading,error,refetch,isRefetching} = useQuery({
    queryFn:()=>coAuthorsOfArticleApi({article_id:item.id}),
    queryKey:['coAuthorsOfArticleApi',item.id],
    refetchInterval:false,
    refetchOnWindowFocus:false,
  })



  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({defaultValues:{coAuthors:[
    // {'email':'me@gmail.com',}
  ]}});
  const { fields, append, remove } = useFieldArray({control,name:'coAuthors'})

  // updateArticleCoAuhorApi
  const client = useQueryClient();
  const [saving,setSaving] = useState(false);
   const {mutate} = useMutation({
    mutationFn:updateArticleCoAuhorApi,
    'onSuccess':(data)=>{
      setSaving(false)
      toast.success("Saved Successfully")
      // setValue('coAuthors',[])
      // route('/upload')
    },
    onError:(error)=>{
      setSaving(false)
      //

        // if(err)
        // console.log({error})
        // if(error.response.data.detail?.includes('does not exist')){
        //   toast.error(error.response.data.detail)
        // }
    }
  })
  
  useEffect(()=>{
    if(coAuthors){
    // console.log({coAuthors})
      // save the owner of the article
      append({
        email:coAuthors.email,
        role:'Author',
        percentage:coAuthors.percentage??0
      })
      const d = coAuthors?.coauthors?.map((coAuthor,index)=>{
        append({
          email:coAuthor.email,
          role:'Co-author',
          percentage:coAuthor.percentage
        })
        // setValue(`coAuthors.${index}.email`,coAuthor.email)
        // setValue(`coAuthors.${index}.role`,'Co-author')
        // setValue(`coAuthors.${index}.percentage`,coAuthor.percentage)
      })
      //

    }
  },[coAuthors])


  const savePartnership =()=>{
    
  const data = getValues();
  const total =   data.coAuthors.map(d=>parseInt(d.percentage)).reduce((partialSum, a) => partialSum + a, 0);
  // console.log({total})
  if(total !== 100){
    toast.error('Percentage Sum Must Be 100%')
    return 
  }

  const user_id = decodeUser(token).user_id
  const form = new FormData();
  form.append('authors_percentage',parseInt(data.coAuthors[0].percentage))
  form.append('coauthors_emails',data.coAuthors.filter(d=>d.role==='Co-author').map(d=>d.email))
  form.append('coauthors_percentage',data.coAuthors.filter(d=>d.role==='Co-author').map(d=>d.percentage))
  const submitD = {
    article_id:item.id,
    form:form
  }
  setSaving(true)
  mutate(submitD)
  // toast.success('Saved')
  }
  // console.log({fields})

  if (isLoading||isRefetching) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
           Loading...
          </div>
          {/* <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div> */}
        </div>
      </div>
    );
  }
  if (saving) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
          Saving...
          </div>
          {/* <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <div className="row mb-2">
        <div className="col-lg-8 d-flex align-items-center my-1">
          {item.product === "Data" && (
            <div className="periodicity-sub-heading">Periodicity:</div>
          )}
          {item.product === "Data" && (
            <div className="partnership-toggle">
              <div
                className={`partnership-toggle-author ${
                  item.periodicity === "Year" ? "active" : ""
                }`}
              >
                Yearly
              </div>
              <div
                className={`partnership-toggle-quarterly ${
                  item.periodicity === "Quarterly" ? "active" : ""
                }`}
              >
                Quarterly
              </div>
              <div
                className={`partnership-toggle-monthly ${
                  item.periodicity === "Monthly" ? "active" : ""
                }`}
              >
                Monthly
              </div>
              <div
                className={`partnership-toggle-daily ${
                  item.periodicity === "Daily" ? "active" : ""
                }`}
              >
                Daily
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-2"></div>
      </div> */}
      <div className="overflow-auto partnership-overflow-box">
        <div className="partnership-dropdown-content pt-3">
          {/* {partnership.map((partner, index) => (
            <div className="partnership-content-flex mt-1" key={index}>
              <div className="column-large-6">
                <div className="input__wrapper d-flex align-items-center mx-1">
                  <div className="">
                    <img
                      src={
                        profilepic
                        // !partner.partnerId.image
                        //   ? profilepic
                        //   : partner.partnerId.image
                      }
                      alt=""
                      className="author-pic"
                    />
                  </div>
                  <div className="partnership-input-container">
                    <select
                      className="partnersip_input__field"
                      id="role"
                      value={`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      disabled
                    >
                      <option
                        value={`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      >
                        {`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      </option>
                    </select>
                  </div>
                  <label htmlFor="number" className="upload__label">
                    {`Co-author ${index + 1}`}
                  </label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper mb-4">
                  <select
                    className="partnersip_input__field"
                    placeholder="Percentage"
                    id="role"
                    autoComplete="off"
                    value={partner.role}
                    onChange={(e) =>
                      handlePartnerChange(index, "role", e.target.value)
                    }
                  >
                    <option
                      value="Author"
                      selected={partner.role === "Author" ? true : false}
                    >
                      Author
                    </option>
                    <option
                      value="Co-Author"
                      selected={partner.role === "Co-Author" ? true : false}
                    >
                      Co-Author
                    </option>
                    <option
                      value="Contributor"
                      selected={partner.role === "Contributor" ? true : false}
                    >
                      Contributor
                    </option>
                  </select>
                  <label htmlFor="role" className="input__label email-label">
                    Role
                  </label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper">
                  <input
                    type="number"
                    id={`percentage${index}`}
                    className="input__field pass-input"
                    placeholder="Percentage"
                    value={partner.percentage}
                    onChange={(e) =>
                      handlePartnerChange(index, "percentage", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`percentage${index}`}
                    className="input__label email-label"
                  >
                    Percentage
                  </label>
                </div>
              </div>
              <div className="partnership-accepted-container mt-2">
                <div
                  className={`${
                    String(currentUser._id) === String(partner.partnerId._id)
                      ? "partnership-remove-self"
                      : partner.status === "Pending"
                      ? "partnership-pending"
                      : partner.status === "Declined"
                      ? "partnership-declined"
                      : partner.status === "Accepted"
                      ? "partnership-accepted"
                      : ""
                  }`}
                >
                  {String(currentUser._id) === String(partner.partnerId._id)
                    ? "Remove self"
                    : partner.status}
                </div>
                {String(currentUser._id) === String(partner.partnerId._id) ? (
                  ""
                ) : partner.status === "Pending" ? (
                  ""
                ) : partner.status === "Declined" ? (
                  <img
                    className="partnership-accepted-remove"
                    src={cancel}
                    alt=".."
                  />
                ) : partner.status === "Accepted" ? (
                  <IoIosCheckmarkCircleOutline
                    color="#4eb573"
                    className="mt-1"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))} */}
          {fields.map((field, index) => (
            <div className="partnership-content-flex mt-1" key={index}>
              {/* <div className="column-large-6">
                <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                  <div className="">
                    <img src={profilepic} alt="" className="author-pic" />
                  </div>
                  <select
                    className="input__field email-input"
                    name=""
                    value={coAuthor.name}
                    onChange={(e) =>
                      handleCoAuthorChange(index, "partnerId", e.target.value)
                    }
                  >
                    <option value="">Choose a co-author</option>
                    {myFriends.map((item, index) => (
                      <option value={item._id}>
                        {item.first_name} {item.last_name}
                      </option>
                    ))}
                  </select>
                  <label className="upload__label">Co-author {index + 1}</label>
                </div>
              </div> */}
              {/* <div className="column-large-3">
                <div className="input__wrapper emailinputcontainer mb-4">
                  <select
                    className="input__field email-input"
                    value={coAuthor.role}
                    onChange={(e) =>
                      handleCoAuthorChange(index, "role", e.target.value)
                    }
                  >
                    <option value="">Choose a role</option>
                    <option value="Author">Author</option>
                    <option value="Co-author">Co-author</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                  <label className="input__label email-label">Role</label>
                </div>
              </div> */}

            <div className="column-large-6">
            <div className="input__wrapper">
              <input
                // type="number"
                // id={`percentage-${index}`}
                className="input__field pass-input"
                placeholder="Partner Email"
                // value={coAuthor.percentage}
                
                // onChange={(e) =>{
                  // handleCoAuthorChange(index, "percentage", e.target.value)
                // }
                {...register(`coAuthors.${index}.email`)}

              />
              <label
                htmlFor={`percentage-${index}`}
                className="input__label email-label"
              >
                Partner Email
              </label>
            </div>
            </div>
            <div className="column-large-3">
                <div className="input__wrapper">
                  <input
                    // type="number"
                    // id={`percentage-${index}`}
                    className="input__field pass-input"
                    placeholder="Percentage"
                    // value={coAuthor.percentage}
                    // onChange={(e) =>
                    //   handleCoAuthorChange(index, "percentage", e.target.value)
                    // }
                    // value={'Co-author'}
                    {...register(`coAuthors.${index}.role`)}

                  />
                  <label
                    htmlFor={`percentage-${index}`}
                    className="input__label email-label"
                  >
                    Role
                  </label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper">
                  <input
                    type="number"
                    // id={`percentage-${index}`}
                    className="input__field pass-input"
                    placeholder="Percentage"
                    max={100}
                     {...register(`coAuthors.${index}.percentage`)}

                    // value={coAuthor.percentage}
                    // onChange={(e) =>
                    //   handleCoAuthorChange(index, "percentage", e.target.value)
                    // }
                  />
                  <label
                    htmlFor={`percentage-${index}`}
                    className="input__label email-label"
                  >
                    Percent
                  </label>
                </div>
              </div>
              <div className="partnership-accepted-container mt-2">
                <div className="col-lg-1">
                  <MdOutlineDelete
                    className="mt-3 delete-co-author-icon"
                    onClick={() => remove(index)}

                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="add-another-author"
        style={{ cursor: "pointer" }}
        onClick={()=>append({})}
      >
        Add another author
      </div>
      <div className="save-section d-flex justify-content-end py-3">
        <div
          className="partnership-save-btn"
          onClick={() => {
            savePartnership()
            // savePartnership(item._id, item);
          }}
          style={{
            // cursor: loadingStates[`${item._id}`] ? "not-allowed" : "pointer",
          }}
        >
          {/* {loadingStates[`${item._id}`] ? <ActionLoader /> : "Save"} */}
          Save
        </div>
      </div>
    </div>
  );
};

export default PartnershipTableDropdown;
