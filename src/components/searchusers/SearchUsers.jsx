import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import SearchItem from "../searchitem/SearchItem";

const SearchUsers = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const userList = collection(db, "users");

  const handleSearch = async (e) => {
    let current = e.target.value;
    setText(current);

    const items = await getDocs(query(userList, where("name", "==", current)));
    setResult(
      items.docs.map((elm) => {
        return {
          ...elm.data(),
          id: elm.id,
        };
      })
    );
  };
  return (
    <div>
      <TextField
        fullWidth
        required
        label="Search for friends..."
        value={text}
        onChange={handleSearch}
      />
      <div className="grid">
        {result.map((elm) => (
          <SearchItem key={elm.id} person={elm} />
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
