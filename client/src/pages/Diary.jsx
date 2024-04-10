import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Diary() {
  const [deleteButton, setDeleteButton] = useState("Delete")
  const { diaryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState(null);
  const [edit, setEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [updatedDiary, setUpdatedDiary] = useState("");
  const navigate = useNavigate();
  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setDeleteButton("Deleting...")
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const res = await axios.delete(`${url}/deletediary`, {
        params: { diaryId },
        withCredentials: true,
      });
      setDeleteButton("Delete")
      navigate("/dashboard");
    } catch (err) {
      console.log("Error while deleting");
      console.log(err);
      setDeleteButton("Delete")
    }
  };
  const handleEdit = async () => {
    if (edit === false) {
      setEdit(true);
      setUpdatedDiary(diary?.body);
      return;
    } else {
      
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const res = await axios.post(`${url}/updatediary`, {updatedDiary,diaryId}, {
            withCredentials: true,
          });
          setEdit(false);
          setDiary(res.data)
      } catch (err) {
        console.log("Error while updating dairy");
        console.log(err);
      }
    }
  };
  const getDiary = async () => {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(`${url}/getdiary`, {
        params: { diaryId },
        withCredentials: true,
      });
      setDiary(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMessage("No diary found")
    }
  };
  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div className="w-full">
      <NavBar />
      {loading ? (
        <h1 className="w-full items-center text-xl flex flex-col gap-2 max-w-[1080px] px-2 py-10 mx-auto">
          Loading...
        </h1>
      ) : (
        diary && (
          <div className="w-full hideScrollbar h-[90%] flex flex-col gap-2 max-w-[1080px] px-2 py-10 mx-auto">
            <div className="font-bold flex w-full justify-between">
              <h1>{`Date ${diary?.date}`}</h1>
              <div className="flex gap-3">
                <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
                <button onClick={handleDelete}>{deleteButton}</button>
              </div>
            </div>
            {!edit ? (
              <textarea readOnly className="text-[16px] outline-none md:text-[18px] bg-black  bg-opacity-10 text-slate-400 overflow-scroll h-[80vh] px-4 py-4 rounded-md hideScrollbar shadow-sm" value={diary?.body}></textarea>
            ) : (
              <textarea
                onChange={(e) => setUpdatedDiary(e.target.value)}
                value={updatedDiary}
                className="text-[16px]  md:text-[18px] bg-black bg-opacity-10 text-slate-400 overflow-scroll h-[80vh] px-4 py-4 rounded-md hideScrollbar shadow-sm outline-none"
              ></textarea>
            )}
          </div>
        )
      )}
      {errorMessage!==""&& <p className="w-full font-bold text-xl flex flex-col gap-2 max-w-[1080px] px-2 py-10 mx-auto">{errorMessage}</p>}
    </div>
  );
}
