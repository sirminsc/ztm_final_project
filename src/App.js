import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const app = new Clarifai.App({
  apiKey: '741bba6e7142464aba43b1ce154455ba'
 });


const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enabled: true,
        value_area: 250,
      }
    }
  }
};



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''

    }

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});

  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input).then(
      function(response) {
        console.log(response)
      },
      function(err) {

      }
    )

  }


  render() {
  return (
    <div className="App">
      <Particles className='particles'
        params={{particlesOptions}}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>


    </div>
  );
  };
};

export default App;
