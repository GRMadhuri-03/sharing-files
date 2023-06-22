import './App.css';
import { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';
import Clipboard from 'clipboard';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef();
  const linkRef = useRef(null);
  const copyButtonRef = useRef(null);
  const logo = 'https://i.postimg.cc/zGbN1hM1/istockphoto-1280291919-612x612.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  useEffect(() => {
    const clipboard = new Clipboard(copyButtonRef.current);

    clipboard.on('success', () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000); // Change back to "Copy" after 3 seconds

      return () => {
        clipboard.destroy();
      };
    });
  }, []);

  return (
    <div className="App">
      <img src={logo} />
      <div className="wrapper">
        <h1>Share your files easily!!!</h1>
        <p>Upload and share the below link</p>
        <button onClick={() => onUploadClick()}>Upload</button>

        <input type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" rel="noopener noreferrer" ref={linkRef} style={{ display: result ? 'block' : 'none', backgroundColor: '#fff' }}>
          {result}
        </a>

      </div>
      <button className="btn" ref={copyButtonRef} data-clipboard-text={result} disabled={isCopied}>
        {isCopied ? 'Copied!!' : 'Copy'}
      </button>
    </div>
  );
}

export default App;
