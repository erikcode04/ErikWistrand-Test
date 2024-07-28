"use client";
import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import { useState } from 'react';


export default function page() {
  const [id, setId] = useState("");
  var addres = "http://localhost:3000/searchForUser/" + id;

function idChanger(event){
  const number = event.target.value;
setId(number);
console.log(id);
}
  return (
    <div className={styles.main}>
      <h1 className={styles.information}>Type in a number</h1>
   <input className={styles.searcher} type="number" onChange={idChanger} value={id}></input>
      <Link className={styles.searchButton} href={addres} > Hej </Link>
    </div>
  )
}
