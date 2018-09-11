import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zip(props) {
  return(
    <div> 
    <h2> Zip Code: </h2>
    <ol>
      {props.zip}
    </ol>
    </div>
  );
}

function City(props) {
  return (
    <div>
        <h2>City: {props.data.City} </h2>
        <ul>
          <li>Country: {props.data.Country}</li>
          <li>Estimated Population: {props.data.EstimatedPopulation}</li>
        </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <h1> Enter Zip Code: </h1>
      <div className="container">
        <br/>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>
                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search zip code" zip={props.value} onChange={props.handleChange}/>
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="button" onClick={props.onClick}>Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return(
    <div>
      <h1> Enter City Name: </h1>
      <div className="container">
        <br/>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>
                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search city name" value={props.value} onChange={props.handleChange}/>
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="button" onClick={props.onClick}>Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: "",
      cities: [],
      city: "",
      zip: []
    };
    this.zipCodeSearch = this.zipCodeSearch.bind(this);
    this.cityNameSearch = this.cityNameSearch.bind(this);
    this.handleClickZip = this.handleClickZip.bind(this);
    this.handleClickCity = this.handleClickCity.bind(this);
  }

  zipCodeSearch(event) {
    const zip = event.target.value;
    
    this.setState({
      zipCode: zip
    });
  }

  cityNameSearch(event) {
    const cityname = event.target.value;

    this.setState({
      city: cityname
    });
  }

  handleClickZip() {
    const zip = this.state.zipCode;
    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then(response => {
          return response.json();   // convert to json and return
        })
        .then(jsonBody => {
          const cities = jsonBody.map(city => <City data={city} key={city.RecordData} />);
          this.setState({
            cities
          });
        })
        .catch(error => {
          this.setState({
            cities: [<h2 key={error}>no result</h2>]
          });
        });
      }
  }

  handleClickCity() {
    const city = this.state.city;

    if(city.length >= 3) {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
      .then(response => {
        return response.json();
      })
      .then(jsonBody => {
        const zip = jsonBody.map(zip => <li> {zip} </li>);
        this.setState({
          zip: zip
        });
      })
      .catch(error => {
        this.setState({
          zip: [<h2 key={error}>no result</h2>]
        });
      });
    }
  }



  render() {
    return (
      <div className="container-fluid">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeSearch} value={this.state.zipCode} onClick={this.handleClickZip}/>
          <div className="text-center">
            <div className="text-center">
              {this.state.cities}
            </div>
          </div>

        <CitySearchField handleChange={this.cityNameSearch} value={this.state.city} onClick={this.handleClickCity}/>
         <div className="text-center">
            <div className="text-center">
              {this.state.zip}
            </div>
          </div>
      </div>
    );
  }
}

export default App;
