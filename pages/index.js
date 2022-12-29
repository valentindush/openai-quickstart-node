import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description,setDescription] =  useState("")
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  const [resultImageUrl, setResultImageUrl] = useState();

  const [showImg, setShowImg] = useState(false);

  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/generator', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          prompt: `create a business poster for ${title} with desription ${description}, email ${email} and phone number ${phoneNumber}`,
      })
    });
    setLoading(false);
    const imageResponse = await response.json();
    setResultImageUrl(imageResponse.imageURL);
    setShowImg(true);
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
        <div className={styles.result}>


          {(resultImageUrl && showImg) && 
          <div className={styles.box}>
            <p>Generated Image</p>

            <img src={resultImageUrl} />

            <button onClick={()=>setShowImg(false)}>Close</button>
          </div>}
        </div>
        {loading && <p>Generating poster please wait...</p>}
      </main>
    </div>
  );
}
