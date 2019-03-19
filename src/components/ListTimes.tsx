import * as React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ListItem } from 'react-native-elements';

interface Props extends NavigationInjectedProps {
    item: string;
}

interface State {
}

class ListTimes extends React.Component<Props, State> {
    render() {
        const { item } = this.props;
        return (
            <ListItem
            key={item}
            title={item}>
            </ListItem>
        );
    }
}

export default withNavigation(ListTimes);