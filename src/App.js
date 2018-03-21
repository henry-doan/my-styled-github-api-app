import React, { Component } from 'react';
import { Grid, Header, Button, Segment, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import HeaderText from './HeaderText';
import axios from 'axios';

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Transparent = styled.div`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const IssueCard = StyledCard.extend`
  border: solid 1px red !important;
`

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg };
`
const SearchBox = styled.input.attrs({
  placeholder: 'search'
})`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

class App extends Component {
  state = { repos: [], visible: [] }

  componentDidMount() {
    axios.get('https://api.github.com/users/nightwing891/repos?sort=created')
      .then( res => this.setState({ repos: res.data, visible: res.data }) )
  }
  
  search = () => {
    let regex = new RegExp(this.searchTerm.value);
    if (this.searchTerm.value === '')
      this.setState({ visible: this.state.repos });
    else
      this.setState({ visible: this.state.repos.filter( r => regex.test(r.full_name) ) });
  }

  render() {
    return (
      <AppContainer>
        <Header 
          fSize="large" 
          as={ (props) => <HeaderText {...props} />}
        >
            My Portfolio
        </Header>
        <Segment as={Transparent}>
          <Header fSize="large" as={HeaderText}>My Projects</Header>
          <label>Search</label>
          <SearchBox onChange={this.search} innerRef={ x => this.searchTerm = x } />
          <Grid>
            <Grid.Row>
              { this.state.visible.map( r => {
                  let Component = r.open_issues > 0 ? IssueCard : StyledCard
                  return(
                    <Grid.Column key={r.id} width={4}>
                      <Component>
                        <Card.Content>
                          <Card.Header>
                            <Truncated>
                              { r.full_name }
                            </Truncated>
                          </Card.Header>
                          <Card.Meta>
                            { r.description }
                          </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                          <ButtonLink href={r.html_url} target="_blank" rel="noopener norefferer">
                            View
                          </ButtonLink>
                        </Card.Content>
                      </Component>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <Header as={HeaderText}>Contact</Header>
        </Segment>
      </AppContainer>
    );
  }
}

export default App;
