import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Text, View, TouchableHighlight } from 'react-native';


interface Props { }
interface State {
  seconds: number,
  uri: string,
  inOut: string,
  buttonPressed: string,
  theme: string,
  times: {
    name: string,
  }[],
}

export default class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      seconds: 0,
      uri: "../../images/in.png",
      buttonPressed: 'true',
      inOut: 'IN',
      theme: 'black',
      times: [
        {
          name: 'Time1',
        },

      ],
    }

  }

  async componentDidMount() {

    let theme = "";
    let pressed = "";
    //get state of button
    try {
      pressed = await AsyncStorage.getItem('buttonPressed') || 'false';
      this.setState({ buttonPressed: pressed })
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    //import theme
    try {
      theme = await AsyncStorage.getItem('theme') || 'black';
      this.setState({ theme: theme })
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    //import current clock in/out from storage


  };


  buttonChange = () => {

    //if button is currently IN, change to OUT
    if (this.state.buttonPressed == "true") {
      try {
        AsyncStorage.setItem('buttonPressed', "false");
        this.setState({ buttonPressed: "false", inOut: "IN", seconds: 0 });

      } catch (error) {
        // Error retrieving data
        console.log(error);
      }

    } else {
      try {

        AsyncStorage.setItem('buttonPressed', "true");
        this.setState({ buttonPressed: "true", inOut: "OUT" })
        this.timerStart();
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }

  }

  timerStart = () => {
    setInterval(() => this.setState({ seconds: this.state.seconds + 1 }), 1000);

  }

  renderButton = () => {

    let imageSrc = require('../../images/out.png');

    if (this.state.buttonPressed == "false") {
      imageSrc = require('../../images/in.png');
    }

    return (
      <Image
        style={{
          width: 300,
          height: 300,
          flex: 1,
          position: 'absolute',
          alignSelf: 'center',
        }}
        source={imageSrc}>

      </Image>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.alignSelf}>

          {/* so image can be clicked on */}
          <TouchableHighlight onPress={() => this.buttonChange()}>

            <View>
              <Text style={styles.inOutTexts}>{this.state.inOut}</Text>
              <Text style={styles.timeTexts}>{this.state.seconds}</Text>

              {this.renderButton()}
            </View>
          </TouchableHighlight>
        </View>
        {
          this.state.times.map((l) => (
            <Text
              style={styles.texts}>{l.name}</Text>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#000000',
  },
  item: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  texts: {

    margin: 0,
    fontSize: 20,
    borderColor: 'black',
    color: 'white',
    backgroundColor: 'red',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'Roboto',
  },
  timeTexts: {
    fontSize: 30,
    zIndex: 2,


    alignSelf: "center",
    marginBottom: 1,
    color: 'white',
  },
  inOutTexts: {
    fontSize: 80,
    zIndex: 2,
    marginTop: 80,
    alignSelf: "center",
    marginBottom: 0,
    color: 'white',
  },
  heights: {
    height: 100,
    padding: 0,
    margin: 0,
  },
  alignSelf: {
    marginTop: 50,
    flex: 1,
    alignSelf: "center",
  }
})