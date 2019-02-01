import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import { Progress } from 'reactstrap';
import axios from 'axios'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded:0,
      selectedFile:'',
      imageUrl:''
    }
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this)
  }


  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    const post  = {
      title:'aaa',
      name:this.state.selectedFile.name,
      image:data
    }

    axios.post('http://localhost:3000/api/attachments/assets/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
        this.setState({
          loaded:0,
      selectedFile:'',
      imageUrl:''
        });
      })
    console.log('xxx');
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render() {
    return (
      <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
<div className="container">
<Progress animated color="info" value={Math.round(this.state.loaded,2) } />
<br/>

{/* uploads */}
               {/* <Col sm={4}> */}
              <input type="file" name="" id="" onChange={this.handleselectedFile}  className="from-control"/>
              <Button onClick={this.handleUpload}>Upload</Button>
              {/* <div> {Math.round(this.state.loaded,2) } %</div> */}
            {/* </Col> */}
            {/* End */}

</div>
      </div>
    );
  }
}

export default App;
