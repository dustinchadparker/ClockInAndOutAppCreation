
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreenOptions, NavigationParams } from 'react-navigation';


interface Props extends NavigationParams{ }
interface State { }

export default class Settings extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        headerTitle: "Single Blog"
    }

  render() {
      let itemId = this.props.navigation.getParam('itemId', 'NO-ID');

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> {itemId}</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,

  }
})