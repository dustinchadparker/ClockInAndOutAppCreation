
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenOptions } from 'react-navigation';
import { ListItem } from 'react-native-elements';
interface Props { }
interface State {
  buttonPressed: string,
  theme: string,
  times: {
    name: string,
  }[],
}

export default class Home extends React.Component<Props, State> {

  static navigationOptions: NavigationScreenOptions = {
    headerTitle: "Blogs"
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      buttonPressed: 'false',
      theme: 'black',
      times: [
        {
          name: 'Time1',
        },
        {
          name: 'Time2',
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

    //import current clock in/out




  };





  async buttonChange() {

    //if button is currently IN, change to OUT
    if(this.state.buttonPressed == "true") {
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

          <TouchableHighlight onPress={() => this.buttonChange()}>

            <ImageBackground
              style={{
                width: 300,
                height: 300,
                flex: 1,
              }}
              source= {{uri: "../../images/in.png"}}>
              <Text style={styles.inOutTexts}>IN</Text>

              <Text style={styles.timeTexts}>HH:MM</Text>

            </ImageBackground>
          </TouchableHighlight>
        </View>
        <View>
          {
            this.state.times.map((l) => (
              <ListItem
                key={l.name}
                title={l.name}
              />
            ))
          }
        </View>
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
    fontSize: 20,
    marginTop: 1,
    borderColor: 'black',
    marginBottom: 1,
    color: 'white',
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
  alignSelf: {
    flex: 2,
    alignSelf: "center",
  }
})