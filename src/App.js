import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,

    }

  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

  const image = document.getElementById('inputimage');

  const width = Number(image.width);

  const height = Number(image.height);

  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
  }
}


displayFaceBox = (box) => {
  console.log(box);
  this.setState({ box: box});
}


  onInputChange = (event) => {
    this.setState({input: event.target.value});

  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});

    app.models
      .predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => this.calculateFaceLocation(response))
      .then( response => this.displayFaceBox(response) )
      .catch( err => console.log(err) );

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});

  }


  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={{particlesOptions}}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'

        ? <React.StrictMode>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </React.StrictMode>
        : (
          route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  };
};

export default App;
