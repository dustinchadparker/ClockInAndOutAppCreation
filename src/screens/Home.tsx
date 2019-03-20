
import * as React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Image } from 'react-native-elements';

interface Props { }
interface State {
  uri: string,
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
      uri: "../../images/in.png",
      buttonPressed: 'false',
      theme: 'black',
      times: [
        {
          name: 'Time1',
        },
        {
          name: 'Time2',
        },
        {
          name: 'Time31',
        },
        {
          name: 'Time41',
        },

        {
          name: 'Time52',
        },
        {
          name: 'Time62',
        },
        {
          name: 'Time72',
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


  async buttonChange() {

    //if button is currently IN, change to OUT
    if (this.state.buttonPressed == "true") {
      try {
        await AsyncStorage.setItem('buttonPressed', "false");

      } catch (error) {
        // Error retrieving data
        console.log(error);
      }

    } else {
      try {
        await AsyncStorage.setItem('buttonPressed', "true");

      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }

  }



  render() {

    return (
      <View style={styles.container}>
        <View style={styles.alignSelf}>

          {/* so my image can be clicked on */}
          <TouchableHighlight> onPress={() => this.buttonChange()}>

            <Text style={styles.inOutTexts}>IN</Text>

            <Text style={styles.timeTexts}>HH:MM</Text>

            <Image
              style={{
                width: 300,
                height: 300,
                flex: 1,
              }}
              source={{ uri: this.state.uri }}>

            </Image>
          </TouchableHighlight>
        </View>
        {
          this.state.times.forEach((l) => (
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
    zIndex: 3,


    alignSelf: "center",
    marginBottom: 1,
    color: 'white',
  },
  inOutTexts: {
    fontSize: 80,
    zIndex: 3,
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