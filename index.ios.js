'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight
} = React;

var {
    // Demand in the auto-generated JavaScript class for our ObjC class
    MCFileWriterUtil
} = require('NativeModules');

var faker = require('faker');

class MyComp extends React.Component {

  constructor(props) {
    super(props);

    // generate data
    var data = [];
    for (var i = 0; i < 200; i++) {
      data.push({name: faker.name.findName()});
    }

    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      selectedIndex: 0,
      data,
      dataSource: ds.cloneWithRows(data)
    };

  }

  componentDidMount() {

  }

  render() {
    return <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red', marginTop: 20}}>
      <View style={{width: 300, backgroundColor: 'yellow'}}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
      </View>
      <View style={{flex:1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 72}}>{this.selectedItem()}</Text>
      </View>
    </View>;
  }

  selectedItem() {
    return this.state.data[this.state.selectedIndex];
  }

  renderRow(rowdata, section, row) {
    return (
      <TouchableHighlight underlayColor={'red'} onPress={() => this.setState({selectedIndex: row}) }>
        <View style={{height: 44, backgroundColor: 'white',  justifyContent: 'center', paddingLeft: 10, borderColor: 'grey', borderWidth: 0.5}}>
          <Text style={{fontSize: 18}}>{ rowdata.name }</Text>
        </View>
      </TouchableHighlight>
    );
  }


}

AppRegistry.registerComponent('ReactNativeiOSSplitScreen', () => MyComp);
