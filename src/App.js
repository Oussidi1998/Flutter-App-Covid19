import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import OurCard from "./Components/Card";
import Search from "./Components/search";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      country: "Morocco",
      data: {},
      casesTimeline: {
        labels: [],
        datasets: []
      },
      deathsTimeline: {
        labels: [],
        datasets: []
      }
    };
  }

  componentDidMount() {
    this.loadData(this.state.country);
  }

  SearchChanged = country => {
    this.loadData(country);
    this.setState({
      country:country
    })
  };

  loadData = country => {
    axios.get(`https://corona.lmao.ninja/countries/${country}`).then(res => {
      if (res.status == 200) {
        axios
          .get(`https://corona.lmao.ninja/v2/historical/${country}`)
          .then(res2 => {
            var deathsLabels = [];
            var deathsData = [];
            var casesLabels = [];
            var casesData = [];
            for (var key in res2.data.timeline.deaths) {
              var date = key.split("/");
              deathsLabels.push(date[1] + "/" + date[0]);
              deathsData.push(res2.data.timeline.deaths[key]);
            }
            for (var key in res2.data.timeline.cases) {
              var date = key.split("/");
              casesLabels.push(date[1] + "/" + date[0]);
              casesData.push(res2.data.timeline.cases[key]);
            }
            this.setState({
              casesTimeline: {
                labels: casesLabels,
                datasets: [
                  {
                    label: "Cases Accumulation",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: casesData
                  }
                ]
              },
              deathsTimeline: {
                labels: deathsLabels,
                datasets: [
                  {
                    label: "Deaths Accumulation",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: deathsData
                  }
                ]
              }
            });
          });
        this.setState({
          data: res.data,
          error: ""
        });
      } else {
        this.setState({
          error: this.data.message
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <div className="search">
            <Search SearchCallback={this.SearchChanged} />
          </div>
          <div className="city"><h2>{this.state.country}</h2></div>
        </header>
        {this.state.error != "" ? (
          <div>{this.state.error}</div>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard number={this.state.data.cases} text="Total Cases" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard
                  number={this.state.data.todayCases}
                  text="Today Cases"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard number={this.state.data.deaths} text="Total Deaths" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard
                  number={this.state.data.todayDeaths}
                  text="Today Deaths"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard
                  number={this.state.data.recovered}
                  text="Recoverd cases"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <OurCard
                  number={this.state.data.active}
                  text="Excluded cases"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Card>
                  <CardContent>
                    <Bar
                      data={this.state.casesTimeline}
                      height={400}
                      options={{ maintainAspectRatio: false }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Card>
                  <CardContent>
                    <Bar
                      data={this.state.deathsTimeline}
                      height={400}
                      options={{ maintainAspectRatio: false }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    );
  }
}

export default App;
