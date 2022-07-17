import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { FormControl, TextField } from '@material-ui/core';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/core';
function App() {

  const [urlVal, setUrl] = useState(0);
  const [successText, successConvert] = useState("No Audio URL");
  const [loading, loadingState] = useState(false);
  const [audioUrl, getAudioUrl] = useState("#");
  const [urlDefault, seturldefault] = useState()
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  function submitFormHandler(event) {
    event.preventDefault();
    let regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig
    let url_value = urlVal.urlVal;

    if (regex.test(url_value)) {
      loadingState(true);
      axios.get('http://192.168.100.32:9008/audio_only?url_video=' + url_value + '')
        .then(function (response) {
          // handle success
          successConvert({ successText: "Download Mp3 Audio" })
          document.getElementById('download_link').style.display = "block";
          loadingState(false);
          getAudioUrl("http://192.168.100.32:9008/" + response.data);
          seturldefault("");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          loadingState(false);
        })
        .finally(function () {
          // always executed
        });
    }
    else {
      console.log("url is not valid")
      alert("URL Is not Valid, enter a complete youtube url");
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <FormControl>
          <form onSubmit={submitFormHandler}>
            <TextField
              id="video-url-input"
              label="Url"
              className="urlField"
              type="text"
              name="url"
              value={urlDefault}
              margin="normal"
              variant="outlined"
              defaultValue={urlDefault}
              placeholder={urlDefault}
            />
            <Button className="convert_video_btn" onClick={() => setUrl({ urlVal: document.getElementById('video-url-input').value })} type="submit" variant="contained" color="primary">
              Convert Video
            </Button>
          </form>
          <DotLoader css={override}
            sizeUnit={"px"}
            size={125}
            color={'#123abc'}
            loading={loading}></DotLoader	>
          <Button id="download_link" href={audioUrl} variant="contained" color="primary">
            {successText.successText}
          </Button>
        </FormControl>

      </header>
    </div>
  );
}

export default App;
