import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description,setDescription] =  useState("")
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Poster Generator</title>
      </Head>

      <main className={styles.main}>
        <h3>Generate poster</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            name="animal"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            name="animal"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          
          <input
            type="text"
            name="animal"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="file">Select a file:</label>
          <input type='file' id="file" value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input className="submit" type="submit" value="Generate Poster" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
