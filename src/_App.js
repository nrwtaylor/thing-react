import React from 'react';
//import axios from 'axios';
import Thing from '../src/components/Thing/Thing';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
  }

  render() {
    return (
<>
whitefox
<Thing subject={'start'} />
</>
    )
  }
}
